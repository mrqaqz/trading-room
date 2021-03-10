package mz.co.wyrmic_software.appload.utility;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class Validator {

    @Value("${regex.email}")
    private String emailRegexString;
    @Value("${regex.name.user} ")
    private String userNameRegexString;
    @Value("${regex.mobilenumber}")
    private String mobileNumberRegexString;
    @Value("${regex.name.company")
    private String companyNameRegexString;
    @Value("${regex.name.product")
    private String productNameRegexString;


    public boolean validateEmail(String emailStr) {
        Pattern email = Pattern.compile(emailRegexString, Pattern.CASE_INSENSITIVE);
        Matcher matcher = email.matcher(emailStr);
        return matcher.find();
    }

    public boolean validateName(String name) {
        Pattern userName = Pattern.compile(userNameRegexString, Pattern.CASE_INSENSITIVE);
        Matcher matcher = userName.matcher(name);
        return matcher.find();
    }

    public boolean validateCompanyName(String name) {
        Pattern companyName = Pattern.compile(userNameRegexString, Pattern.CASE_INSENSITIVE);
        Matcher matcher = companyName.matcher(name);
        return matcher.find();
    }

    public boolean validateProductName(String name) {
        Pattern productName = Pattern.compile(userNameRegexString, Pattern.CASE_INSENSITIVE);
        Matcher matcher = productName.matcher(name);
        return matcher.find();
    }

    public boolean validateMobileNumber(String number) {
        Pattern mobileNumber = Pattern.compile(mobileNumberRegexString, Pattern.CASE_INSENSITIVE);
        Matcher matcher = mobileNumber.matcher(number);
        return matcher.find();
    }
}
