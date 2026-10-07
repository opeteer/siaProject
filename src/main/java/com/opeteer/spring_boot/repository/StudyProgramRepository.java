package com.opeteer.spring_boot.repository;

import com.opeteer.spring_boot.model.StudyProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudyProgramRepository extends JpaRepository<StudyProgram, Long> {
    Optional<StudyProgram> findByCode(String code);
    List<StudyProgram> findByFacultyId(Long facultyId);
}
