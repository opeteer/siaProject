package com.opeteer.spring_boot.dto;

public class AuthDtos {
    public record LoginRequest(String nim, String password, Boolean rememberMe) {}
    public record LoginResponse(String token, String nim, String name, String status, String message) {}
}
