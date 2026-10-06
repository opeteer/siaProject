package com.opeteer.spring_boot.controller;

import com.opeteer.spring_boot.dto.AuthDtos.LoginRequest;
import com.opeteer.spring_boot.dto.AuthDtos.LoginResponse;
import com.opeteer.spring_boot.service.AuthService;
import com.opeteer.spring_boot.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final StudentService studentService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized"));
        }
        String nim = auth.getName();
        return ResponseEntity.ok(studentService.getProfile(nim));
    }
}
