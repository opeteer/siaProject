package com.opeteer.spring_boot.controller;

import com.opeteer.spring_boot.dto.LecturerDtos.LecturerDetailDto;
import com.opeteer.spring_boot.dto.LecturerDtos.LecturerDto;
import com.opeteer.spring_boot.service.LecturerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academic/lecturers")
@RequiredArgsConstructor
public class LecturerController {

    private final LecturerService lecturerService;

    @GetMapping
    public ResponseEntity<List<LecturerDto>> getAllLecturers() {
        return ResponseEntity.ok(lecturerService.getAllLecturers());
    }

    @GetMapping("/{npp}")
    public ResponseEntity<LecturerDetailDto> getLecturerByNpp(@PathVariable String npp) {
        return ResponseEntity.ok(lecturerService.getLecturerByNpp(npp));
    }
}
