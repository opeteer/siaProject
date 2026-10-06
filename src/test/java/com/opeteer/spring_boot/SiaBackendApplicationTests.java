package com.opeteer.spring_boot;

import com.opeteer.spring_boot.dto.AcademicDtos.KhsResponse;
import com.opeteer.spring_boot.dto.AcademicDtos.KrsResponse;
import com.opeteer.spring_boot.dto.FinanceDtos.TuitionResponse;
import com.opeteer.spring_boot.dto.StudentDtos.BiodataUpdateRequest;
import com.opeteer.spring_boot.dto.StudentDtos.StudentProfileResponse;
import com.opeteer.spring_boot.model.Course;
import com.opeteer.spring_boot.model.Student;
import com.opeteer.spring_boot.repository.CourseRepository;
import com.opeteer.spring_boot.repository.StudentRepository;
import com.opeteer.spring_boot.service.AcademicService;
import com.opeteer.spring_boot.service.FinanceService;
import com.opeteer.spring_boot.service.StudentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SiaBackendApplicationTests {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentService studentService;

    @Autowired
    private AcademicService academicService;

    @Autowired
    private FinanceService financeService;

    @Test
    void testStudentSeedingAndProfileQuery() {
        Student student = studentRepository.findByNim("235314003").orElse(null);
        assertNotNull(student, "Student with NIM 235314003 must be seeded");
        assertEquals("Gerardo Ardianta", student.getName());
        assertEquals("SMA Sedes Sapientiae", student.getBiodata().getHighSchool());
        assertEquals("02198014", student.getAdvisor().getNpp());

        StudentProfileResponse profile = studentService.getProfile("235314003");
        assertNotNull(profile);
        assertEquals(new BigDecimal("3.78"), profile.ipk());
        assertEquals(Integer.valueOf(112), profile.totalSksPassed());
    }

    @Test
    void testCoursesAndSchedule() {
        List<Course> courses = courseRepository.findAll();
        assertEquals(5, courses.size(), "Should have exactly 5 courses registered in semester 6");

        var schedule = academicService.getWeeklySchedule();
        assertFalse(schedule.isEmpty());
        assertTrue(schedule.stream().anyMatch(c -> "INF-331".equals(c.code())));
        assertTrue(schedule.stream().anyMatch(c -> "INF-332".equals(c.code())));
    }

    @Test
    void testKrsAndKhsReports() {
        KrsResponse krs = academicService.getKrs("235314003");
        assertNotNull(krs);
        assertEquals(Integer.valueOf(14), krs.totalSks());
        assertTrue(krs.krsApproved());
        assertEquals(5, krs.courses().size());

        KhsResponse khs = academicService.getKhs("235314003");
        assertNotNull(khs);
        assertEquals(new BigDecimal("3.85"), khs.ips());
        assertEquals(5, khs.grades().size());
    }

    @Test
    void testTuitionBills() {
        TuitionResponse tuition = financeService.getTuition("235314003");
        assertNotNull(tuition);
        assertEquals("LUNAS", tuition.status());
        assertEquals(0, BigDecimal.ZERO.compareTo(tuition.remainingBill()));
        assertEquals(3, tuition.items().size());
    }

    @Test
    void testUpdateBiodataContact() {
        var updated = studentService.updateBiodata(
                "235314003",
                new BiodataUpdateRequest("+62 899-1234-5678", "Jl. Maguwoharjo No. 10, Sleman")
        );
        assertEquals("+62 899-1234-5678", updated.phone());
        assertEquals("Jl. Maguwoharjo No. 10, Sleman", updated.domicileAddress());
    }
}
