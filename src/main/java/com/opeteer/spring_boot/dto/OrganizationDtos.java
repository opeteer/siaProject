package com.opeteer.spring_boot.dto;

import java.util.List;

public class OrganizationDtos {

    public record FacultyDto(
            Long id,
            String code,
            String name,
            String dean,
            List<StudyProgramSummaryDto> studyPrograms
    ) {}

    public record StudyProgramSummaryDto(
            Long id,
            String code,
            String name,
            String degree
    ) {}

    public record StudyProgramDto(
            Long id,
            String code,
            String name,
            String degree,
            String headOfProgram,
            String facultyCode,
            String facultyName
    ) {}

    public record CurriculumDto(
            Long id,
            String code,
            String name,
            Integer startYear,
            Integer totalSksGraduation,
            String studyProgramCode,
            String studyProgramName
    ) {}

    public record ClassroomDto(
            Long id,
            String code,
            String name,
            Integer capacity,
            String roomType,
            String buildingCode,
            String buildingName
    ) {}

    public record BuildingDto(
            Long id,
            String code,
            String name,
            String campusLocation,
            List<ClassroomDto> classrooms
    ) {}

    public record AcademicPeriodDto(
            Long id,
            String code,
            String academicYear,
            String semesterType,
            Boolean isActive,
            String startDate,
            String endDate
    ) {}
}
