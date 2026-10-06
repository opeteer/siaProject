package com.opeteer.spring_boot.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "courses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private String name;

    private String classGroup;

    @Column(nullable = false)
    private Integer sks;

    private String lecturer;

    @Column(name = "schedule_time")
    private String time;

    private String room;

    @Column(name = "schedule_day", nullable = false)
    private String day;

    private String themeColor;
}
