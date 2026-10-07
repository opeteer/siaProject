package com.opeteer.spring_boot.config;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtTokenService {

    // 256-bit secret key for HMAC-SHA256
    private static final byte[] SECRET_KEY = "UniversitasSanataDharmaSiaJwtSecretKey2026!#$".getBytes(StandardCharsets.UTF_8);
    private static final long EXPIRATION_TIME_MS = 24 * 60 * 60 * 1000L; // 24 hours

    public String generateToken(String nim, String name, String role) {
        try {
            JWSSigner signer = new MACSigner(SECRET_KEY);
            Date now = new Date();
            Date expiry = new Date(now.getTime() + EXPIRATION_TIME_MS);

            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .subject(nim)
                    .claim("name", name)
                    .claim("role", role)
                    .issueTime(now)
                    .expirationTime(expiry)
                    .issuer("sia-usd")
                    .build();

            SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);
            signedJWT.sign(signer);

            return signedJWT.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException("Gagal menghasilkan JWT token", e);
        }
    }

    public boolean validateToken(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWSVerifier verifier = new MACVerifier(SECRET_KEY);

            if (!signedJWT.verify(verifier)) {
                return false;
            }

            Date expiration = signedJWT.getJWTClaimsSet().getExpirationTime();
            return expiration == null || expiration.after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public String extractNim(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            return signedJWT.getJWTClaimsSet().getSubject();
        } catch (Exception e) {
            return null;
        }
    }

    public String extractRole(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            String role = signedJWT.getJWTClaimsSet().getStringClaim("role");
            return (role != null) ? role : "ROLE_STUDENT";
        } catch (Exception e) {
            return "ROLE_STUDENT";
        }
    }
}
