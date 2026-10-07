package com.opeteer.spring_boot.controller;

import com.opeteer.spring_boot.dto.FinanceDtos.TuitionResponse;
import com.opeteer.spring_boot.dto.FinanceDtos.VirtualAccountDto;
import com.opeteer.spring_boot.service.FinanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/finance")
@RequiredArgsConstructor
public class FinanceController {

    private final FinanceService financeService;

    private String resolveNim(String requestedNim, Authentication auth) {
        if (auth != null && auth.isAuthenticated() && auth.getName() != null && !"anonymousUser".equals(auth.getName())) {
            return auth.getName();
        }
        return (requestedNim != null && !requestedNim.isBlank()) ? requestedNim : "235314003";
    }

    @GetMapping("/tuition")
    public ResponseEntity<TuitionResponse> getTuition(
            @RequestParam(required = false) String nim,
            Authentication auth
    ) {
        return ResponseEntity.ok(financeService.getTuition(resolveNim(nim, auth)));
    }

    @GetMapping("/virtual-accounts")
    public ResponseEntity<List<VirtualAccountDto>> getVirtualAccounts(
            @RequestParam(required = false) String nim,
            Authentication auth
    ) {
        return ResponseEntity.ok(financeService.getVirtualAccounts(resolveNim(nim, auth)));
    }
}
