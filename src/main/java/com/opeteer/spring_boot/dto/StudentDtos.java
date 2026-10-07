package com.opeteer.spring_boot.dto;

import java.math.BigDecimal;

public class StudentDtos {

    public record AdvisorDto(
            String name,
            String npp,
            String title,
            String email,
            String notes,
            String evaluation
    ) {}

    public record BiodataDto(
            String nik,
            String birthPlaceDate,
            String gender,
            String religion,
            String highSchool,
            String highSchoolMajor,
            String studentEmail,
            String phone,
            String domicileAddress
    ) {}

    public record StudentProfileResponse(
            String nim,
            String name,
            String initials,
            String major,
            String faculty,
            String campus,
            String status,
            String angkatan,
            String currentSemester,
            BigDecimal ipk,
            BigDecimal ips,
            Integer totalSksPassed,
            Integer currentSemesterSks,
            Integer maxSksAllowed,
            Boolean krsApproved,
            AdvisorDto advisor,
            BiodataDto biodata
    ) {}

    public record BiodataUpdateRequest(
            @jakarta.validation.constraints.NotBlank(message = "Nomor telepon tidak boleh kosong")
            @jakarta.validation.constraints.Pattern(regexp = "^[+0-9\\s\\-()]{8,25}$", message = "Format nomor telepon tidak valid")
            String phone,

            @jakarta.validation.constraints.NotBlank(message = "Alamat domisili tidak boleh kosong")
            @jakarta.validation.constraints.Size(min = 5, max = 255, message = "Alamat domisili harus antara 5 hingga 255 karakter")
            String domicileAddress
    ) {}
}
