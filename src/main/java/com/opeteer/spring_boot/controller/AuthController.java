package com.opeteer.spring_boot.controller;

import com.opeteer.spring_boot.dto.AuthDtos.LoginRequest;
import com.opeteer.spring_boot.dto.AuthDtos.LoginResponse;
import com.opeteer.spring_boot.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody(required = false) LoginRequest request) {
        LoginRequest safeRequest = (request != null) ? request : new LoginRequest("235314003", "password", true);
        return ResponseEntity.ok(authService.login(safeRequest));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestParam(defaultValue = "235314003") String nim) {
        return ResponseEntity.ok(authService.login(new LoginRequest(nim, "", true)));
    }
}
