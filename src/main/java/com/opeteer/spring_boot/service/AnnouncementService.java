package com.opeteer.spring_boot.service;

import com.opeteer.spring_boot.model.AcademicMilestone;
import com.opeteer.spring_boot.model.Announcement;
import com.opeteer.spring_boot.repository.AcademicMilestoneRepository;
import com.opeteer.spring_boot.repository.AnnouncementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final AcademicMilestoneRepository milestoneRepository;

    @Transactional(readOnly = true)
    public List<Announcement> getAnnouncements(String category) {
        if (category == null || category.isBlank() || "Semua".equalsIgnoreCase(category)) {
            return announcementRepository.findAllByOrderByIsPinnedDescIdDesc();
        }
        return announcementRepository.findByBadgeContainingIgnoreCase(category);
    }

    @Transactional(readOnly = true)
    public List<AcademicMilestone> getMilestones() {
        return milestoneRepository.findAllByOrderByIdAsc();
    }
}
