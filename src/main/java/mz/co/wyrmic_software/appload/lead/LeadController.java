package mz.co.wyrmic_software.appload.lead;

import java.time.Duration;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("lead")
@Slf4j
public class LeadController {

    private final String NOT_FOUND = "Lead not found";

    private LeadRepository leadRepository;
    @Value("${stream.interval}")
    private int interval;

    @Deprecated
    @GetMapping("/stream")
    public ResponseEntity<ResponseBodyEmitter> stream() {
        final StreamingResponseBody stream = out -> {
            log.debug("Writing stream...");
            final List<Lead> leadList = leadRepository.findAllByReadFalseOrderByRequestDateTimeDesc();
            leadList.forEach(lead -> lead.setRead(true));
            leadRepository.saveAll(leadList);
            out.write(leadList.toString().getBytes());
            log.debug("Sending stream...");
        };
        return new ResponseEntity(stream, HttpStatus.OK);
    }

    @GetMapping(path = "/stream-flux", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<List<LeadPojo>> streamFlux() {
        return Flux.interval(Duration.ofSeconds(interval)).map(sequence -> {
            List<Lead> leadList = leadRepository.findAllByReadFalseOrderByRequestDateTimeDesc();
            leadList.forEach(lead -> lead.setRead(true));
            leadRepository.saveAll(leadList);
            List<LeadPojo> leadPojos = leadList.stream().map(this::mapLeadPojo).collect(Collectors.toList());
            return leadPojos;
        });
    }

    @GetMapping("/find/lazy")
    public ResponseEntity<Page<LeadPojo>> findAllLazy(@RequestParam int page) {
        try {
            log.debug("Fetching lazy {} ", PageRequest.of(page, 20));
            Page<LeadPojo> leads = leadRepository.findAllByOrderByRequestDateTimeDesc(PageRequest.of(page, 20))
                    .map(this::mapLeadPojo);
            return new ResponseEntity<>(leads, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, NOT_FOUND, e);
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Page<Lead>> findByUser(@PathVariable String id, @RequestParam int page) {
        try {
            Page<Lead> leads = leadRepository.findAllByUserIdOrderByRequestDateTimeDesc(UUID.fromString(id),
                    PageRequest.of(page, 20));
            return new ResponseEntity<>(leads, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, NOT_FOUND, e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lead> getLeadById(@PathVariable final String id) {
        try {
            log.debug("fetching Lead id {}", id);
            Lead lead = leadRepository.findById(UUID.fromString(id)).orElseThrow(EntityNotFoundException::new);
            log.debug("setting Lead Name");
            log.debug("Lead fetched");
            return new ResponseEntity<>(lead, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, NOT_FOUND, e);
        }
    }

    private LeadPojo mapLeadPojo(Lead lead) {
        LeadPojo leadPojo = new LeadPojo();
        leadPojo.setLeadId(lead.getId().toString());
        leadPojo.setClientName(lead.getUser().getName());
        leadPojo.setProductName(lead.getProduct().getName());
        leadPojo.setRequestDate(lead.getRequestDateTime().truncatedTo(ChronoUnit.MINUTES)
                .format(DateTimeFormatter.ofPattern("HH:mm dd-MM-yyyy")));
        leadPojo.setQty(lead.getQty());
        return leadPojo;
    }

    @Autowired
    public void setLeadRepository(final LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }
}
