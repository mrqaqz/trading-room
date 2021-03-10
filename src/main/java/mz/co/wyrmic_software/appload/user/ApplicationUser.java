package mz.co.wyrmic_software.appload.user;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class ApplicationUser {

    @Id
    @GeneratedValue
    private UUID id;
    @Column(unique = true)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String surname;
    @Column(nullable = false)
    private String phoneNumber;
    @Column(nullable = false)
    private String address;
    @Column
    private String Company;
    @Column(nullable = false)
    private UserRole userRole;
    // confirmation data
    @Column
    private boolean confirmed;
    @Column
    private LocalDateTime confirmationRequest;

}