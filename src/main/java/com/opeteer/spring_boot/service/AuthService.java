package com.opeteer.spring_boot.service;

import com.opeteer.spring_boot.dto.AuthDtos.LoginRequest;
import com.opeteer.spring_boot.dto.AuthDtos.LoginResponse;
import com.opeteer.spring_boot.model.Student;
import com.opeteer.spring_boot.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final StudentRepository studentRepository;

    public LoginResponse login(LoginRequest request) {
        String nim = (request.nim() != null) ? request.nim().trim() : "235314003";
        Student student = studentRepository.findByNim(nim)
                .orElseThrow(() -> new IllegalArgumentException("NIM tidak ditemukan dalam pangkalan data mahasiswa USD"));

        // Simulate token generation
        String token = "sso-usd-" + UUID.randomUUID();

        return new LoginResponse(
                token,
                student.getNim(),
                student.getName(),
                student.getStatus(),
                "Autentikasi SSO Universitas Sanata Dharma Berhasil"
        );
    }
}
