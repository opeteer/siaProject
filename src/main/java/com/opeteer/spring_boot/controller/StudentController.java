package com.opeteer.spring_boot.controller;

import com.opeteer.spring_boot.dto.StudentDtos.BiodataDto;
import com.opeteer.spring_boot.dto.StudentDtos.BiodataUpdateRequest;
import com.opeteer.spring_boot.dto.StudentDtos.StudentProfileResponse;
import com.opeteer.spring_boot.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/profile")
    public ResponseEntity<StudentProfileResponse> getProfile(@RequestParam(defaultValue = "235314003") String nim) {
        return ResponseEntity.ok(studentService.getProfile(nim));
    }

    @GetMapping("/biodata")
    public ResponseEntity<BiodataDto> getBiodata(@RequestParam(defaultValue = "235314003") String nim) {
        return ResponseEntity.ok(studentService.getBiodata(nim));
    }

    @PutMapping("/biodata")
    public ResponseEntity<BiodataDto> updateBiodata(
            @RequestParam(defaultValue = "235314003") String nim,
            @RequestBody BiodataUpdateRequest request
    ) {
        return ResponseEntity.ok(studentService.updateBiodata(nim, request));
    }

    @GetMapping("/ektm")
    public ResponseEntity<?> getEktmPayload(@RequestParam(defaultValue = "235314003") String nim) {
        StudentProfileResponse profile = studentService.getProfile(nim);
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
