package com.opeteer.spring_boot.repository;

import com.opeteer.spring_boot.model.Lecturer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LecturerRepository extends JpaRepository<Lecturer, Long> {
    Optional<Lecturer> findByNpp(String npp);
    Optional<Lecturer> findByNidn(String nidn);
    List<Lecturer> findByDepartment(String department);
    boolean existsByNpp(String npp);
}
