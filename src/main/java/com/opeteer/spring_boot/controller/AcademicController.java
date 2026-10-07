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
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academic")
@RequiredArgsConstructor
public class AcademicController {

    private final AcademicService academicService;
    private final AnnouncementService announcementService;

    private String resolveNim(String requestedNim, Authentication auth) {
        if (auth != null && auth.isAuthenticated() && auth.getName() != null && !"anonymousUser".equals(auth.getName())) {
            return auth.getName();
        }
        return (requestedNim != null && !requestedNim.isBlank()) ? requestedNim : "235314003";
    }

    @GetMapping("/jadwal")
    public ResponseEntity<List<CourseDto>> getWeeklySchedule() {
        return ResponseEntity.ok(academicService.getWeeklySchedule());
    }

    @GetMapping("/krs")
    public ResponseEntity<KrsResponse> getKrs(
            @RequestParam(required = false) String nim,
            Authentication auth
    ) {
        return ResponseEntity.ok(academicService.getKrs(resolveNim(nim, auth)));
    }

    @GetMapping("/khs")
    public ResponseEntity<KhsResponse> getKhs(
            @RequestParam(required = false) String nim,
            Authentication auth
    ) {
        return ResponseEntity.ok(academicService.getKhs(resolveNim(nim, auth)));
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
