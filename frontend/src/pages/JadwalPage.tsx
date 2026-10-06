import React, { useState } from 'react';
import { Calendar, Download, Clock, MapPin, User, CheckCircle2 } from 'lucide-react';
import { mockCourses } from '../data/mockData';
import { CourseSchedule } from '../types';

export const JadwalPage: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [syncedCalendar, setSyncedCalendar] = useState(false);

  const days: ('Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat')[] = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat'
  ];

  const getCoursesForDay = (day: string): CourseSchedule[] => {
    return mockCourses.filter((c) => c.day === day);
  };

  const getDayMeta = (day: string) => {
    const list = getCoursesForDay(day);
    if (day === 'Jumat') return 'Praktikum Mandiri';
    const totalSks = list.reduce((acc, c) => acc + c.sks, 0);
    return `${list.length} Mata Kuliah • ${totalSks} SKS`;
  };

  const getColorStyles = (color: CourseSchedule['themeColor']) => {
    switch (color) {
      case 'blue':
        return {
          border: 'border-l-blue-600',
          bg: 'bg-blue-50/50',
          tag: 'bg-blue-100 text-blue-700',
          accent: 'text-blue-700'
        };
      case 'sky':
        return {
          border: 'border-l-sky-600',
          bg: 'bg-sky-50/50',
          tag: 'bg-sky-100 text-sky-700',
          accent: 'text-sky-700'
        };
      case 'purple':
        return {
          border: 'border-l-purple-600',
          bg: 'bg-purple-50/50',
          tag: 'bg-purple-100 text-purple-700',
          accent: 'text-purple-700'
        };
      case 'emerald':
        return {
          border: 'border-l-emerald-600',
          bg: 'bg-emerald-50/50',
          tag: 'bg-emerald-100 text-emerald-700',
          accent: 'text-emerald-700'
        };
      case 'amber':
        return {
          border: 'border-l-amber-500',
          bg: 'bg-amber-50/50',
          tag: 'bg-amber-100 text-amber-800',
          accent: 'text-amber-800'
        };
      default:
        return {
          border: 'border-l-slate-400',
          bg: 'bg-slate-50',
          tag: 'bg-slate-200 text-slate-700',
          accent: 'text-slate-700'
        };
    }
  };

  const handlePrintPdf = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleGoogleCalendar = () => {
    setSyncedCalendar(true);
    setTimeout(() => setSyncedCalendar(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs font-semibold text-slate-500">
          Total 5 Mata Kuliah &bull; 14 SKS Terdaftar &bull; Kampus III Paingan, Sanata Dharma
        </p>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleGoogleCalendar}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            {syncedCalendar ? <CheckCircle2 size={15} className="text-emerald-600" /> : <Calendar size={15} />}
            <span>{syncedCalendar ? 'Tersinkron' : 'Google Calendar'}</span>
          </button>
          <button
            onClick={handlePrintPdf}
            className="px-4 py-2 bg-[#0E2A47] hover:bg-[#163B63] text-white rounded-xl text-xs font-extrabold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            {downloadSuccess ? <CheckCircle2 size={15} className="text-emerald-400" /> : <Download size={15} />}
            <span>{downloadSuccess ? 'Mengunduh PDF...' : 'Cetak Jadwal PDF'}</span>
          </button>
        </div>
      </div>

      {/* 5-Day Matrix Table Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {days.map((day) => {
          const courses = getCoursesForDay(day);
          const isSenin = day === 'Senin';

          return (
            <div
              key={day}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col min-h-[580px]"
            >
              {/* Day Column Header */}
              <div
                className={`py-3.5 px-4 text-center border-b ${
                  isSenin
                    ? 'bg-[#0E2A47] text-white border-[#0E2A47]'
                    : 'bg-slate-50 text-[#0E2A47] border-slate-200'
                }`}
              >
                <div
                  className={`text-sm font-black tracking-wide ${
                    isSenin ? 'text-[#F5A623]' : 'text-[#0E2A47]'
                  }`}
                >
                  {day.toUpperCase()}
                </div>
                <div
                  className={`text-[10px] mt-0.5 ${
                    isSenin ? 'text-slate-300' : 'text-slate-400'
                  }`}
                >
                  {getDayMeta(day)}
                </div>
              </div>

              {/* Day Courses List */}
              <div className="p-3 space-y-3 flex-1 flex flex-col">
                {courses.length > 0 ? (
                  courses.map((c) => {
                    const st = getColorStyles(c.themeColor);
                    return (
                      <div
                        key={c.id}
                        className={`p-3.5 rounded-xl border border-slate-200 border-l-4 ${st.border} ${st.bg} space-y-2 hover:shadow-xs transition-shadow`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded ${st.tag}`}>
                            {c.code} &bull; {c.sks} SKS
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                          <Clock size={12} />
                          <span>{c.time}</span>
                        </div>

                        <div>
                          <div className="text-xs font-black text-[#0F172A] leading-snug">
                            {c.name}
                          </div>
                          <div className="text-[11px] font-bold text-[#F5A623]">
                            ({c.classGroup})
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-600 flex items-center gap-1.5">
                          <User size={12} className="text-slate-400 shrink-0" />
                          <span className="truncate">{c.lecturer}</span>
                        </div>

                        <div className={`text-[11px] font-bold flex items-center gap-1.5 ${st.accent}`}>
                          <MapPin size={12} className="shrink-0" />
                          <span>{c.room}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  /* Empty state for Jumat */
                  <div className="flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-slate-200 text-center text-slate-400 my-auto min-h-[200px]">
                    <div className="font-bold text-xs text-slate-500">Jadwal Kosong</div>
                    <div className="text-[11px] text-slate-400 mt-1">Sesi Mandiri / Proyek</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Lab Informatika Paingan</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
