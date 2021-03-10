package mz.co.wyrmic_software.appload.lead;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Data;
import mz.co.wyrmic_software.appload.product.Product;
import mz.co.wyrmic_software.appload.user.ApplicationUser;

@Entity
@Data
public class Lead {
    @Id
    @GeneratedValue
    private UUID id;
    @ManyToOne
    private ApplicationUser user;
    @ManyToOne
    private Product product;
    @Column(nullable = false)
    private LocalDateTime requestDateTime;
    @Column(nullable = false)
    private boolean read;
    @Column(nullable = false)
    private String deliveryAddress;
    @Column(nullable = false)
    private String province;
    @Column(nullable = false)
    private int qty;
}
