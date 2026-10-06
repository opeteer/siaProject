package com.opeteer.spring_boot;

import com.opeteer.spring_boot.dto.FinanceDtos.TuitionResponse;
import com.opeteer.spring_boot.dto.FinanceDtos.VirtualAccountDto;
import com.opeteer.spring_boot.service.FinanceService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class FinanceServiceTest {

    @Autowired
    private FinanceService financeService;

    @Test
    @DisplayName("UT-FIN-01: Calculate tuition bills and check LUNAS status")
    void testGetTuitionLunas() {
        TuitionResponse tuition = financeService.getTuition("235314003");

        assertNotNull(tuition);
        assertEquals("LUNAS", tuition.status());
        assertEquals(0, BigDecimal.ZERO.compareTo(tuition.remainingBill()), "Remaining bill must be zero when fully paid");
        assertEquals(3, tuition.items().size(), "Should have 3 bill items");

        // Verify total amount equals sum of items (3,850,000 + 2,590,000 + 250,000)
        BigDecimal expectedTotal = new BigDecimal("6690000");
        assertEquals(0, expectedTotal.compareTo(tuition.totalBill()), "Total bill should equal 6,690,000");
        assertEquals(0, expectedTotal.compareTo(tuition.totalPaid()), "Total paid should equal 6,690,000");
    }

    @Test
    @DisplayName("UT-FIN-02: Retrieve virtual accounts list for tuition payment")
    void testGetVirtualAccounts() {
        List<VirtualAccountDto> vas = financeService.getVirtualAccounts("235314003");

        assertNotNull(vas);
        assertEquals(3, vas.size(), "Should provide 3 virtual account options (BNI, Mandiri, BCA)");

        assertTrue(vas.stream().anyMatch(v -> "Bank BNI (VA)".equals(v.bankName()) && "9880 2353 1400 3001".equals(v.vaNumber())));
        assertTrue(vas.stream().anyMatch(v -> "Bank Mandiri (VA)".equals(v.bankName()) && "8910 2353 1400 3002".equals(v.vaNumber())));
        assertTrue(vas.stream().anyMatch(v -> "Bank BCA (VA)".equals(v.bankName()) && "1099 2353 1400 3003".equals(v.vaNumber())));
    }

    @Test
    @DisplayName("UT-FIN-03: Empty results for non-registered student in finance")
    void testGetTuitionForUnknownStudent() {
        TuitionResponse tuition = financeService.getTuition("000000000");
        assertNotNull(tuition);
        assertEquals(0, BigDecimal.ZERO.compareTo(tuition.totalBill()));
        assertEquals(0, BigDecimal.ZERO.compareTo(tuition.remainingBill()));
        assertEquals("LUNAS", tuition.status());
        assertTrue(tuition.items().isEmpty());

        List<VirtualAccountDto> vas = financeService.getVirtualAccounts("000000000");
        assertNotNull(vas);
        assertTrue(vas.isEmpty());
    }
}
