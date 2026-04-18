package com.ntgschool.easystay.Config;
import com.ntgschool.easystay.Security.AuthenticationFilter;
import com.ntgschool.easystay.Services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsConfigurationSource corsConfigurationSource;

    @Bean
    public AuthenticationFilter authenticationFilter(AuthenticationService authenticationService){
        return new AuthenticationFilter(authenticationService);
    }





    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationFilter filter){
        http.authorizeHttpRequests(
                        auth ->
                                auth
                                        .requestMatchers(HttpMethod.POST,"/api/v1/auth/**").permitAll()
                                        .requestMatchers(HttpMethod.GET,"/api/v1/hotels/**").permitAll()
                                        .requestMatchers(HttpMethod.POST,"/api/v1/hotels/**").permitAll()
                                        .requestMatchers(HttpMethod.GET,"/api/v1/facilities/**").permitAll()
                                        .requestMatchers(HttpMethod.POST,"/api/v1/facilities/**").permitAll()
                                        .requestMatchers(HttpMethod.GET,"/api/v1/rooms/**").permitAll()
//                                        .requestMatchers(HttpMethod.POST,"/api/v1/rooms/**").permitAll()
                                        .anyRequest().authenticated()
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }
}
