package com.opeteer.spring_boot.repository;

import com.opeteer.spring_boot.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByNim(String nim);
    boolean existsByNim(String nim);
}
