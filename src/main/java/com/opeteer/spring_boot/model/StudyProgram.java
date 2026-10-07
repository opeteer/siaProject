package com.opeteer.spring_boot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "study_programs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyProgram {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String degree;

    private String headOfProgram;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "faculty_id")
    private Faculty faculty;

    @OneToMany(mappedBy = "studyProgram", cascade = CascadeType.ALL)
    @Builder.Default
    @JsonIgnore
    private List<Curriculum> curriculums = new ArrayList<>();

    @OneToMany(mappedBy = "studyProgram")
    @Builder.Default
    @JsonIgnore
    private List<Student> students = new ArrayList<>();

    @OneToMany(mappedBy = "studyProgram")
    @Builder.Default
    @JsonIgnore
    private List<Lecturer> lecturers = new ArrayList<>();

    @OneToMany(mappedBy = "studyProgram")
    @Builder.Default
    @JsonIgnore
    private List<Course> courses = new ArrayList<>();
}
