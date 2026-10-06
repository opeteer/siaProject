package com.opeteer.spring_boot.dto;

import java.math.BigDecimal;
import java.util.List;

public class AcademicDtos {

    public record CourseDto(
            Long id,
            String code,
            String name,
            String classGroup,
            Integer sks,
            String lecturer,
            String time,
            String room,
            String day,
            String themeColor
    ) {}

    public record KrsCourseItemDto(
            Long id,
            String code,
            String name,
            String classGroup,
            Integer sks,
            String lecturer,
            String time,
            String room,
            String day
    ) {}

    public record KrsResponse(
            String academicYear,
            String semesterType,
            Integer totalSks,
            Integer maxSksAllowed,
            Boolean krsApproved,
            String advisorName,
            List<KrsCourseItemDto> courses
    ) {}

    public record KhsGradeItemDto(
            String code,
            String name,
            String classGroup,
            String lecturer,
            Integer sks,
            String gradeLetter,
            BigDecimal gradePoint
    ) {}

    public record KhsResponse(
            String academicYear,
            String semesterType,
            BigDecimal ips,
            BigDecimal ipk,
            Integer totalSksPassed,
            Integer currentSemesterSks,
            List<KhsGradeItemDto> grades
    ) {}
}
