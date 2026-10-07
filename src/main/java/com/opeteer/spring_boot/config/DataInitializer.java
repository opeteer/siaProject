package com.opeteer.spring_boot.config;

import com.opeteer.spring_boot.model.*;
import com.opeteer.spring_boot.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final StudentRepository studentRepository;
    private final AdvisorRepository advisorRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final TuitionBillRepository tuitionBillRepository;
    private final VirtualAccountRepository virtualAccountRepository;
    private final AnnouncementRepository announcementRepository;
    private final AcademicMilestoneRepository milestoneRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        if (studentRepository.existsByNim("235314003")) {
            log.info("Database already seeded with student NIM 235314003.");
            return;
        }

        log.info("Initializing SIA Sanata Dharma (USD) database seed data...");

        // 1. Advisor
        Advisor advisor = advisorRepository.save(Advisor.builder()
                .name("Prof. Ir. Bambang Soelistijanto, Ph.D.")
                .npp("02198014")
                .title("Guru Besar FST USD")
                .email("bambang.s@usd.ac.id")
                .notes("Pertahankan prestasi akademik semester ini. Fokus pada persiapan usulan topik skripsi bidang jaringan cerdas.")
                .evaluation("Sangat Baik")
                .build());

        // 2. Biodata
        Biodata biodata = Biodata.builder()
                .nik("3471011508020003")
                .birthPlaceDate("Semarang, 15 Agustus 2004")
                .gender("Laki-laki")
                .religion("Katolik")
                .highSchool("SMA Sedes Sapientiae")
                .highSchoolMajor("MIPA (Matematika & IPA)")
                .studentEmail("235314003@student.usd.ac.id")
                .phone("+62 812-3456-7890")
                .domicileAddress("Jl. Paingan No. 42, Maguwoharjo, Depok, Sleman, D.I. Yogyakarta 55282")
                .build();

        // 3. Student
        Student student = Student.builder()
                .nim("235314003")
                .name("Gerardo Ardianta")
                .initials("GA")
                .major("S1 Teknik Informatika")
                .faculty("Fakultas Sains dan Teknologi (FST)")
                .campus("Kampus III Paingan, Maguwoharjo")
                .status("Aktif (Semester 6 Genap)")
                .angkatan("2023 / Reguler")
                .currentSemester("Semester Genap 2025/2026")
                .ipk(new BigDecimal("3.78"))
                .ips(new BigDecimal("3.85"))
                .totalSksPassed(112)
                .currentSemesterSks(14)
                .maxSksAllowed(24)
                .krsApproved(true)
                .passwordHash(passwordEncoder.encode("password123"))
                .advisor(advisor)
                .biodata(biodata)
                .build();

        student = studentRepository.save(student);

        // 4. Courses
        Course c1 = courseRepository.save(Course.builder()
                .code("INF-331")
                .name("Analisis Proses Bisnis")
                .classGroup("Kelas C")
                .sks(3)
                .lecturer("Agnes Maria Polina, S.Kom., M.Sc.")
                .time("07:00 - 08:40")
                .room("R.314 St. Robertus")
                .day("Senin")
                .themeColor("blue")
                .build());

        Course c2 = courseRepository.save(Course.builder()
                .code("INF-332")
                .name("Desain UI/UX")
                .classGroup("Kelas A")
                .sks(3)
                .lecturer("Dr. Ir. Iwan Binanto")
                .time("10:30 - 12:10")
                .room("Lab Komputer 2 Lt.3")
                .day("Senin")
                .themeColor("sky")
                .build());

        Course c3 = courseRepository.save(Course.builder()
                .code("INF-333")
                .name("Pemrograman Perangkat Bergerak")
                .classGroup("Kelas B")
                .sks(3)
                .lecturer("Puspaningtyas Sanjoyo Adi, S.T., M.T.")
                .time("08:45 - 10:25")
                .room("Lab Pemrograman Lt.2")
                .day("Selasa")
                .themeColor("purple")
                .build());

        Course c4 = courseRepository.save(Course.builder()
                .code("INF-334")
                .name("Pengukuran & Analisis Kinerja Jaringan")
                .classGroup("Kelas A")
                .sks(3)
                .lecturer("Prof. Ir. Bambang Soelistijanto, Ph.D.")
                .time("07:00 - 08:40")
                .room("R.312 St. Robertus")
                .day("Rabu")
                .themeColor("emerald")
                .build());

        Course c5 = courseRepository.save(Course.builder()
                .code("INF-335")
                .name("Metodologi Penelitian")
                .classGroup("Kelas A")
                .sks(2)
                .lecturer("Prof. Ir. Bambang Soelistijanto, Ph.D.")
                .time("08:45 - 10:25")
                .room("R.205 Thomas Aquinas")
                .day("Kamis")
                .themeColor("amber")
                .build());

        // 5. Enrollments (KRS & KHS)
        enrollmentRepository.save(Enrollment.builder()
                .student(student).course(c1).academicYear("2025/2026").semesterType("GENAP")
                .isApproved(true).gradeLetter("A").gradePoint(new BigDecimal("12.00")).build());

        enrollmentRepository.save(Enrollment.builder()
                .student(student).course(c2).academicYear("2025/2026").semesterType("GENAP")
                .isApproved(true).gradeLetter("A").gradePoint(new BigDecimal("12.00")).build());

        enrollmentRepository.save(Enrollment.builder()
                .student(student).course(c3).academicYear("2025/2026").semesterType("GENAP")
                .isApproved(true).gradeLetter("A-").gradePoint(new BigDecimal("11.25")).build());

        enrollmentRepository.save(Enrollment.builder()
                .student(student).course(c4).academicYear("2025/2026").semesterType("GENAP")
                .isApproved(true).gradeLetter("A").gradePoint(new BigDecimal("12.00")).build());

        enrollmentRepository.save(Enrollment.builder()
                .student(student).course(c5).academicYear("2025/2026").semesterType("GENAP")
                .isApproved(true).gradeLetter("A-").gradePoint(new BigDecimal("7.50")).build());

        // 6. Tuition Bills
        tuitionBillRepository.save(TuitionBill.builder()
                .student(student)
                .name("SPP Tetap Semester Genap 2025/2026")
                .amount(new BigDecimal("3850000"))
                .status("LUNAS")
                .dueDate("15 Januari 2026")
                .paidDate("12 Januari 2026 • 10:14 WIB")
                .receiptNumber("BKR-USD-2026-01-44910")
                .build());

        tuitionBillRepository.save(TuitionBill.builder()
                .student(student)
                .name("SPP Variabel (14 SKS @ Rp 185.000)")
                .amount(new BigDecimal("2590000"))
                .status("LUNAS")
                .dueDate("05 Maret 2026")
                .paidDate("28 Februari 2026 • 14:32 WIB")
                .receiptNumber("BKR-USD-2026-02-88231")
                .build());

        tuitionBillRepository.save(TuitionBill.builder()
                .student(student)
                .name("Iuran Dana Kemahasiswaan & Asuransi Kesehatan")
                .amount(new BigDecimal("250000"))
                .status("LUNAS")
                .dueDate("15 Januari 2026")
                .paidDate("12 Januari 2026 • 10:14 WIB")
                .receiptNumber("BKR-USD-2026-01-44911")
                .build());

        // 7. Virtual Accounts
        virtualAccountRepository.save(VirtualAccount.builder()
                .student(student).bankName("Bank BNI (VA)").vaNumber("9880 2353 1400 3001")
                .holderName("SIA USD - Gerardo Ardianta").build());

        virtualAccountRepository.save(VirtualAccount.builder()
                .student(student).bankName("Bank Mandiri (VA)").vaNumber("8910 2353 1400 3002")
                .holderName("SIA USD - Gerardo Ardianta").build());

        virtualAccountRepository.save(VirtualAccount.builder()
                .student(student).bankName("Bank BCA (VA)").vaNumber("1099 2353 1400 3003")
                .holderName("SIA USD - Gerardo Ardianta").build());

        // 8. Announcements
        announcementRepository.save(Announcement.builder()
                .title("Jadwal Ujian Tengah Semester (UTS) Genap 2025/2026")
                .badge("PENTING • BAA USD")
                .dateStr("04 Maret 2026")
                .summary("Mulai 18 Maret 2026. Mahasiswa diwajibkan melunasi SPP variabel untuk cetak kartu ujian resmi di portal SIA.")
                .isPinned(true)
                .readTime("3 mnt baca")
                .sender("Biro Administrasi Akademik")
                .build());

        announcementRepository.save(Announcement.builder()
                .title("Pendaftaran Magang Studi Independen Bersertifikat (MSIB) Batch VII")
                .badge("KEMAHASISWAAN")
                .dateStr("02 Maret 2026")
                .summary("Sosialisasi alur konversi 20 SKS untuk mahasiswa semester 6 Prodi Informatika. Batas submit proposal hingga 15 Maret 2026.")
                .isPinned(false)
                .readTime("4 mnt baca")
                .sender("Wakil Dekan III FST")
                .build());

        announcementRepository.save(Announcement.builder()
                .title("Rekrutmen Asisten Dosen & Asisten Laboratorium Komputer Genap 2025/2026")
                .badge("PRODI INFORMATIKA")
                .dateStr("27 Februari 2026")
                .summary("Dibuka lowongan asisten untuk mata kuliah Pemrograman Berorientasi Objek dan Jaringan Komputer. IPK minimal 3.25.")
                .isPinned(false)
                .readTime("2 mnt baca")
                .sender("Laboratorium FST")
                .build());

        announcementRepository.save(Announcement.builder()
                .title("Sosialisasi Program Beasiswa Prestasi & Alumni Sanata Dharma")
                .badge("BEASISWA")
                .dateStr("20 Februari 2026")
                .summary("Bantuan biaya studi semester akhir bagi mahasiswa berprestasi akademik dan keaktifan organisasi.")
                .isPinned(false)
                .readTime("5 mnt baca")
                .sender("Biro Kerjasama & Alumni")
                .build());

        // 9. Academic Milestones
        milestoneRepository.save(AcademicMilestone.builder()
                .dateStr("18 - 28 Maret 2026")
                .title("Ujian Tengah Semester (UTS)")
                .description("Pelaksanaan evaluasi tengah semester luring di Kampus III Paingan.")
                .status("active")
                .build());

        milestoneRepository.save(AcademicMilestone.builder()
                .dateStr("06 - 10 April 2026")
                .title("Batas Akhir Penginputan Nilai UTS")
                .description("Dosen pengampu mengunggah nilai hasil ujian ke portal dosen SIA USD.")
                .status("upcoming")
                .build());

        milestoneRepository.save(AcademicMilestone.builder()
                .dateStr("04 - 15 Mei 2026")
                .title("Konsultasi Pra-KRS & Bimbingan Proposal Skripsi")
                .description("Sesi temu Dosen Pembimbing Akademik untuk mahasiswa angkatan 2023.")
                .status("upcoming")
                .build());

        milestoneRepository.save(AcademicMilestone.builder()
                .dateStr("15 - 26 Juni 2026")
                .title("Ujian Akhir Semester (UAS)")
                .description("Pekan evaluasi akhir semester genap tahun akademik 2025/2026.")
                .status("upcoming")
                .build());

        log.info("Database seeding successfully completed.");
    }
}
