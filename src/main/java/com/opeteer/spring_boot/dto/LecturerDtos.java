package com.opeteer.spring_boot.dto;

import java.util.List;

public class LecturerDtos {

    public record LecturerDto(
            Long id,
            String npp,
            String nidn,
            String name,
            String academicTitle,
            String email,
            String phone,
            String department,
            String faculty,
            String status
    ) {}

    public record LecturerCourseDto(
            Long id,
            String code,
            String name,
            String classGroup,
            Integer sks,
            String time,
            String room,
            String day
    ) {}

    public record LecturerAdviseeDto(
            String nim,
            String name,
            String major,
            String status,
            String angkatan
    ) {}

    public record LecturerDetailDto(
            Long id,
            String npp,
            String nidn,
            String name,
            String academicTitle,
            String email,
            String phone,
            String department,
            String faculty,
            String status,
            List<LecturerCourseDto> taughtCourses,
            List<LecturerAdviseeDto> advisees
    ) {}
}
