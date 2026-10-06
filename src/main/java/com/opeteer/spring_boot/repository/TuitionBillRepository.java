package com.opeteer.spring_boot.repository;

import com.opeteer.spring_boot.model.TuitionBill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TuitionBillRepository extends JpaRepository<TuitionBill, Long> {
    List<TuitionBill> findByStudent_Nim(String nim);
}
