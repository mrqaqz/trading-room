package mz.co.wyrmic_software.appload.lead;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeadRepository extends JpaRepository<Lead, UUID> {

    List<Lead> findAllByReadFalseOrderByRequestDateTimeDesc();

    Page<Lead> findAllByOrderByRequestDateTimeDesc(Pageable pageable);
  
    Page<Lead> findAllByUserIdOrderByRequestDateTimeDesc(UUID userID, Pageable pageable );

}
