package mz.co.wyrmic_software.appload.config;

import static mz.co.wyrmic_software.appload.config.SecurityConstants.SIGN_UP_URL;

import com.auth0.spring.security.api.JwtWebSecurityConfigurer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import mz.co.wyrmic_software.appload.user.UserDetailsServiceImpl;
import mz.co.wyrmic_software.appload.user.UserRepository;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurity extends WebSecurityConfigurerAdapter {

    @Value(value = "${auth0.apiAudience}")
    private String apiAudience;
    @Value(value = "${auth0.issuer}")
    private String issuer;

    @Autowired
    private UserRepository userRepository;

    private UserDetailsServiceImpl userDetailsService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public WebSecurity(UserDetailsServiceImpl userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userDetailsService = userDetailsService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        JwtWebSecurityConfigurer.forRS256(apiAudience, issuer).configure(http).cors().and().csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
                .antMatchers("/", "/img/**", "/css/**", "/js/**", "/font/**", "/api/**", "/login", "/register",
                        "/manifest/**", SIGN_UP_URL)
                .permitAll().anyRequest().authenticated().and()
                .addFilter(new JWTAuthenticationFilter(authenticationManager()))
                .addFilter(new JWTAuthorizationFilter(authenticationManager(), userRepository))// <--- This fixed the
                                                                                               // issue
                .logout().logoutUrl("/logout").invalidateHttpSession(true).deleteCookies("JSESSIONID")
                .logoutSuccessUrl("/")
        // this disables session creation on Spring Security
        ;
    }

    /*
     * @Override protected void configure(HttpSecurity http) throws Exception { http
     * .csrf().disable() .sessionManagement().sessionAuthenticationStrategy(
     * sessionAuthenticationStrategy()) .and() .formLogin() .disable()
     * .addFilterBefore(keycloakPreAuthActionsFilter(), LogoutFilter.class)
     * .addFilterBefore(keycloakAuthenticationProcessingFilter(),
     * BasicAuthenticationFilter.class)
     * .addFilterAfter(keycloakSecurityContextRequestFilter(),
     * SecurityContextHolderAwareRequestFilter.class)
     * .addFilterAfter(keycloakAuthenticatedActionsRequestFilter(),
     * KeycloakSecurityContextRequestFilter.class) .logout().disable()
     * .authorizeRequests() .antMatchers("/", "/img/**", "/css/**", "/js/**",
     * "/api/**") // .hasRole("USER") .permitAll() .and()
     * .authorizeRequests().anyRequest().authenticated(); }
     */

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }

    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}