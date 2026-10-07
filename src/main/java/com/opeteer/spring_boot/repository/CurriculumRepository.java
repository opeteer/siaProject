package com.opeteer.spring_boot.repository;

import com.opeteer.spring_boot.model.Curriculum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CurriculumRepository extends JpaRepository<Curriculum, Long> {
    Optional<Curriculum> findByCode(String code);
    List<Curriculum> findByStudyProgramId(Long studyProgramId);
}
