package com.opeteer.spring_boot.service;

import com.opeteer.spring_boot.dto.OrganizationDtos.*;
import com.opeteer.spring_boot.model.*;
import com.opeteer.spring_boot.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrganizationService {

    private final FacultyRepository facultyRepository;
    private final StudyProgramRepository studyProgramRepository;
    private final CurriculumRepository curriculumRepository;
    private final BuildingRepository buildingRepository;
    private final ClassroomRepository classroomRepository;
    private final AcademicPeriodRepository academicPeriodRepository;

    public List<FacultyDto> getAllFaculties() {
        return facultyRepository.findAll().stream()
                .map(this::mapFacultyToDto)
                .toList();
    }

    public List<StudyProgramDto> getAllStudyPrograms() {
        return studyProgramRepository.findAll().stream()
                .map(this::mapStudyProgramToDto)
                .toList();
    }

    public List<BuildingDto> getAllBuildings() {
        return buildingRepository.findAll().stream()
                .map(this::mapBuildingToDto)
                .toList();
    }

    public List<ClassroomDto> getAllClassrooms() {
        return classroomRepository.findAll().stream()
                .map(this::mapClassroomToDto)
                .toList();
    }

    public List<AcademicPeriodDto> getAllAcademicPeriods() {
        return academicPeriodRepository.findAll().stream()
                .map(this::mapAcademicPeriodToDto)
                .toList();
    }

    public AcademicPeriodDto getActiveAcademicPeriod() {
        return academicPeriodRepository.findByIsActiveTrue()
                .map(this::mapAcademicPeriodToDto)
                .orElse(null);
    }

    public List<CurriculumDto> getCurriculumsByStudyProgram(Long studyProgramId) {
        return curriculumRepository.findByStudyProgramId(studyProgramId).stream()
                .map(this::mapCurriculumToDto)
                .toList();
    }

    private FacultyDto mapFacultyToDto(Faculty f) {
        List<StudyProgramSummaryDto> prodiSummaries = f.getStudyPrograms() != null
                ? f.getStudyPrograms().stream()
                .map(p -> new StudyProgramSummaryDto(p.getId(), p.getCode(), p.getName(), p.getDegree()))
                .toList()
                : List.of();

        return new FacultyDto(
                f.getId(),
                f.getCode(),
                f.getName(),
                f.getDean(),
                prodiSummaries
        );
    }

    private StudyProgramDto mapStudyProgramToDto(StudyProgram p) {
        return new StudyProgramDto(
                p.getId(),
                p.getCode(),
                p.getName(),
                p.getDegree(),
                p.getHeadOfProgram(),
                p.getFaculty() != null ? p.getFaculty().getCode() : null,
                p.getFaculty() != null ? p.getFaculty().getName() : null
        );
    }

    private BuildingDto mapBuildingToDto(Building b) {
        List<ClassroomDto> roomDtos = b.getClassrooms() != null
                ? b.getClassrooms().stream().map(this::mapClassroomToDto).toList()
                : List.of();

        return new BuildingDto(
                b.getId(),
                b.getCode(),
                b.getName(),
                b.getCampusLocation(),
                roomDtos
        );
    }

    private ClassroomDto mapClassroomToDto(Classroom c) {
        return new ClassroomDto(
                c.getId(),
                c.getCode(),
                c.getName(),
                c.getCapacity(),
                c.getRoomType(),
                c.getBuilding() != null ? c.getBuilding().getCode() : null,
                c.getBuilding() != null ? c.getBuilding().getName() : null
        );
    }

    private AcademicPeriodDto mapAcademicPeriodToDto(AcademicPeriod p) {
        return new AcademicPeriodDto(
                p.getId(),
                p.getCode(),
                p.getAcademicYear(),
                p.getSemesterType(),
                p.getIsActive(),
                p.getStartDate(),
                p.getEndDate()
        );
    }

    private CurriculumDto mapCurriculumToDto(Curriculum c) {
        return new CurriculumDto(
                c.getId(),
                c.getCode(),
                c.getName(),
                c.getStartYear(),
                c.getTotalSksGraduation(),
                c.getStudyProgram() != null ? c.getStudyProgram().getCode() : null,
                c.getStudyProgram() != null ? c.getStudyProgram().getName() : null
        );
    }
}
