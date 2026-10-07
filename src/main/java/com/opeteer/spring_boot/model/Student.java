package com.opeteer.spring_boot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nim;

    @Column(nullable = false)
    private String name;

    @JsonIgnore
    private String passwordHash;

    private String initials;

    private String major;

    private String faculty;

    private String campus;

    private String status;

    private String angkatan;

    private String currentSemester;

    @Column(precision = 3, scale = 2)
    private BigDecimal ipk;

    @Column(precision = 3, scale = 2)
    private BigDecimal ips;

    private Integer totalSksPassed;

    private Integer currentSemesterSks;

    private Integer maxSksAllowed;

    @Builder.Default
    private Boolean krsApproved = true;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "advisor_id")
    private Advisor advisor;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "biodata_id")
    private Biodata biodata;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    @JsonIgnore
    private List<Enrollment> enrollments = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    @JsonIgnore
    private List<TuitionBill> tuitionBills = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    @JsonIgnore
    private List<VirtualAccount> virtualAccounts = new ArrayList<>();
}
