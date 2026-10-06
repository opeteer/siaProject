import { 
  mockStudent, 
  mockCourses, 
  mockKhsGrades, 
  mockTuitionItems, 
  mockVirtualAccounts, 
  mockAnnouncements, 
  mockMilestones 
} from '../data/mockData';
import { StudentProfile, CourseSchedule, KhsGrade, TuitionItem, VirtualAccountInfo, AnnouncementItem, AcademicMilestone } from '../types';

const API_BASE = '/api';

async function fetchJson<T>(url: string, fallback: T | null): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${url}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    // Graceful fallback to mock data when backend is not running
    console.debug(`[API] Fallback used for ${url}:`, err);
    return fallback;
  }
}

export const api = {
  // Auth
  async login(nim: string, password?: string) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nim, password, rememberMe: true })
      });
      if (!res.ok) throw new Error('Login failed');
      return await res.json();
    } catch {
      return { token: 'mock-sso-token', nim, name: mockStudent.name, status: 'Aktif' };
    }
  },

  // Student Profile & Biodata
  async getStudentProfile(nim = '235314003'): Promise<StudentProfile> {
    const data = await fetchJson<any>(`/student/profile?nim=${nim}`, null);
    if (!data) return mockStudent;

    return {
      nim: data.nim,
      name: data.name,
      initials: data.initials || 'GA',
      major: data.major,
      faculty: data.faculty,
      campus: data.campus,
      status: data.status,
      angkatan: data.angkatan,
      currentSemester: data.currentSemester,
      ipk: Number(data.ipk),
      ips: Number(data.ips),
      totalSksPassed: data.totalSksPassed,
      currentSemesterSks: data.currentSemesterSks,
      maxSksAllowed: data.maxSksAllowed,
      krsApproved: Boolean(data.krsApproved),
      advisor: data.advisor || mockStudent.advisor,
      biodata: data.biodata || mockStudent.biodata
    };
  },

  async updateBiodata(phone: string, domicileAddress: string, nim = '235314003') {
    try {
      const res = await fetch(`${API_BASE}/student/biodata?nim=${nim}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, domicileAddress })
      });
      if (!res.ok) throw new Error('Update failed');
      return await res.json();
    } catch {
      return { ...mockStudent.biodata, phone, domicileAddress };
    }
  },

  // Weekly Schedule
  async getWeeklySchedule(): Promise<CourseSchedule[]> {
    const list = await fetchJson<any[]>('/academic/jadwal', null);
    if (!list || list.length === 0) return mockCourses;

    return list.map((c) => ({
      id: String(c.id),
      code: c.code,
      name: c.name,
      classGroup: c.classGroup,
      sks: c.sks,
      lecturer: c.lecturer,
      time: c.time,
      room: c.room,
      day: c.day as any,
      themeColor: c.themeColor || 'blue'
    }));
  },

  // Study Plan (KRS)
  async getKrs(nim = '235314003') {
    const data = await fetchJson<any>(`/academic/krs?nim=${nim}`, null);
    if (!data) {
      return {
        totalSks: mockStudent.currentSemesterSks,
        maxSksAllowed: mockStudent.maxSksAllowed,
        krsApproved: mockStudent.krsApproved,
        advisorName: mockStudent.advisor.name,
        courses: mockCourses
      };
    }
    return data;
  },

  // Grade Report (KHS)
  async getKhs(nim = '235314003'): Promise<{ ips: number; ipk: number; totalSksPassed: number; grades: KhsGrade[] }> {
    const data = await fetchJson<any>(`/academic/khs?nim=${nim}`, null);
    if (!data || !data.grades) {
      return {
        ips: mockStudent.ips,
        ipk: mockStudent.ipk,
        totalSksPassed: mockStudent.totalSksPassed,
        grades: mockKhsGrades
      };
    }
    return {
      ips: Number(data.ips),
      ipk: Number(data.ipk),
      totalSksPassed: data.totalSksPassed,
      grades: data.grades.map((g: any) => ({
        code: g.code,
        name: g.name,
        classGroup: g.classGroup,
        lecturer: g.lecturer,
        sks: g.sks,
        grade: g.gradeLetter,
        weight: Number(g.gradePoint)
      }))
    };
  },

  // Tuition & Finances
  async getTuition(nim = '235314003'): Promise<{ totalBill: number; status: string; items: TuitionItem[] }> {
    const data = await fetchJson<any>(`/finance/tuition?nim=${nim}`, null);
    if (!data || !data.items) {
      const total = mockTuitionItems.reduce((acc, i) => acc + i.amount, 0);
      return { totalBill: total, status: 'LUNAS', items: mockTuitionItems };
    }
    return {
      totalBill: Number(data.totalBill),
      status: data.status,
      items: data.items.map((i: any) => ({
        id: String(i.id),
        name: i.name,
        amount: Number(i.amount),
        status: i.status as any,
        dueDate: i.dueDate,
        paidDate: i.paidDate,
        receiptNumber: i.receiptNumber
      }))
    };
  },

  async getVirtualAccounts(nim = '235314003'): Promise<VirtualAccountInfo[]> {
    const list = await fetchJson<any[]>(`/finance/virtual-accounts?nim=${nim}`, null);
    if (!list || list.length === 0) return mockVirtualAccounts;
    return list.map((v) => ({
      bankName: v.bankName,
      vaNumber: v.vaNumber,
      holderName: v.holderName
    }));
  },

  // Announcements & Milestones
  async getAnnouncements(category = 'Semua'): Promise<AnnouncementItem[]> {
    const list = await fetchJson<any[]>(`/academic/announcements?category=${category}`, null);
    if (!list || list.length === 0) return mockAnnouncements;
    return list.map((a) => ({
      id: String(a.id),
      title: a.title,
      badge: a.badge,
      date: a.dateStr,
      summary: a.summary,
      isPinned: a.isPinned,
      readTime: a.readTime,
      sender: a.sender
    }));
  },

  async getMilestones(): Promise<AcademicMilestone[]> {
    const list = await fetchJson<any[]>('/academic/milestones', null);
    if (!list || list.length === 0) return mockMilestones;
    return list.map((m) => ({
      date: m.dateStr,
      title: m.title,
      description: m.description,
      status: m.status as any
    }));
  }
};
