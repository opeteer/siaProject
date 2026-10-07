package com.opeteer.spring_boot.controller;

import com.opeteer.spring_boot.dto.OrganizationDtos.*;
import com.opeteer.spring_boot.service.OrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academic/organization")
@RequiredArgsConstructor
public class OrganizationController {

    private final OrganizationService organizationService;

    @GetMapping("/faculties")
    public ResponseEntity<List<FacultyDto>> getFaculties() {
        return ResponseEntity.ok(organizationService.getAllFaculties());
    }

    @GetMapping("/study-programs")
    public ResponseEntity<List<StudyProgramDto>> getStudyPrograms() {
        return ResponseEntity.ok(organizationService.getAllStudyPrograms());
    }

    @GetMapping("/buildings")
    public ResponseEntity<List<BuildingDto>> getBuildings() {
        return ResponseEntity.ok(organizationService.getAllBuildings());
    }

    @GetMapping("/classrooms")
    public ResponseEntity<List<ClassroomDto>> getClassrooms() {
        return ResponseEntity.ok(organizationService.getAllClassrooms());
    }

    @GetMapping("/periods")
    public ResponseEntity<List<AcademicPeriodDto>> getAcademicPeriods() {
        return ResponseEntity.ok(organizationService.getAllAcademicPeriods());
    }

    @GetMapping("/periods/active")
    public ResponseEntity<AcademicPeriodDto> getActivePeriod() {
        AcademicPeriodDto activePeriod = organizationService.getActiveAcademicPeriod();
        if (activePeriod == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(activePeriod);
    }

    @GetMapping("/curriculums/{studyProgramId}")
    public ResponseEntity<List<CurriculumDto>> getCurriculumsByStudyProgram(@PathVariable Long studyProgramId) {
        return ResponseEntity.ok(organizationService.getCurriculumsByStudyProgram(studyProgramId));
    }
}
