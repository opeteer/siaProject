package com.opeteer.spring_boot.repository;

import com.opeteer.spring_boot.model.AcademicMilestone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcademicMilestoneRepository extends JpaRepository<AcademicMilestone, Long> {
    List<AcademicMilestone> findAllByOrderByIdAsc();
}
