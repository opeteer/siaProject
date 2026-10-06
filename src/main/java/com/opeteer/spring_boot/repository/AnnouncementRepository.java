package com.opeteer.spring_boot.repository;

import com.opeteer.spring_boot.model.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findAllByOrderByIsPinnedDescIdDesc();
    List<Announcement> findByBadgeContainingIgnoreCase(String badge);
}
