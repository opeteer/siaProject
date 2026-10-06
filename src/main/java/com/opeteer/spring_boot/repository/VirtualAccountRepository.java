package com.opeteer.spring_boot.repository;

import com.opeteer.spring_boot.model.VirtualAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VirtualAccountRepository extends JpaRepository<VirtualAccount, Long> {
    List<VirtualAccount> findByStudent_Nim(String nim);
}
