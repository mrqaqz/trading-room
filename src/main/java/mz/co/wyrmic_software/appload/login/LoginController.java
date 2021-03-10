package mz.co.wyrmic_software.appload.login;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import lombok.extern.slf4j.Slf4j;
import mz.co.wyrmic_software.appload.user.ApplicationUser;
import mz.co.wyrmic_software.appload.user.UserRepository;

// @RestController
@Slf4j
public class LoginController {

    private UserRepository userRepository;

    // @PostMapping(value = "/login")
    public ResponseEntity<ApplicationUser> login(@RequestBody ApplicationUser user) {

        String username = user.getUsername();
        String password = user.getPassword();

        try {
            log.info("Login request for {}...", username);
            ApplicationUser localUser = userRepository.findByUsername(username)
                    .orElseThrow(EntityNotFoundException::new);
            if (!localUser.isConfirmed())
                throw new UserNotConfirmedException();
            if (localUser.getPassword().equals(password)) {
                log.info("Login successful.");
                log.debug(localUser.toString());
                return new ResponseEntity<>(localUser, HttpStatus.OK);
            } else
                throw new InvalidCredentialsException();

        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "ApplicationUser not found.", e);
        } catch (InvalidCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "ApplicationUser credentials mismatch", e);
        } catch (UserNotConfirmedException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "ApplicationUser not confirmed.", e);
        }
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
