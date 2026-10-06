import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  TrendingUp, 
  BookOpen, 
  CheckCircle, 
  CreditCard, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  FileText, 
  Award, 
  QrCode, 
  ChevronRight
} from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { mockStudent, mockCourses, mockAnnouncements, mockMilestones } from '../data/mockData';
import { QrModal } from '../components/common/QrModal';

export const DashboardPage: React.FC = () => {
  const [isQrOpen, setIsQrOpen] = useState(false);

  // Today is simulated as Senin
  const todayCourses = mockCourses.filter((c) => c.day === 'Senin');

  return (
    <div className="space-y-6">
      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="INDEKS PRESTASI KUMULATIF"
          value={mockStudent.ipk.toFixed(2)}
          subtitle="• Predikat: Cum Laude"
          subtitleColor="text-emerald-600"
          icon={<TrendingUp size={22} className="text-amber-600" />}
          iconBg="bg-amber-100/80"
        />

        <StatCard
          title="SKS TEMPUH / MAKS"
          value={
            <div className="flex items-baseline gap-1.5">
              <span>{mockStudent.totalSksPassed}</span>
              <span className="text-xs text-slate-400 font-bold">/ {mockStudent.currentSemesterSks} SKS Genap</span>
            </div>
          }
          subtitle={`• ${mockCourses.length} Mata Kuliah Terdaftar`}
          subtitleColor="text-blue-600"
          icon={<BookOpen size={22} className="text-blue-600" />}
          iconBg="bg-blue-100/80"
        />

        <StatCard
          title="STATUS VALIDASI KRS"
          value={<span className="text-emerald-600 text-xl font-black">DISETUJUI (ACC)</span>}
          subtitle="Dosen: Prof. Bambang Soelistijanto"
          subtitleColor="text-slate-600"
          icon={<CheckCircle size={22} className="text-emerald-600" />}
          iconBg="bg-emerald-100/80"
        />

        <StatCard
          title="TAGIHAN SPP & KEUANGAN"
          value={<span className="text-emerald-600 text-xl font-black">Rp 0 (LUNAS)</span>}
          subtitle="• Status Bebas Keuangan"
          subtitleColor="text-emerald-600"
          icon={<CreditCard size={22} className="text-amber-600" />}
          iconBg="bg-amber-100/80"
        />
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column (2 Cols) */}
        <div className="xl:col-span-2 space-y-6">
          {/* Today's Schedule Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                  <Calendar size={18} />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-[#0E2A47]">Jadwal Kuliah Hari Ini</h2>
                  <p className="text-xs text-slate-400 font-medium">Senin &bull; Semester Genap 2025/2026</p>
                </div>
              </div>
              <NavLink
                to="/jadwal"
                className="text-xs font-bold text-[#0E2A47] hover:text-amber-600 flex items-center gap-1 transition-colors"
              >
                Lihat Jadwal Lengkap <ChevronRight size={14} />
              </NavLink>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {todayCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-blue-600"></div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold text-blue-700 px-2 py-0.5 rounded bg-blue-100/70">
                      {course.code} &bull; {course.sks} SKS
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Clock size={13} /> {course.time}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-[#0E2A47] line-clamp-1 group-hover:text-blue-700 transition-colors">
                    {course.name} ({course.classGroup})
                  </h3>

                  <div className="mt-2 text-xs text-slate-600 flex items-center gap-1.5">
                    <User size={13} className="text-slate-400 shrink-0" />
                    <span className="truncate">{course.lecturer}</span>
                  </div>

                  <div className="mt-1 text-xs text-blue-700 font-bold flex items-center gap-1.5">
                    <MapPin size={13} className="shrink-0" />
                    <span>{course.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Pinned Announcement Banner */}
          <div className="bg-[#0E2A47] rounded-2xl p-6 text-white relative overflow-hidden shadow-sm">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F5A623] text-[#0E2A47] text-[10px] font-black tracking-wide uppercase">
                  PENTING &bull; BAA USD
                </div>
                <h3 className="text-lg font-black leading-snug">
                  {mockAnnouncements[0].title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {mockAnnouncements[0].summary}
                </p>
              </div>
              <NavLink
                to="/pengumuman"
                className="shrink-0 px-4 py-2.5 bg-[#F5A623] hover:bg-[#D48810] text-[#0E2A47] font-extrabold text-xs rounded-xl transition-colors text-center"
              >
                Cek Kalender UTS
              </NavLink>
            </div>
          </div>

          {/* Quick Announcements Feed */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-[#0E2A47]">Pengumuman Akademik Terbaru</h3>
              <NavLink to="/pengumuman" className="text-xs font-bold text-amber-600 hover:text-amber-700">
                Semua Pengumuman &rarr;
              </NavLink>
            </div>
            <div className="divide-y divide-slate-100 mt-2">
              {mockAnnouncements.slice(1, 3).map((ann) => (
                <div key={ann.id} className="py-3 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {ann.badge}
                      </span>
                      <span className="text-[11px] text-slate-400">{ann.date}</span>
                    </div>
                    <NavLink
                      to="/pengumuman"
                      className="text-xs font-bold text-[#0E2A47] hover:text-blue-700 line-clamp-1 block"
                    >
                      {ann.title}
                    </NavLink>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 shrink-0 mt-2" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col) */}
        <div className="space-y-6">
          {/* Quick Action Shortcuts */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-extrabold text-[#0E2A47] mb-4">Akses Cepat Layanan</h3>
            <div className="grid grid-cols-1 gap-2.5">
              <NavLink
                to="/krs"
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between text-xs font-bold text-[#0E2A47] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                    <FileText size={16} />
                  </div>
                  <span>Cetak Lembar KRS Sah</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </NavLink>

              <NavLink
                to="/ktm-khs"
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between text-xs font-bold text-[#0E2A47] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                    <Award size={16} />
                  </div>
                  <span>Lihat Transkrip Nilai (KHS)</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </NavLink>

              <button
                onClick={() => setIsQrOpen(true)}
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between text-xs font-bold text-[#0E2A47] transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                    <QrCode size={16} />
                  </div>
                  <span>Buka QR Presensi Kampus</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* Dosen PA Card */}
          <div className="bg-[#0E2A47] rounded-2xl p-5 text-white space-y-3">
            <div className="text-[10px] font-black text-[#F5A623] uppercase tracking-wider">
              DOSEN PEMBIMBING AKADEMIK
            </div>
            <div>
              <div className="text-sm font-black text-white">{mockStudent.advisor.name}</div>
              <div className="text-xs text-slate-300">NPP: {mockStudent.advisor.npp} &bull; {mockStudent.advisor.title}</div>
              <div className="text-xs text-[#FDE68A] mt-1 font-semibold">{mockStudent.advisor.email}</div>
            </div>
            <div className="p-3 rounded-xl bg-white/10 text-xs text-slate-300 italic border border-white/10">
              "{mockStudent.advisor.notes}"
            </div>
          </div>

          {/* Agenda Milestones Preview */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-extrabold text-[#0E2A47] mb-3">Agenda &amp; Tenggat Akademik</h3>
            <div className="space-y-3">
              {mockMilestones.slice(0, 2).map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] font-bold text-amber-700">{m.date}</div>
                  <div className="text-xs font-black text-[#0E2A47] mt-0.5">{m.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{m.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* QR Presensi Modal */}
      <QrModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </div>
  );
};
