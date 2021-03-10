package mz.co.wyrmic_software.appload.user;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.mail.MessagingException;
import javax.persistence.EntityNotFoundException;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import lombok.extern.slf4j.Slf4j;
import mz.co.wyrmic_software.appload.email.Sender;
import mz.co.wyrmic_software.appload.utility.Validator;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/users")
@Slf4j
public class UserController {
    private final String NOT_FOUND = "User not found";

    private UserRepository userRepository;
    private Sender sender;
    private Validator validator;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    UserController(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Value("${confirm.user.url}")
    private String url;
    @Value("${confirm.timeout}")
    private long timeout;

    @Transactional
    @PostMapping("/sign-up")
    public void signUp(@RequestBody ApplicationUser user) {
        log.info("request to register user {}", user.getUsername());
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        log.info("user {} successfully saved", user.getUsername());
    }

    @GetMapping("/me")
    public ApplicationUser getCurrentUser(@AuthenticationPrincipal ApplicationUser user) {
        
        log.debug("retrieved", user);
        return user;
    }

    @GetMapping(value="/{id}")
    public ResponseEntity<ApplicationUser> getApplicationUser(@PathVariable String id) {
        try {
            log.debug("fetching ApplicationUser id {}", id);
            ApplicationUser user = userRepository.findById(UUID.fromString(id)).orElseThrow(EntityNotFoundException::new);
            // LeadPOJO leadPojo = new LeadPOJO(lead);
            log.debug("setting ApplicationUser Name");
            // leadPojo.setLeadName();
            log.debug("ApplicationUser fecthed");
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, NOT_FOUND, e);
        }
    }
    

    @Transactional
    @PostMapping(path = "/confirm-{id}")
    public ResponseEntity<ApplicationUser> confirm(@PathVariable String id) {
        // TODO decipher the ID
        try {
            log.info("Confirming user {}...", id);
            ApplicationUser user = userRepository.findById(UUID.fromString(id))
                    .orElseThrow(EntityNotFoundException::new);
            log.debug(user.toString());
            if (user.isConfirmed())
                throw new AlreadyConfirmedException();
            checkTimeout(user.getConfirmationRequest());
            user.setConfirmed(true);
            userRepository.saveAndFlush(user);
            log.info("ApplicationUser confirmed.");
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "ApplicationUser not found.", e);
        } catch (ConfirmationTimeoutException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Confirmation timed-out.", e);
        } catch (AlreadyConfirmedException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Already confirmed.", e);
        }
    }

    @PostMapping(path = "/confirm/resend")
    public ResponseEntity<ApplicationUser> resendConfirmationEmail(@RequestBody String id) {
        // TODO decipher the ID
        try {
            log.info("Resending confirmation to {}...", id);
            ApplicationUser user = userRepository.findById(UUID.fromString(id))
                    .orElseThrow(EntityNotFoundException::new);
            log.debug(user.toString());
            if (user.isConfirmed())
                throw new AlreadyConfirmedException();
            user.setConfirmationRequest(LocalDateTime.now());
            userRepository.saveAndFlush(user);
            log.info("Confirmation resent.");
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "ApplicationUser not found.", e);
        } catch (AlreadyConfirmedException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Already confirmed.", e);
        }
    }

    // TODO validate company and address
    private void validateBuyer(ApplicationUser user) throws InvalidEmailException, UserEmailAlreadyExistsException,
            InvalidUserNameException, InvalidMobileNumber {
        if (!validator.validateName(user.getName()))
            throw new InvalidUserNameException();
        if (!validator.validateName(user.getSurname()))
            throw new InvalidUserNameException();
        if (!validator.validateEmail(user.getUsername()))
            throw new InvalidEmailException();
        if (userRepository.existsByUsername(user.getUsername()))
            throw new UserEmailAlreadyExistsException();
        if (!validator.validateMobileNumber(user.getPhoneNumber()))
            throw new InvalidMobileNumber();
    }

    private void checkTimeout(LocalDateTime confirmationRequest) throws ConfirmationTimeoutException {
        LocalDateTime threshold = confirmationRequest.plusMinutes(timeout);
        if (!LocalDateTime.now().isBefore(threshold))
            throw new ConfirmationTimeoutException();
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setSender(Sender sender) {
        this.sender = sender;
    }

    @Autowired
    public void setValidator(Validator validator) {
        this.validator = validator;
    }
}
