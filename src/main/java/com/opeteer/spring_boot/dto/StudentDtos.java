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
            String phone,
            String domicileAddress
    ) {}
}
