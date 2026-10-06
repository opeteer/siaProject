package com.opeteer.spring_boot.dto;

import java.math.BigDecimal;
import java.util.List;

public class FinanceDtos {

    public record TuitionItemDto(
            Long id,
            String name,
            BigDecimal amount,
            String status,
            String dueDate,
            String paidDate,
            String receiptNumber
    ) {}

    public record TuitionResponse(
            BigDecimal totalBill,
            BigDecimal totalPaid,
            BigDecimal remainingBill,
            String status,
            List<TuitionItemDto> items
    ) {}

    public record VirtualAccountDto(
            Long id,
            String bankName,
            String vaNumber,
            String holderName
    ) {}
}
