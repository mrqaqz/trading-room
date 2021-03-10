package mz.co.wyrmic_software.appload.product;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    Page<Product> findByApproved(boolean approved, Pageable pageable);
    List<Product> findAll();
}