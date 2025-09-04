package com.assignment.omnify.controller;

import com.assignment.omnify.dto.TokenResponse;
import com.assignment.omnify.dto.LoginRequest;
import com.assignment.omnify.dto.SignupRequest;
import com.assignment.omnify.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<TokenResponse> signup(@Valid @RequestBody SignupRequest request) {
        System.out.println(">>> Inside signup controller with request: " + request);
        return ResponseEntity.ok(authService.signup(request));
    }


    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest request) {
        System.out.println(">>> LoginRequest received: " + request.getEmail() + ", " + request.getPassword());
        return ResponseEntity.ok(authService.login(request));
    }

}
