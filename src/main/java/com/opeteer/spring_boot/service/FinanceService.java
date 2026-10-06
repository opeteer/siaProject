package com.opeteer.spring_boot.service;

import com.opeteer.spring_boot.dto.FinanceDtos.*;
import com.opeteer.spring_boot.model.TuitionBill;
import com.opeteer.spring_boot.model.VirtualAccount;
import com.opeteer.spring_boot.repository.TuitionBillRepository;
import com.opeteer.spring_boot.repository.VirtualAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FinanceService {

    private final TuitionBillRepository tuitionBillRepository;
    private final VirtualAccountRepository virtualAccountRepository;

    @Transactional(readOnly = true)
    public TuitionResponse getTuition(String nim) {
        List<TuitionBill> bills = tuitionBillRepository.findByStudent_Nim(nim);

        BigDecimal totalBill = BigDecimal.ZERO;
        BigDecimal totalPaid = BigDecimal.ZERO;

        List<TuitionItemDto> items = bills.stream()
                .map(b -> {
                    return new TuitionItemDto(
                            b.getId(),
                            b.getName(),
                            b.getAmount(),
                            b.getStatus(),
                            b.getDueDate(),
                            b.getPaidDate(),
                            b.getReceiptNumber()
                    );
                })
                .toList();

        for (TuitionBill b : bills) {
            totalBill = totalBill.add(b.getAmount());
            if ("LUNAS".equalsIgnoreCase(b.getStatus())) {
                totalPaid = totalPaid.add(b.getAmount());
            }
        }

        BigDecimal remainingBill = totalBill.subtract(totalPaid);
        String status = (remainingBill.compareTo(BigDecimal.ZERO) <= 0) ? "LUNAS" : "BELUM LUNAS";

        return new TuitionResponse(totalBill, totalPaid, remainingBill, status, items);
    }

    @Transactional(readOnly = true)
    public List<VirtualAccountDto> getVirtualAccounts(String nim) {
        List<VirtualAccount> vas = virtualAccountRepository.findByStudent_Nim(nim);

        return vas.stream()
                .map(v -> new VirtualAccountDto(v.getId(), v.getBankName(), v.getVaNumber(), v.getHolderName()))
                .toList();
    }
}
