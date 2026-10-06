package com.opeteer.spring_boot.service;

import com.opeteer.spring_boot.dto.AcademicDtos.*;
import com.opeteer.spring_boot.model.Course;
import com.opeteer.spring_boot.model.Enrollment;
import com.opeteer.spring_boot.model.Student;
import com.opeteer.spring_boot.repository.CourseRepository;
import com.opeteer.spring_boot.repository.EnrollmentRepository;
import com.opeteer.spring_boot.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcademicService {

    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;

    @Transactional(readOnly = true)
    public List<CourseDto> getWeeklySchedule() {
        return courseRepository.findAll().stream()
                .map(c -> new CourseDto(
                        c.getId(),
                        c.getCode(),
                        c.getName(),
                        c.getClassGroup(),
                        c.getSks(),
                        c.getLecturer(),
                        c.getTime(),
                        c.getRoom(),
                        c.getDay(),
                        c.getThemeColor()
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public KrsResponse getKrs(String nim) {
        Student student = studentRepository.findByNim(nim)
                .orElseThrow(() -> new IllegalArgumentException("Mahasiswa tidak ditemukan"));

        List<Enrollment> enrollments = enrollmentRepository.findByStudent_Nim(nim);

        List<KrsCourseItemDto> courses = enrollments.stream()
                .map(e -> {
                    Course c = e.getCourse();
                    return new KrsCourseItemDto(
                            c.getId(),
                            c.getCode(),
                            c.getName(),
                            c.getClassGroup(),
                            c.getSks(),
                            c.getLecturer(),
                            c.getTime(),
                            c.getRoom(),
                            c.getDay()
                    );
                })
                .toList();

        int totalSks = courses.stream().mapToInt(KrsCourseItemDto::sks).sum();

        String advisorName = (student.getAdvisor() != null) ? student.getAdvisor().getName() : "-";

        return new KrsResponse(
                "2025/2026",
                "GENAP",
                totalSks,
                student.getMaxSksAllowed(),
                student.getKrsApproved(),
                advisorName,
                courses
        );
    }

    @Transactional(readOnly = true)
    public KhsResponse getKhs(String nim) {
        Student student = studentRepository.findByNim(nim)
                .orElseThrow(() -> new IllegalArgumentException("Mahasiswa tidak ditemukan"));

        List<Enrollment> enrollments = enrollmentRepository.findByStudent_Nim(nim);

        List<KhsGradeItemDto> grades = enrollments.stream()
                .map(e -> {
                    Course c = e.getCourse();
                    return new KhsGradeItemDto(
                            c.getCode(),
                            c.getName(),
                            c.getClassGroup(),
                            c.getLecturer(),
                            c.getSks(),
                            e.getGradeLetter(),
                            e.getGradePoint()
                    );
                })
                .toList();

        int currentSemesterSks = grades.stream().mapToInt(KhsGradeItemDto::sks).sum();

        return new KhsResponse(
                "2025/2026",
                "GENAP",
                student.getIps(),
                student.getIpk(),
                student.getTotalSksPassed(),
                currentSemesterSks,
                grades
        );
    }
}
