package com.opeteer.spring_boot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "academic_periods")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AcademicPeriod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String academicYear;

    @Column(nullable = false)
    private String semesterType;

    @Builder.Default
    private Boolean isActive = false;

    private String startDate;

    private String endDate;

    @OneToMany(mappedBy = "academicPeriod")
    @Builder.Default
    @JsonIgnore
    private List<Course> courses = new ArrayList<>();

    @OneToMany(mappedBy = "academicPeriod")
    @Builder.Default
    @JsonIgnore
    private List<Enrollment> enrollments = new ArrayList<>();
}
