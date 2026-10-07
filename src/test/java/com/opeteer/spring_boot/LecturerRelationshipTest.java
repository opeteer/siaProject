package com.opeteer.spring_boot;

import com.opeteer.spring_boot.dto.LecturerDtos.LecturerDetailDto;
import com.opeteer.spring_boot.dto.LecturerDtos.LecturerDto;
import com.opeteer.spring_boot.model.Advisor;
import com.opeteer.spring_boot.model.Course;
import com.opeteer.spring_boot.model.Lecturer;
import com.opeteer.spring_boot.model.Student;
import com.opeteer.spring_boot.repository.AdvisorRepository;
import com.opeteer.spring_boot.repository.CourseRepository;
import com.opeteer.spring_boot.repository.LecturerRepository;
import com.opeteer.spring_boot.repository.StudentRepository;
import com.opeteer.spring_boot.service.LecturerService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class LecturerRelationshipTest {

    @Autowired
    private LecturerRepository lecturerRepository;

    @Autowired
    private AdvisorRepository advisorRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private LecturerService lecturerService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("Memastikan data master dosen (Lecturers) terisi dengan lengkap")
    void testMasterLecturersSeeded() {
        List<Lecturer> lecturers = lecturerRepository.findAll();
        assertFalse(lecturers.isEmpty(), "Tabel lecturers harus terisi");
        assertTrue(lecturers.size() >= 5, "Harus ada minimal 5 dosen master");

        Lecturer profBambang = lecturerRepository.findByNpp("02198014").orElse(null);
        assertNotNull(profBambang);
        assertEquals("0524096801", profBambang.getNidn());
        assertEquals("Prof. Ir. Bambang Soelistijanto, Ph.D.", profBambang.getName());
        assertEquals("S1 Teknik Informatika", profBambang.getDepartment());
        assertEquals("Aktif Mengajar", profBambang.getStatus());
    }

    @Test
    @DisplayName("Memastikan entitas Advisor terhubung dengan entitas Lecturer")
    void testAdvisorLinkedToLecturer() {
        Advisor advisor = advisorRepository.findByNpp("02198014").orElse(null);
        assertNotNull(advisor, "Advisor harus ditemukan");

        // Verifikasi relasi baru ke Lecturer
        assertNotNull(advisor.getLecturer(), "Advisor harus memiliki relasi ke Lecturer");
        assertEquals("02198014", advisor.getLecturer().getNpp());
        assertEquals("Prof. Ir. Bambang Soelistijanto, Ph.D.", advisor.getLecturer().getName());

        // Verifikasi kolom lama tetap utuh
        assertEquals("Prof. Ir. Bambang Soelistijanto, Ph.D.", advisor.getName());
        assertEquals("02198014", advisor.getNpp());
        assertEquals("Sangat Baik", advisor.getEvaluation());
    }

    @Test
    @DisplayName("Memastikan entitas Course terhubung dengan entitas Lecturer pengampu")
    void testCoursesLinkedToLecturers() {
        Course c4 = courseRepository.findByCode("INF-334").orElse(null);
        assertNotNull(c4);
        assertNotNull(c4.getLecturerEntity(), "Course INF-334 harus memiliki relasi lecturerEntity");
        assertEquals("02198014", c4.getLecturerEntity().getNpp());
        assertEquals("Prof. Ir. Bambang Soelistijanto, Ph.D.", c4.getLecturerEntity().getName());

        // Verifikasi kolom lama String lecturer tetap utuh
        assertEquals("Prof. Ir. Bambang Soelistijanto, Ph.D.", c4.getLecturer());

        // Query relasi dua arah: mengambil semua mata kuliah yang diampu Prof. Bambang
        List<Course> bambangCourses = courseRepository.findByLecturerEntity_Npp("02198014");
        assertEquals(2, bambangCourses.size(), "Prof. Bambang mengampu INF-334 dan INF-335");
        assertTrue(bambangCourses.stream().anyMatch(c -> "INF-334".equals(c.getCode())));
        assertTrue(bambangCourses.stream().anyMatch(c -> "INF-335".equals(c.getCode())));
    }

    @Test
    @DisplayName("Memastikan query mahasiswa bimbingan PA melalui relasi Dosen berfungsi")
    void testAdviseeQueryThroughLecturer() {
        List<Student> advisees = studentRepository.findByAdvisor_Lecturer_Npp("02198014");
        assertFalse(advisees.isEmpty(), "Harus ada mahasiswa bimbingan Prof. Bambang");
        assertTrue(advisees.stream().anyMatch(s -> "235314003".equals(s.getNim())));
    }

    @Test
    @DisplayName("Memastikan LecturerService mengembalikan detail dosen lengkap (matakuliah + bimbingan)")
    void testLecturerServiceDetail() {
        LecturerDetailDto detail = lecturerService.getLecturerByNpp("02198014");
        assertNotNull(detail);
        assertEquals("02198014", detail.npp());
        assertEquals("Prof. Ir. Bambang Soelistijanto, Ph.D.", detail.name());
        assertEquals(2, detail.taughtCourses().size());
        assertEquals(1, detail.advisees().size());
        assertEquals("235314003", detail.advisees().get(0).nim());
    }

    @Test
    @DisplayName("Memastikan endpoint REST API dosen dapat diakses via HTTP")
    void testLecturerApiEndpoints() throws Exception {
        mockMvc.perform(get("/api/academic/lecturers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].npp").exists());

        mockMvc.perform(get("/api/academic/lecturers/02198014"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.npp").value("02198014"))
                .andExpect(jsonPath("$.name").value("Prof. Ir. Bambang Soelistijanto, Ph.D."))
                .andExpect(jsonPath("$.taughtCourses").isArray())
                .andExpect(jsonPath("$.advisees").isArray());
    }
}
