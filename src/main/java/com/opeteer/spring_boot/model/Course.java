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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "lecturer_id")
    private Lecturer lecturerEntity;

    @Column(name = "schedule_time")
    private String time;

    private String room;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "study_program_id")
    private StudyProgram studyProgram;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "classroom_id")
    private Classroom classroom;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "academic_period_id")
    private AcademicPeriod academicPeriod;

    @Column(name = "schedule_day", nullable = false)
    private String day;

    private String themeColor;
}
