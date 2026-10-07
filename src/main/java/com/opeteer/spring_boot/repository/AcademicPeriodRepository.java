package com.opeteer.spring_boot.repository;

import com.opeteer.spring_boot.model.AcademicPeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AcademicPeriodRepository extends JpaRepository<AcademicPeriod, Long> {
    Optional<AcademicPeriod> findByCode(String code);
    Optional<AcademicPeriod> findByIsActiveTrue();
}
