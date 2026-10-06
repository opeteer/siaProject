package com.opeteer.spring_boot.controller;

import com.opeteer.spring_boot.dto.StudentDtos.BiodataDto;
import com.opeteer.spring_boot.dto.StudentDtos.BiodataUpdateRequest;
import com.opeteer.spring_boot.dto.StudentDtos.StudentProfileResponse;
import com.opeteer.spring_boot.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    private String resolveNim(String requestedNim, Authentication auth) {
        if (auth != null && auth.isAuthenticated() && auth.getName() != null && !"anonymousUser".equals(auth.getName())) {
            return auth.getName();
        }
        return (requestedNim != null && !requestedNim.isBlank()) ? requestedNim : "235314003";
    }

    @GetMapping("/profile")
    public ResponseEntity<StudentProfileResponse> getProfile(
            @RequestParam(required = false) String nim,
            Authentication auth
    ) {
        return ResponseEntity.ok(studentService.getProfile(resolveNim(nim, auth)));
    }

    @GetMapping("/biodata")
    public ResponseEntity<BiodataDto> getBiodata(
            @RequestParam(required = false) String nim,
            Authentication auth
    ) {
        return ResponseEntity.ok(studentService.getBiodata(resolveNim(nim, auth)));
    }

    @PutMapping("/biodata")
    public ResponseEntity<BiodataDto> updateBiodata(
            @RequestParam(required = false) String nim,
            @Valid @RequestBody BiodataUpdateRequest request,
            Authentication auth
    ) {
        return ResponseEntity.ok(studentService.updateBiodata(resolveNim(nim, auth), request));
    }

    @GetMapping("/ektm")
    public ResponseEntity<?> getEktmPayload(
            @RequestParam(required = false) String nim,
            Authentication auth
    ) {
        StudentProfileResponse profile = studentService.getProfile(resolveNim(nim, auth));
        return ResponseEntity.ok(Map.of(
                "nim", profile.nim(),
                "name", profile.name(),
                "major", profile.major(),
                "campus", profile.campus(),
                "status", "AKTIF 2025/2026",
                "barcode", "||||| | |||| |||||| || | |||||",
                "libraryQrToken", "USD-LIB-GATE-" + profile.nim() + "-2026",
                "advisorNotes", (profile.advisor() != null) ? profile.advisor().notes() : "",
                "advisorEvaluation", (profile.advisor() != null) ? profile.advisor().evaluation() : ""
        ));
    }
}
