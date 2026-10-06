export interface StudentProfile {
  nim: string;
  name: string;
  initials: string;
  major: string;
  faculty: string;
  campus: string;
  status: string;
  angkatan: string;
  currentSemester: string;
  ipk: number;
  ips: number;
  totalSksPassed: number;
  currentSemesterSks: number;
  maxSksAllowed: number;
  krsApproved: boolean;
  advisor: {
    name: string;
    npp: string;
    title: string;
    email: string;
    notes: string;
    evaluation: string;
  };
  biodata: {
    nik: string;
    birthPlaceDate: string;
    gender: string;
    religion: string;
    highSchool: string;
    highSchoolMajor: string;
    studentEmail: string;
    phone: string;
    domicileAddress: string;
  };
}

export interface CourseSchedule {
  id: string;
  code: string;
  name: string;
  classGroup: string;
  sks: number;
  lecturer: string;
  time: string;
  room: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  themeColor: 'blue' | 'sky' | 'purple' | 'emerald' | 'amber';
}

export interface KhsGrade {
  code: string;
  name: string;
  classGroup: string;
  lecturer: string;
  sks: number;
  grade: string;
  weight: number;
}

export interface TuitionItem {
  id: string;
  name: string;
  amount: number;
  status: 'LUNAS' | 'BELUM LUNAS';
  dueDate: string;
  paidDate?: string;
  receiptNumber?: string;
}

export interface VirtualAccountInfo {
  bankName: string;
  vaNumber: string;
  holderName: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  badge: string;
  date: string;
  summary: string;
  isPinned?: boolean;
  readTime: string;
  sender: string;
}

export interface AcademicMilestone {
  date: string;
  title: string;
  description: string;
  status: 'upcoming' | 'active' | 'passed';
}
