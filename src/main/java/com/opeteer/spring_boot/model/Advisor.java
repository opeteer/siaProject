package com.opeteer.spring_boot.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "advisors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Advisor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String npp;

    private String title;

    private String email;

    @Column(columnDefinition = "TEXT")
    private String notes;

    private String evaluation;
}
