package com.opeteer.spring_boot;

import com.opeteer.spring_boot.dto.StudentDtos.BiodataDto;
import com.opeteer.spring_boot.dto.StudentDtos.BiodataUpdateRequest;
import com.opeteer.spring_boot.dto.StudentDtos.StudentProfileResponse;
import com.opeteer.spring_boot.service.StudentService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class StudentServiceTest {

    @Autowired
    private StudentService studentService;

    @Test
    @DisplayName("UT-STUDENT-01: Retrieve full student profile for valid NIM")
    void testGetStudentProfileSuccess() {
        StudentProfileResponse profile = studentService.getProfile("235314003");

        assertNotNull(profile);
        assertEquals("235314003", profile.nim());
        assertEquals("Gerardo Ardianta", profile.name());
        assertEquals("GA", profile.initials());
        assertEquals("S1 Teknik Informatika", profile.major());
        assertEquals("Fakultas Sains dan Teknologi (FST)", profile.faculty());
        assertEquals(new BigDecimal("3.78"), profile.ipk());
        assertEquals(new BigDecimal("3.85"), profile.ips());
        assertEquals(112, profile.totalSksPassed());
        assertEquals(14, profile.currentSemesterSks());
        assertEquals(24, profile.maxSksAllowed());
        assertTrue(profile.krsApproved());

        // Verify nested Advisor details
        assertNotNull(profile.advisor());
        assertEquals("Prof. Ir. Bambang Soelistijanto, Ph.D.", profile.advisor().name());
        assertEquals("02198014", profile.advisor().npp());
        assertEquals("bambang.s@usd.ac.id", profile.advisor().email());

        // Verify nested Biodata details (NIK must be masked)
        assertNotNull(profile.biodata());
        assertEquals("347101******0003", profile.biodata().nik());
        assertEquals("SMA Sedes Sapientiae", profile.biodata().highSchool());
    }

    @Test
    @DisplayName("UT-STUDENT-02: Non-existent NIM throws IllegalArgumentException when fetching profile")
    void testGetProfileStudentNotFound() {
        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> studentService.getProfile("000000000")
        );
        assertTrue(ex.getMessage().contains("tidak ditemukan"));
    }

    @Test
    @DisplayName("UT-STUDENT-03: Retrieve separate student biodata")
    void testGetBiodataSuccess() {
        BiodataDto biodata = studentService.getBiodata("235314003");

        assertNotNull(biodata);
        assertEquals("347101******0003", biodata.nik());
        assertEquals("Semarang, 15 Agustus 2004", biodata.birthPlaceDate());
        assertEquals("Laki-laki", biodata.gender());
        assertEquals("Katolik", biodata.religion());
        assertEquals("235314003@student.usd.ac.id", biodata.studentEmail());
    }

    @Test
    @DisplayName("UT-STUDENT-04: Non-existent NIM throws IllegalArgumentException when fetching biodata")
    void testGetBiodataNotFound() {
        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> studentService.getBiodata("000000000")
        );
        assertTrue(ex.getMessage().contains("tidak ditemukan"));
    }

    @Test
    @DisplayName("UT-STUDENT-05: Update student contact phone and domicile address")
    void testUpdateBiodataContact() {
        String newPhone = "+62 813-9876-5432";
        String newAddress = "Jl. Affandi No. 88, Gejayan, Sleman, Yogyakarta";

        BiodataDto updated = studentService.updateBiodata(
                "235314003",
                new BiodataUpdateRequest(newPhone, newAddress)
        );

        assertNotNull(updated);
        assertEquals(newPhone, updated.phone());
        assertEquals(newAddress, updated.domicileAddress());

        // Re-query to verify persistence
        BiodataDto rechecked = studentService.getBiodata("235314003");
        assertEquals(newPhone, rechecked.phone());
        assertEquals(newAddress, rechecked.domicileAddress());
    }

    @Test
    @DisplayName("UT-STUDENT-06: Blank values should not overwrite existing contact details")
    void testUpdateBiodataIgnoreBlank() {
        BiodataDto current = studentService.getBiodata("235314003");
        String currentPhone = current.phone();

        studentService.updateBiodata(
                "235314003",
                new BiodataUpdateRequest("   ", "New Valid Domicile Address")
        );

        BiodataDto rechecked = studentService.getBiodata("235314003");
        assertEquals(currentPhone, rechecked.phone(), "Phone should not have been overwritten by blank string");
        assertEquals("New Valid Domicile Address", rechecked.domicileAddress());
    }
}
