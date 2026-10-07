package com.opeteer.spring_boot;

import com.opeteer.spring_boot.config.JwtTokenService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class SiaApiControllersTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtTokenService jwtTokenService;

    private String validToken;

    @BeforeEach
    void setUp() {
        validToken = jwtTokenService.generateToken("235314003", "Gerardo Ardianta", "ROLE_STUDENT");
    }

    @Test
    @DisplayName("API-AUTH-01: POST /api/auth/login with valid password returns 200 and signed JWT")
    void testAuthLoginEndpoint() throws Exception {
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"nim\":\"235314003\",\"password\":\"password123\",\"rememberMe\":true}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nim").value("235314003"))
                .andExpect(jsonPath("$.name").value("Gerardo Ardianta"))
                .andExpect(jsonPath("$.token", containsString(".")))
                .andExpect(jsonPath("$.status").value(containsString("Aktif")));
    }

    @Test
    @DisplayName("API-AUTH-02: GET /api/auth/me returns current authenticated student info")
    void testAuthMeEndpoint() throws Exception {
        mockMvc.perform(get("/api/auth/me")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nim").value("235314003"))
                .andExpect(jsonPath("$.name").value("Gerardo Ardianta"));
    }

    @Test
    @DisplayName("API-STUDENT-01: GET /api/student/profile returns 200 with masked NIK")
    void testGetProfileEndpoint() throws Exception {
        mockMvc.perform(get("/api/student/profile")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nim").value("235314003"))
                .andExpect(jsonPath("$.name").value("Gerardo Ardianta"))
                .andExpect(jsonPath("$.ipk").value(3.78))
                .andExpect(jsonPath("$.totalSksPassed").value(112))
                .andExpect(jsonPath("$.advisor.name").value("Prof. Ir. Bambang Soelistijanto, Ph.D."))
                .andExpect(jsonPath("$.biodata.nik").value("347101******0003"));
    }

    @Test
    @DisplayName("API-STUDENT-02: GET /api/student/biodata returns 200 with student dossier and masked NIK")
    void testGetBiodataEndpoint() throws Exception {
        mockMvc.perform(get("/api/student/biodata")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nik").value("347101******0003"))
                .andExpect(jsonPath("$.studentEmail").value("235314003@student.usd.ac.id"))
                .andExpect(jsonPath("$.highSchool").value("SMA Sedes Sapientiae"));
    }

    @Test
    @DisplayName("API-STUDENT-03: PUT /api/student/biodata updates contact details with valid input")
    void testUpdateBiodataEndpoint() throws Exception {
        mockMvc.perform(put("/api/student/biodata")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"phone\":\"+62 811-2233-4455\",\"domicileAddress\":\"Jl. Kaliurang KM 9, Sleman\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.phone").value("+62 811-2233-4455"))
                .andExpect(jsonPath("$.domicileAddress").value("Jl. Kaliurang KM 9, Sleman"));
    }

    @Test
    @DisplayName("API-STUDENT-04: GET /api/student/ektm returns e-KTM barcode and library gate token")
    void testGetEktmEndpoint() throws Exception {
        mockMvc.perform(get("/api/student/ektm")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nim").value("235314003"))
                .andExpect(jsonPath("$.barcode").value(notNullValue()))
                .andExpect(jsonPath("$.libraryQrToken").value("USD-LIB-GATE-235314003-2026"));
    }

    @Test
    @DisplayName("API-ACAD-01: GET /api/academic/jadwal returns public course schedule array")
    void testGetJadwalEndpoint() throws Exception {
        mockMvc.perform(get("/api/academic/jadwal"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(5)))
                .andExpect(jsonPath("$[0].code").value(notNullValue()))
                .andExpect(jsonPath("$[0].time").value(notNullValue()))
                .andExpect(jsonPath("$[0].room").value(notNullValue()));
    }

    @Test
    @DisplayName("API-ACAD-02: GET /api/academic/krs returns active study plan for authenticated student")
    void testGetKrsEndpoint() throws Exception {
        mockMvc.perform(get("/api/academic/krs")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.academicYear").value("2025/2026"))
                .andExpect(jsonPath("$.semesterType").value("GENAP"))
                .andExpect(jsonPath("$.totalSks").value(14))
                .andExpect(jsonPath("$.krsApproved").value(true))
                .andExpect(jsonPath("$.courses", hasSize(5)));
    }

    @Test
    @DisplayName("API-ACAD-03: GET /api/academic/khs returns semester grade transcript")
    void testGetKhsEndpoint() throws Exception {
        mockMvc.perform(get("/api/academic/khs")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ips").value(3.85))
                .andExpect(jsonPath("$.grades", hasSize(5)))
                .andExpect(jsonPath("$.grades[0].gradeLetter").value(notNullValue()));
    }

    @Test
    @DisplayName("API-ACAD-04: GET /api/academic/announcements returns public announcements")
    void testGetAnnouncementsEndpoint() throws Exception {
        mockMvc.perform(get("/api/academic/announcements?category=Semua"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(3))))
                .andExpect(jsonPath("$[0].title").value(notNullValue()));
    }

    @Test
    @DisplayName("API-ACAD-05: GET /api/academic/milestones returns milestone timeline")
    void testGetMilestonesEndpoint() throws Exception {
        mockMvc.perform(get("/api/academic/milestones"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4)))
                .andExpect(jsonPath("$[0].title").value(notNullValue()));
    }

    @Test
    @DisplayName("API-FIN-01: GET /api/finance/tuition returns tuition summary for authenticated student")
    void testGetTuitionEndpoint() throws Exception {
        mockMvc.perform(get("/api/finance/tuition")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("LUNAS"))
                .andExpect(jsonPath("$.remainingBill").value(0))
                .andExpect(jsonPath("$.items", hasSize(3)));
    }

    @Test
    @DisplayName("API-FIN-02: GET /api/finance/virtual-accounts returns VA list for authenticated student")
    void testGetVirtualAccountsEndpoint() throws Exception {
        mockMvc.perform(get("/api/finance/virtual-accounts")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].bankName").value(notNullValue()))
                .andExpect(jsonPath("$[0].vaNumber").value(notNullValue()));
    }
}
