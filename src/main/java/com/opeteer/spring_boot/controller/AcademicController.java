package com.opeteer.spring_boot.controller;

import com.opeteer.spring_boot.dto.AcademicDtos.CourseDto;
import com.opeteer.spring_boot.dto.AcademicDtos.KhsResponse;
import com.opeteer.spring_boot.dto.AcademicDtos.KrsResponse;
import com.opeteer.spring_boot.model.AcademicMilestone;
import com.opeteer.spring_boot.model.Announcement;
import com.opeteer.spring_boot.service.AcademicService;
import com.opeteer.spring_boot.service.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academic")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AcademicController {

    private final AcademicService academicService;
    private final AnnouncementService announcementService;

    @GetMapping("/jadwal")
    public ResponseEntity<List<CourseDto>> getWeeklySchedule() {
        return ResponseEntity.ok(academicService.getWeeklySchedule());
    }

    @GetMapping("/krs")
    public ResponseEntity<KrsResponse> getKrs(@RequestParam(defaultValue = "235314003") String nim) {
        return ResponseEntity.ok(academicService.getKrs(nim));
    }

    @GetMapping("/khs")
    public ResponseEntity<KhsResponse> getKhs(@RequestParam(defaultValue = "235314003") String nim) {
        return ResponseEntity.ok(academicService.getKhs(nim));
    }

    @GetMapping("/announcements")
    public ResponseEntity<List<Announcement>> getAnnouncements(
            @RequestParam(required = false, defaultValue = "Semua") String category
    ) {
        return ResponseEntity.ok(announcementService.getAnnouncements(category));
    }

    @GetMapping("/milestones")
    public ResponseEntity<List<AcademicMilestone>> getMilestones() {
        return ResponseEntity.ok(announcementService.getMilestones());
    }
}
