package mz.co.wyrmic_software.appload.email;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.Properties;

@Component
@Slf4j
public class Sender {

    @Value("${email.host.server.address}")
    private String host;
    @Value("${email.port}")
    private String port;
    @Value("${email.host.server.address}")
    private String trust;
    @Value("${email.username}")
    private String username;
    @Value("${email.password}")
    private String password;
    @Value("${email.source.address}")
    private String sourceAddress;
    @Value("${email.tls.enabled}")
    private boolean tls;

    private final Properties properties = new Properties();

    @PostConstruct
    public void setProperties() {
        properties.put("mail.smtp.auth", true);
        properties.put("mail.smtp.starttls.enable", tls);
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);
        properties.put("mail.smtp.ssl.trust", trust);
    }

    private Session getSession() {
        log.debug("Creating session...");
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });
        log.debug("Session created successfully.");
        return session;
    }

    public void submitEmail(String address, String subject, String content) throws MessagingException {
        log.debug("Preparing e-mail...");
        Message message = new MimeMessage(getSession());
        message.setFrom(new InternetAddress(sourceAddress));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(address));
        message.setSubject(subject);
        MimeBodyPart mimeBodyPart = new MimeBodyPart();
        mimeBodyPart.setContent(content, "text/html");
        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(mimeBodyPart);
        message.setContent(multipart);
        Transport.send(message);
    }

}
