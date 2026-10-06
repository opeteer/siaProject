package com.opeteer.spring_boot.repository;

import com.opeteer.spring_boot.model.Biodata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BiodataRepository extends JpaRepository<Biodata, Long> {
    Optional<Biodata> findByNik(String nik);
    Optional<Biodata> findByStudent_Nim(String nim);
}
