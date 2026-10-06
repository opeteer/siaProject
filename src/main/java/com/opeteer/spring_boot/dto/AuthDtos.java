package com.opeteer.spring_boot.dto;

import jakarta.validation.constraints.NotBlank;

public class AuthDtos {
    public record LoginRequest(
            @NotBlank(message = "NIM wajib diisi")
            String nim,

            @NotBlank(message = "Password wajib diisi")
            String password,

            Boolean rememberMe
    ) {}

    public record LoginResponse(
            String token,
            String nim,
            String name,
            String status,
            String message
    ) {}
}
