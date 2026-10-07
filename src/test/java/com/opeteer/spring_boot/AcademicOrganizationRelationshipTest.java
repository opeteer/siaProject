package com.opeteer.spring_boot;

import com.opeteer.spring_boot.model.*;
import com.opeteer.spring_boot.repository.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class AcademicOrganizationRelationshipTest {

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private StudyProgramRepository studyProgramRepository;

    @Autowired
    private CurriculumRepository curriculumRepository;

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private AcademicPeriodRepository academicPeriodRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private LecturerRepository lecturerRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("Memastikan master Fakultas, Prodi, Kurikulum, Gedung, Ruang, dan Periode terisi")
    void testMasterAcademicOrganizationSeeded() {
        // Faculty
        Faculty fst = facultyRepository.findByCode("FST").orElse(null);
        assertNotNull(fst, "Fakultas FST harus ditemukan");
        assertEquals("Fakultas Sains dan Teknologi", fst.getName());

        // Study Programs
        List<StudyProgram> prodis = studyProgramRepository.findAll();
        assertTrue(prodis.size() >= 4, "Harus ada minimal 4 program studi");
        StudyProgram inf = studyProgramRepository.findByCode("INF").orElse(null);
        assertNotNull(inf);
        assertEquals("Informatika", inf.getName());
        assertEquals("S1", inf.getDegree());
        assertEquals("FST", inf.getFaculty().getCode());

        // Curriculum
        Curriculum kur = curriculumRepository.findByCode("KUR-INF-2023").orElse(null);
        assertNotNull(kur);
        assertEquals(144, kur.getTotalSksGraduation());
        assertEquals("INF", kur.getStudyProgram().getCode());

        // Buildings & Classrooms
        Building rob = buildingRepository.findByCode("ROB").orElse(null);
        assertNotNull(rob);
        Classroom r314 = classroomRepository.findByCode("R.314").orElse(null);
        assertNotNull(r314);
        assertEquals("ROB", r314.getBuilding().getCode());

        // Academic Period
        AcademicPeriod activePeriod = academicPeriodRepository.findByIsActiveTrue().orElse(null);
        assertNotNull(activePeriod);
        assertEquals("20252", activePeriod.getCode());
        assertEquals("2025/2026", activePeriod.getAcademicYear());
        assertEquals("GENAP", activePeriod.getSemesterType());
        assertTrue(activePeriod.getIsActive());
    }

    @Test
    @DisplayName("Memastikan Mahasiswa dan Dosen terhubung ke Program Studi")
    void testStudentAndLecturerLinkedToStudyProgram() {
        Student student = studentRepository.findByNim("235314003").orElse(null);
        assertNotNull(student);
        assertNotNull(student.getStudyProgram(), "Student harus terhubung ke StudyProgram");
        assertEquals("INF", student.getStudyProgram().getCode());
        assertEquals("Informatika", student.getStudyProgram().getName());

        // Backward compatibility check
        assertEquals("S1 Teknik Informatika", student.getMajor());
        assertEquals("Fakultas Sains dan Teknologi (FST)", student.getFaculty());

        Lecturer profBambang = lecturerRepository.findByNpp("02198014").orElse(null);
        assertNotNull(profBambang);
        assertNotNull(profBambang.getStudyProgram(), "Lecturer harus terhubung ke StudyProgram");
        assertEquals("INF", profBambang.getStudyProgram().getCode());
    }

    @Test
    @DisplayName("Memastikan Mata Kuliah terhubung ke Prodi, Ruang Kelas, dan Periode Akademik")
    void testCourseAcademicRelationships() {
        Course c1 = courseRepository.findByCode("INF-331").orElse(null);
        assertNotNull(c1);

        // Relasi ke Prodi
        assertNotNull(c1.getStudyProgram());
        assertEquals("INF", c1.getStudyProgram().getCode());

        // Relasi ke Ruang Kelas & Gedung
        assertNotNull(c1.getClassroom());
        assertEquals("R.314", c1.getClassroom().getCode());
        assertEquals("ROB", c1.getClassroom().getBuilding().getCode());

        // Relasi ke Periode Akademik
        assertNotNull(c1.getAcademicPeriod());
        assertEquals("20252", c1.getAcademicPeriod().getCode());

        // Backward compatibility check
        assertEquals("R.314 St. Robertus", c1.getRoom());
        assertEquals("Agnes Maria Polina, S.Kom., M.Sc.", c1.getLecturer());
    }

    @Test
    @DisplayName("Memastikan Enrollment (KRS/KHS) terhubung ke Periode Akademik")
    void testEnrollmentAcademicPeriodRelationship() {
        List<Enrollment> enrollments = enrollmentRepository.findAll();
        assertFalse(enrollments.isEmpty());

        Enrollment firstEnrollment = enrollments.get(0);
        assertNotNull(firstEnrollment.getAcademicPeriod());
        assertEquals("20252", firstEnrollment.getAcademicPeriod().getCode());
        assertEquals("2025/2026", firstEnrollment.getAcademicYear());
        assertEquals("GENAP", firstEnrollment.getSemesterType());
    }

    @Test
    @DisplayName("Memastikan REST API Organization dapat diakses")
    void testOrganizationApiEndpoints() throws Exception {
        mockMvc.perform(get("/api/academic/organization/faculties"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].code").value("FST"));

        mockMvc.perform(get("/api/academic/organization/study-programs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].code").exists());

        mockMvc.perform(get("/api/academic/organization/buildings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].code").value("ROB"));

        mockMvc.perform(get("/api/academic/organization/periods/active"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("20252"))
                .andExpect(jsonPath("$.isActive").value(true));
    }
}
