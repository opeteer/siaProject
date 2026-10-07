package com.opeteer.spring_boot;

import com.opeteer.spring_boot.model.AcademicMilestone;
import com.opeteer.spring_boot.model.Announcement;
import com.opeteer.spring_boot.service.AnnouncementService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AnnouncementServiceTest {

    @Autowired
    private AnnouncementService announcementService;

    @Test
    @DisplayName("UT-ANN-01: Retrieve all announcements sorted with pinned items first")
    void testGetAllAnnouncements() {
        List<Announcement> list = announcementService.getAnnouncements("Semua");

        assertNotNull(list);
        assertFalse(list.isEmpty(), "Announcements list should not be empty");
        assertTrue(list.size() >= 3, "Should have at least 3 seeded announcements");

        // First item must be pinned
        assertTrue(list.get(0).getIsPinned(), "First announcement in the feed must be pinned");
    }

    @Test
    @DisplayName("UT-ANN-02: Filter announcements by specific category")
    void testFilterAnnouncementsByCategory() {
        List<Announcement> baaList = announcementService.getAnnouncements("BAA USD");
        assertNotNull(baaList);
        assertFalse(baaList.isEmpty());
        assertTrue(baaList.stream().allMatch(a -> a.getBadge().contains("BAA USD")));

        List<Announcement> prodiList = announcementService.getAnnouncements("PRODI INFORMATIKA");
        assertNotNull(prodiList);
        assertFalse(prodiList.isEmpty());
        assertTrue(prodiList.stream().allMatch(a -> a.getBadge().contains("PRODI INFORMATIKA")));
    }

    @Test
    @DisplayName("UT-ANN-03: Filter with non-matching category returns empty list")
    void testFilterNonExistentCategory() {
        List<Announcement> emptyList = announcementService.getAnnouncements("NON_EXISTENT_CATEGORY_XYZ");
        assertNotNull(emptyList);
        assertTrue(emptyList.isEmpty());
    }

    @Test
    @DisplayName("UT-ANN-04: Retrieve academic milestones calendar in chronological order")
    void testGetMilestones() {
        List<AcademicMilestone> milestones = announcementService.getMilestones();

        assertNotNull(milestones);
        assertEquals(4, milestones.size(), "Should have exactly 4 seeded academic milestones");

        assertEquals("18 - 28 Maret 2026", milestones.get(0).getDateStr());
        assertEquals("06 - 10 April 2026", milestones.get(1).getDateStr());
        assertEquals("04 - 15 Mei 2026", milestones.get(2).getDateStr());
        assertEquals("15 - 26 Juni 2026", milestones.get(3).getDateStr());
    }
}
