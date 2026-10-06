import { StudentProfile, CourseSchedule, KhsGrade, TuitionItem, VirtualAccountInfo, AnnouncementItem, AcademicMilestone } from '../types';

export const mockStudent: StudentProfile = {
  nim: '235314003',
  name: 'Gerardo Ardianta',
  initials: 'GA',
  major: 'S1 Teknik Informatika',
  faculty: 'Fakultas Sains dan Teknologi (FST)',
  campus: 'Kampus III Paingan, Maguwoharjo',
  status: 'Aktif (Semester 6 Genap)',
  angkatan: '2023 / Reguler',
  currentSemester: 'Semester Genap 2025/2026',
  ipk: 3.78,
  ips: 3.85,
  totalSksPassed: 112,
  currentSemesterSks: 14,
  maxSksAllowed: 24,
  krsApproved: true,
  advisor: {
    name: 'Prof. Ir. Bambang Soelistijanto, Ph.D.',
    npp: '02198014',
    title: 'Guru Besar FST USD',
    email: 'bambang.s@usd.ac.id',
    notes: 'Pertahankan prestasi akademik semester ini. Fokus pada persiapan usulan topik skripsi bidang jaringan cerdas.',
    evaluation: 'Sangat Baik'
  },
  biodata: {
    nik: '3471011508020003',
    birthPlaceDate: 'Semarang, 15 Agustus 2004',
    gender: 'Laki-laki',
    religion: 'Katolik',
    highSchool: 'SMA Sedes Sapientiae',
    highSchoolMajor: 'MIPA (Matematika & IPA)',
    studentEmail: '235314003@student.usd.ac.id',
    phone: '+62 812-3456-7890',
    domicileAddress: 'Jl. Paingan No. 42, Maguwoharjo, Depok, Sleman, D.I. Yogyakarta 55282'
  }
};

export const mockCourses: CourseSchedule[] = [
  {
    id: 'c1',
    code: 'INF-331',
    name: 'Analisis Proses Bisnis',
    classGroup: 'Kelas C',
    sks: 3,
    lecturer: 'Agnes Maria Polina, S.Kom., M.Sc.',
    time: '07:00 - 08:40',
    room: 'R.314 St. Robertus',
    day: 'Senin',
    themeColor: 'blue'
  },
  {
    id: 'c2',
    code: 'INF-332',
    name: 'Desain UI/UX',
    classGroup: 'Kelas A',
    sks: 3,
    lecturer: 'Dr. Ir. Iwan Binanto',
    time: '10:30 - 12:10',
    room: 'Lab Komputer 2 Lt.3',
    day: 'Senin',
    themeColor: 'sky'
  },
  {
    id: 'c3',
    code: 'INF-333',
    name: 'Pemrograman Perangkat Bergerak',
    classGroup: 'Kelas B',
    sks: 3,
    lecturer: 'Puspaningtyas Sanjoyo Adi, S.T., M.T.',
    time: '08:45 - 10:25',
    room: 'Lab Pemrograman Lt.2',
    day: 'Selasa',
    themeColor: 'purple'
  },
  {
    id: 'c4',
    code: 'INF-334',
    name: 'Pengukuran & Analisis Kinerja Jaringan',
    classGroup: 'Kelas A',
    sks: 3,
    lecturer: 'Prof. Ir. Bambang Soelistijanto, Ph.D.',
    time: '07:00 - 08:40',
    room: 'R.312 St. Robertus',
    day: 'Rabu',
    themeColor: 'emerald'
  },
  {
    id: 'c5',
    code: 'INF-335',
    name: 'Metodologi Penelitian',
    classGroup: 'Kelas A',
    sks: 2,
    lecturer: 'Prof. Ir. Bambang Soelistijanto, Ph.D.',
    time: '08:45 - 10:25',
    room: 'R.205 Thomas Aquinas',
    day: 'Kamis',
    themeColor: 'amber'
  }
];

export const mockKhsGrades: KhsGrade[] = [
  {
    code: 'INF-331',
    name: 'Analisis Proses Bisnis (C)',
    classGroup: 'C',
    lecturer: 'Agnes Maria Polina, S.Kom., M.Sc.',
    sks: 3,
    grade: 'A',
    weight: 12.0
  },
  {
    code: 'INF-332',
    name: 'Desain UI/UX (A)',
    classGroup: 'A',
    lecturer: 'Dr. Ir. Iwan Binanto',
    sks: 3,
    grade: 'A',
    weight: 12.0
  },
  {
    code: 'INF-333',
    name: 'Pemrograman Bergerak (B)',
    classGroup: 'B',
    lecturer: 'Puspaningtyas Sanjoyo Adi, S.T., M.T.',
    sks: 3,
    grade: 'A-',
    weight: 11.25
  },
  {
    code: 'INF-334',
    name: 'Analisis Kinerja Jaringan (A)',
    classGroup: 'A',
    lecturer: 'Prof. Ir. Bambang Soelistijanto, Ph.D.',
    sks: 3,
    grade: 'A',
    weight: 12.0
  },
  {
    code: 'INF-335',
    name: 'Metodologi Penelitian (A)',
    classGroup: 'A',
    lecturer: 'Prof. Ir. Bambang Soelistijanto, Ph.D.',
    sks: 2,
    grade: 'A-',
    weight: 7.5
  }
];

export const mockTuitionItems: TuitionItem[] = [
  {
    id: 't-1',
    name: 'SPP Tetap Semester Genap 2025/2026',
    amount: 3850000,
    status: 'LUNAS',
    dueDate: '15 Januari 2026',
    paidDate: '12 Januari 2026 • 10:14 WIB',
    receiptNumber: 'BKR-USD-2026-01-44910'
  },
  {
    id: 't-2',
    name: 'SPP Variabel (14 SKS @ Rp 185.000)',
    amount: 2590000,
    status: 'LUNAS',
    dueDate: '05 Maret 2026',
    paidDate: '28 Februari 2026 • 14:32 WIB',
    receiptNumber: 'BKR-USD-2026-02-88231'
  },
  {
    id: 't-3',
    name: 'Iuran Dana Kemahasiswaan & Asuransi Kesehatan',
    amount: 250000,
    status: 'LUNAS',
    dueDate: '15 Januari 2026',
    paidDate: '12 Januari 2026 • 10:14 WIB',
    receiptNumber: 'BKR-USD-2026-01-44911'
  }
];

export const mockVirtualAccounts: VirtualAccountInfo[] = [
  { bankName: 'Bank BNI (VA)', vaNumber: '9880 2353 1400 3001', holderName: 'SIA USD - Gerardo Ardianta' },
  { bankName: 'Bank Mandiri (VA)', vaNumber: '8910 2353 1400 3002', holderName: 'SIA USD - Gerardo Ardianta' },
  { bankName: 'Bank BCA (VA)', vaNumber: '1099 2353 1400 3003', holderName: 'SIA USD - Gerardo Ardianta' }
];

export const mockAnnouncements: AnnouncementItem[] = [
  {
    id: 'a1',
    title: 'Jadwal Ujian Tengah Semester (UTS) Genap 2025/2026',
    badge: 'PENTING • BAA USD',
    date: '04 Maret 2026',
    summary: 'Mulai 18 Maret 2026. Mahasiswa diwajibkan melunasi SPP variabel untuk cetak kartu ujian resmi di portal SIA.',
    isPinned: true,
    readTime: '3 mnt baca',
    sender: 'Biro Administrasi Akademik'
  },
  {
    id: 'a2',
    title: 'Pendaftaran Magang Studi Independen Bersertifikat (MSIB) Batch VII',
    badge: 'KEMAHASISWAAN',
    date: '02 Maret 2026',
    summary: 'Sosialisasi alur konversi 20 SKS untuk mahasiswa semester 6 Prodi Informatika. Batas submit proposal hingga 15 Maret 2026.',
    readTime: '4 mnt baca',
    sender: 'Wakil Dekan III FST'
  },
  {
    id: 'a3',
    title: 'Rekrutmen Asisten Dosen & Asisten Laboratorium Komputer Genap 2025/2026',
    badge: 'PRODI INFORMATIKA',
    date: '27 Februari 2026',
    summary: 'Dibuka lowongan asisten untuk mata kuliah Pemrograman Berorientasi Objek dan Jaringan Komputer. IPK minimal 3.25.',
    readTime: '2 mnt baca',
    sender: 'Laboratorium FST'
  },
  {
    id: 'a4',
    title: 'Sosialisasi Program Beasiswa Prestasi & Alumni Sanata Dharma',
    badge: 'BEASISWA',
    date: '20 Februari 2026',
    summary: 'Bantuan biaya studi semester akhir bagi mahasiswa berprestasi akademik dan keaktifan organisasi.',
    readTime: '5 mnt baca',
    sender: 'Biro Kerjasama & Alumni'
  }
];

export const mockMilestones: AcademicMilestone[] = [
  {
    date: '18 - 28 Maret 2026',
    title: 'Ujian Tengah Semester (UTS)',
    description: 'Pelaksanaan evaluasi tengah semester luring di Kampus III Paingan.',
    status: 'active'
  },
  {
    date: '06 - 10 April 2026',
    title: 'Batas Akhir Penginputan Nilai UTS',
    description: 'Dosen pengampu mengunggah nilai hasil ujian ke portal dosen SIA USD.',
    status: 'upcoming'
  },
  {
    date: '04 - 15 Mei 2026',
    title: 'Konsultasi Pra-KRS & Bimbingan Proposal Skripsi',
    description: 'Sesi temu Dosen Pembimbing Akademik untuk mahasiswa angkatan 2023.',
    status: 'upcoming'
  },
  {
    date: '15 - 26 Juni 2026',
    title: 'Ujian Akhir Semester (UAS)',
    description: 'Pekan evaluasi akhir semester genap tahun akademik 2025/2026.',
    status: 'upcoming'
  }
];
