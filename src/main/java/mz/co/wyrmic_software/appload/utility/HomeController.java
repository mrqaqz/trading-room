package mz.co.wyrmic_software.appload.utility;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping(value = { "/", "/login", "/register", "/admindashboard", "/userdashboard", "/manageOrders",
            "/orders/**", "/manageUsers", "/myOrders", "/myDetails", "/users/**", "/manageProducts", "/products/**",
            "/publish", "/test" })
    public String index() {
        return "index";
    }
}