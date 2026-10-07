package com.opeteer.spring_boot.service;

import com.opeteer.spring_boot.dto.LecturerDtos.*;
import com.opeteer.spring_boot.model.Course;
import com.opeteer.spring_boot.model.Lecturer;
import com.opeteer.spring_boot.model.Student;
import com.opeteer.spring_boot.repository.CourseRepository;
import com.opeteer.spring_boot.repository.LecturerRepository;
import com.opeteer.spring_boot.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LecturerService {

    private final LecturerRepository lecturerRepository;
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;

    @Transactional(readOnly = true)
    public List<LecturerDto> getAllLecturers() {
        return lecturerRepository.findAll().stream()
                .map(this::mapToDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public LecturerDetailDto getLecturerByNpp(String npp) {
        Lecturer lecturer = lecturerRepository.findByNpp(npp)
                .orElseThrow(() -> new IllegalArgumentException("Dosen dengan NPP " + npp + " tidak ditemukan"));

        List<Course> courses = courseRepository.findByLecturerEntity_Npp(npp);
        List<LecturerCourseDto> taughtCourses = courses.stream()
                .map(c -> new LecturerCourseDto(
                        c.getId(),
                        c.getCode(),
                        c.getName(),
                        c.getClassGroup(),
                        c.getSks(),
                        c.getTime(),
                        c.getRoom(),
                        c.getDay()
                ))
                .toList();

        List<Student> advisees = studentRepository.findByAdvisor_Lecturer_Npp(npp);
        List<LecturerAdviseeDto> adviseeDtos = advisees.stream()
                .map(s -> new LecturerAdviseeDto(
                        s.getNim(),
                        s.getName(),
                        s.getMajor(),
                        s.getStatus(),
                        s.getAngkatan()
                ))
                .toList();

        return new LecturerDetailDto(
                lecturer.getId(),
                lecturer.getNpp(),
                lecturer.getNidn(),
                lecturer.getName(),
                lecturer.getAcademicTitle(),
                lecturer.getEmail(),
                lecturer.getPhone(),
                lecturer.getDepartment(),
                lecturer.getFaculty(),
                lecturer.getStatus(),
                taughtCourses,
                adviseeDtos
        );
    }

    private LecturerDto mapToDto(Lecturer l) {
        return new LecturerDto(
                l.getId(),
                l.getNpp(),
                l.getNidn(),
                l.getName(),
                l.getAcademicTitle(),
                l.getEmail(),
                l.getPhone(),
                l.getDepartment(),
                l.getFaculty(),
                l.getStatus()
        );
    }
}
