package com.opeteer.spring_boot;

import com.opeteer.spring_boot.dto.AuthDtos.LoginRequest;
import com.opeteer.spring_boot.dto.AuthDtos.LoginResponse;
import com.opeteer.spring_boot.service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Test
    @DisplayName("UT-AUTH-01: Valid student login with correct password returns successful JWT token")
    void testValidStudentLogin() {
        LoginRequest request = new LoginRequest("235314003", "password123", true);
        LoginResponse response = authService.login(request);

        assertNotNull(response, "Login response should not be null");
        assertEquals("235314003", response.nim());
        assertEquals("Gerardo Ardianta", response.name());
        assertNotNull(response.token());
        assertTrue(response.token().contains("."), "Token must be a signed JWT containing dot separators");
        assertTrue(response.message().contains("Sanata Dharma"));
    }

    @Test
    @DisplayName("UT-AUTH-02: Non-existent NIM should throw BadCredentialsException")
    void testNonExistentNimThrowsException() {
        LoginRequest request = new LoginRequest("999999999", "password123", false);
        BadCredentialsException exception = assertThrows(
                BadCredentialsException.class,
                () -> authService.login(request)
        );

        assertTrue(exception.getMessage().contains("tidak valid"));
    }

    @Test
    @DisplayName("UT-AUTH-03: Wrong password should throw BadCredentialsException")
    void testWrongPasswordThrowsException() {
        LoginRequest request = new LoginRequest("235314003", "WRONG_PASSWORD_XYZ", true);
        BadCredentialsException exception = assertThrows(
                BadCredentialsException.class,
                () -> authService.login(request)
        );

        assertTrue(exception.getMessage().contains("tidak valid"));
    }

    @Test
    @DisplayName("UT-AUTH-04: Trim whitespace on NIM during authentication")
    void testTrimWhitespaceOnNim() {
        LoginRequest request = new LoginRequest("  235314003  ", "password123", true);
        LoginResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals("235314003", response.nim());
    }

    @Test
    @DisplayName("UT-AUTH-05: Blank or null NIM should throw BadCredentialsException")
    void testBlankNimThrowsException() {
        assertThrows(BadCredentialsException.class, () -> authService.login(new LoginRequest(null, "password123", false)));
        assertThrows(BadCredentialsException.class, () -> authService.login(new LoginRequest("", "password123", false)));
    }
}
