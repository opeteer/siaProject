package com.opeteer.spring_boot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "lecturers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lecturer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String npp;

    @Column(unique = true)
    private String nidn;

    @Column(nullable = false)
    private String name;

    private String academicTitle;

    private String email;

    private String phone;

    private String department;

    private String faculty;

    private String status;

    @OneToMany(mappedBy = "lecturer", cascade = CascadeType.ALL)
    @Builder.Default
    @JsonIgnore
    private List<Advisor> advisors = new ArrayList<>();

    @OneToMany(mappedBy = "lecturerEntity", cascade = CascadeType.ALL)
    @Builder.Default
    @JsonIgnore
    private List<Course> courses = new ArrayList<>();
}
