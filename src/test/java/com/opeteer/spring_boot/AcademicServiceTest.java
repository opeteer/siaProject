package com.opeteer.spring_boot;

import com.opeteer.spring_boot.dto.AcademicDtos.CourseDto;
import com.opeteer.spring_boot.dto.AcademicDtos.KhsResponse;
import com.opeteer.spring_boot.dto.AcademicDtos.KrsResponse;
import com.opeteer.spring_boot.service.AcademicService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AcademicServiceTest {

    @Autowired
    private AcademicService academicService;

    @Test
    @DisplayName("UT-ACAD-01: Retrieve weekly class schedule list")
    void testGetWeeklySchedule() {
        List<CourseDto> schedule = academicService.getWeeklySchedule();

        assertNotNull(schedule);
        assertFalse(schedule.isEmpty(), "Weekly schedule should not be empty");
        assertEquals(5, schedule.size(), "Should contain 5 registered courses");

        // Verify specific course mapping
        CourseDto course1 = schedule.stream()
                .filter(c -> "INF-331".equals(c.code()))
                .findFirst()
                .orElse(null);
        assertNotNull(course1);
        assertEquals("Analisis Proses Bisnis", course1.name());
        assertEquals("Kelas C", course1.classGroup());
        assertEquals(3, course1.sks());
        assertEquals("Senin", course1.day());
        assertEquals("07:00 - 08:40", course1.time());
        assertEquals("R.314 St. Robertus", course1.room());
        assertEquals("blue", course1.themeColor());
    }

    @Test
    @DisplayName("UT-ACAD-02: Retrieve KRS for student and calculate total SKS")
    void testGetKrsSuccess() {
        KrsResponse krs = academicService.getKrs("235314003");

        assertNotNull(krs);
        assertEquals("2025/2026", krs.academicYear());
        assertEquals("GENAP", krs.semesterType());
        assertEquals(14, krs.totalSks(), "Total SKS must sum up to 14 (3+3+3+3+2)");
        assertEquals(24, krs.maxSksAllowed());
        assertTrue(krs.krsApproved());
        assertEquals("Prof. Ir. Bambang Soelistijanto, Ph.D.", krs.advisorName());
        assertEquals(5, krs.courses().size());
    }

    @Test
    @DisplayName("UT-ACAD-03: Retrieve KRS for non-existent student throws exception")
    void testGetKrsStudentNotFound() {
        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> academicService.getKrs("000000000")
        );
        assertTrue(ex.getMessage().contains("tidak ditemukan"));
    }

    @Test
    @DisplayName("UT-ACAD-04: Retrieve KHS report with semester grades and GPA")
    void testGetKhsSuccess() {
        KhsResponse khs = academicService.getKhs("235314003");

        assertNotNull(khs);
        assertEquals("2025/2026", khs.academicYear());
        assertEquals("GENAP", khs.semesterType());
        assertEquals(new BigDecimal("3.85"), khs.ips());
        assertEquals(new BigDecimal("3.78"), khs.ipk());
        assertEquals(112, khs.totalSksPassed());
        assertEquals(14, khs.currentSemesterSks());
        assertEquals(5, khs.grades().size());

        // Verify grade letters
        assertTrue(khs.grades().stream().anyMatch(g -> "INF-331".equals(g.code()) && "A".equals(g.gradeLetter())));
        assertTrue(khs.grades().stream().anyMatch(g -> "INF-333".equals(g.code()) && "A-".equals(g.gradeLetter())));
    }

    @Test
    @DisplayName("UT-ACAD-05: Retrieve KHS for non-existent student throws exception")
    void testGetKhsStudentNotFound() {
        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> academicService.getKhs("000000000")
        );
        assertTrue(ex.getMessage().contains("tidak ditemukan"));
    }
}
