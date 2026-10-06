package com.opeteer.spring_boot.service;

import com.opeteer.spring_boot.config.JwtTokenService;
import com.opeteer.spring_boot.dto.AuthDtos.LoginRequest;
import com.opeteer.spring_boot.dto.AuthDtos.LoginResponse;
import com.opeteer.spring_boot.model.Student;
import com.opeteer.spring_boot.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;

    public LoginResponse login(LoginRequest request) {
        if (request == null || request.nim() == null || request.nim().isBlank()) {
            throw new BadCredentialsException("NIM wajib diisi");
        }
        if (request.password() == null || request.password().isBlank()) {
            throw new BadCredentialsException("Password wajib diisi");
        }

        String nim = request.nim().trim();
        Student student = studentRepository.findByNim(nim)
                .orElseThrow(() -> new BadCredentialsException("Kredensial tidak valid: NIM atau password salah"));

        if (student.getPasswordHash() == null || !passwordEncoder.matches(request.password(), student.getPasswordHash())) {
            throw new BadCredentialsException("Kredensial tidak valid: NIM atau password salah");
        }

        String token = jwtTokenService.generateToken(student.getNim(), student.getName(), "ROLE_STUDENT");

        return new LoginResponse(
                token,
                student.getNim(),
                student.getName(),
                student.getStatus(),
                "Autentikasi SSO Universitas Sanata Dharma Berhasil"
        );
    }
}
