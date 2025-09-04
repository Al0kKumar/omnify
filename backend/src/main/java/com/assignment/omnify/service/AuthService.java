package com.assignment.omnify.service;

import com.assignment.omnify.dto.TokenResponse;
import com.assignment.omnify.dto.LoginRequest;
import com.assignment.omnify.dto.SignupRequest;
import com.assignment.omnify.model.User;
import com.assignment.omnify.repository.UserRepository;
import com.assignment.omnify.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public TokenResponse signup(SignupRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        System.out.println(">>> Signup request email: " + request.getEmail());
        System.out.println(">>> Normalized email: " + email);

        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }

        User user = new User();
        user.setEmail(email); // ✅ save lowercase
        user.setName(request.getName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);

        String token = jwtUtil.generateToken(savedUser.getId(), savedUser.getEmail());

        return new TokenResponse(token, savedUser.getName(), savedUser.getEmail());
    }

    public TokenResponse login(LoginRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        System.out.println(">>> Login request email: " + request.getEmail());
        System.out.println(">>> Normalized email: " + email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getId(), user.getEmail());

        return new TokenResponse(token, user.getName(), user.getEmail());
    }
}
