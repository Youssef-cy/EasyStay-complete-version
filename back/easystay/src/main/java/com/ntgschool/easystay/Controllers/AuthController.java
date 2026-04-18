package com.ntgschool.easystay.Controllers;


import com.ntgschool.easystay.Dtos.Request.AuthenticationRequest;
import com.ntgschool.easystay.Dtos.Response.AuthenticationResponse;
import com.ntgschool.easystay.Mappers.UserMapper;
import com.ntgschool.easystay.Services.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth/")
public class AuthController {

    private final AuthenticationService authenticationService;
    private final UserMapper userMapper;

    @Value("${jwt.expiry}")
    private Long expiresAt;

    @PostMapping("login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody @Valid AuthenticationRequest request
            ){
        UserDetails user = authenticationService.authenticate(request.getEmail(), request.getPassword());

        String token = authenticationService.generateToken(user);

        return ResponseEntity.ok(
                AuthenticationResponse.builder()
                        .token(token)
                        .expiresAt(expiresAt)
                        .build()
        );
    }


}
