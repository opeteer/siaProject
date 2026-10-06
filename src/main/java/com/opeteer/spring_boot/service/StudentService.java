package com.opeteer.spring_boot.service;

import com.opeteer.spring_boot.dto.StudentDtos.*;
import com.opeteer.spring_boot.model.Advisor;
import com.opeteer.spring_boot.model.Biodata;
import com.opeteer.spring_boot.model.Student;
import com.opeteer.spring_boot.repository.BiodataRepository;
import com.opeteer.spring_boot.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final BiodataRepository biodataRepository;

    @Transactional(readOnly = true)
    public StudentProfileResponse getProfile(String nim) {
        Student student = studentRepository.findByNim(nim)
                .orElseThrow(() -> new IllegalArgumentException("Mahasiswa dengan NIM " + nim + " tidak ditemukan"));

        Advisor adv = student.getAdvisor();
        AdvisorDto advisorDto = (adv != null) ? new AdvisorDto(
                adv.getName(),
                adv.getNpp(),
                adv.getTitle(),
                adv.getEmail(),
                adv.getNotes(),
                adv.getEvaluation()
        ) : null;

        Biodata bio = student.getBiodata();
        BiodataDto biodataDto = (bio != null) ? new BiodataDto(
                bio.getNik(),
                bio.getBirthPlaceDate(),
                bio.getGender(),
                bio.getReligion(),
                bio.getHighSchool(),
                bio.getHighSchoolMajor(),
                bio.getStudentEmail(),
                bio.getPhone(),
                bio.getDomicileAddress()
        ) : null;

        return new StudentProfileResponse(
                student.getNim(),
                student.getName(),
                student.getInitials(),
                student.getMajor(),
                student.getFaculty(),
                student.getCampus(),
                student.getStatus(),
                student.getAngkatan(),
                student.getCurrentSemester(),
                student.getIpk(),
                student.getIps(),
                student.getTotalSksPassed(),
                student.getCurrentSemesterSks(),
                student.getMaxSksAllowed(),
                student.getKrsApproved(),
                advisorDto,
                biodataDto
        );
    }

    @Transactional(readOnly = true)
    public BiodataDto getBiodata(String nim) {
        Biodata bio = biodataRepository.findByStudent_Nim(nim)
                .orElseThrow(() -> new IllegalArgumentException("Biodata untuk NIM " + nim + " tidak ditemukan"));

        return new BiodataDto(
                bio.getNik(),
                bio.getBirthPlaceDate(),
                bio.getGender(),
                bio.getReligion(),
                bio.getHighSchool(),
                bio.getHighSchoolMajor(),
                bio.getStudentEmail(),
                bio.getPhone(),
                bio.getDomicileAddress()
        );
    }

    @Transactional
    public BiodataDto updateBiodata(String nim, BiodataUpdateRequest request) {
        Biodata bio = biodataRepository.findByStudent_Nim(nim)
                .orElseThrow(() -> new IllegalArgumentException("Biodata untuk NIM " + nim + " tidak ditemukan"));

        if (request.phone() != null && !request.phone().isBlank()) {
            bio.setPhone(request.phone().trim());
        }
        if (request.domicileAddress() != null && !request.domicileAddress().isBlank()) {
            bio.setDomicileAddress(request.domicileAddress().trim());
        }

        Biodata saved = biodataRepository.save(bio);

        return new BiodataDto(
                saved.getNik(),
                saved.getBirthPlaceDate(),
                saved.getGender(),
                saved.getReligion(),
                saved.getHighSchool(),
                saved.getHighSchoolMajor(),
                saved.getStudentEmail(),
                saved.getPhone(),
                saved.getDomicileAddress()
        );
    }
}
