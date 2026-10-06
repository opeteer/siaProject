package com.opeteer.spring_boot.controller;

import com.opeteer.spring_boot.dto.FinanceDtos.TuitionResponse;
import com.opeteer.spring_boot.dto.FinanceDtos.VirtualAccountDto;
import com.opeteer.spring_boot.service.FinanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/finance")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FinanceController {

    private final FinanceService financeService;

    @GetMapping("/tuition")
    public ResponseEntity<TuitionResponse> getTuition(@RequestParam(defaultValue = "235314003") String nim) {
        return ResponseEntity.ok(financeService.getTuition(nim));
    }

    @GetMapping("/virtual-accounts")
    public ResponseEntity<List<VirtualAccountDto>> getVirtualAccounts(@RequestParam(defaultValue = "235314003") String nim) {
        return ResponseEntity.ok(financeService.getVirtualAccounts(nim));
    }
}
