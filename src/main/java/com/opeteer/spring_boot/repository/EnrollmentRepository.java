package com.opeteer.spring_boot.repository;

import com.opeteer.spring_boot.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudent_Nim(String nim);
    List<Enrollment> findByStudent_NimAndAcademicYearAndSemesterType(String nim, String academicYear, String semesterType);
}
