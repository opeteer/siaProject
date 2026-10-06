package com.opeteer.spring_boot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "biodatas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Biodata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nik;

    private String birthPlaceDate;

    private String gender;

    private String religion;

    private String highSchool;

    private String highSchoolMajor;

    private String studentEmail;

    private String phone;

    @Column(columnDefinition = "TEXT")
    private String domicileAddress;

    @OneToOne(mappedBy = "biodata")
    @JsonIgnore
    private Student student;
}
