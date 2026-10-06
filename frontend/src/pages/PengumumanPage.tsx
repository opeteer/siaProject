import React, { useState } from 'react';
import { Calendar, Download, ChevronRight, CheckCircle2 } from 'lucide-react';
import { mockAnnouncements, mockMilestones } from '../data/mockData';
import { Modal } from '../components/ui/Modal';
import { AnnouncementItem } from '../types';

export const PengumumanPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementItem | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const categories = ['Semua', 'BAA USD', 'PRODI INFORMATIKA', 'KEMAHASISWAAN', 'BEASISWA'];

  const filteredAnnouncements = activeCategory === 'Semua'
    ? mockAnnouncements
    : mockAnnouncements.filter((a) => a.badge.includes(activeCategory));

  const handleDownloadCalendar = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* HIGHLIGHT PINNED BANNER */}
      <div className="bg-[#0E2A47] rounded-3xl p-7 text-white relative overflow-hidden shadow-md">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#163B63] rounded-full blur-2xl opacity-60 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#F5A623] text-[#0E2A47] font-black text-2xl flex items-center justify-center shrink-0 shadow-lg">
              <Calendar size={32} />
            </div>
            <div className="space-y-1.5 max-w-2xl">
              <div className="text-[11px] font-black tracking-wider text-[#FDE68A] uppercase">
                PENTING &bull; BAA USD
              </div>
              <h2 className="text-xl lg:text-2xl font-black text-white leading-tight">
                Jadwal Ujian Tengah Semester (UTS) Genap 2025/2026
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mulai 18 Maret 2026. Mahasiswa diwajibkan melunasi SPP variabel untuk cetak kartu ujian resmi di portal SIA.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedAnnouncement(mockAnnouncements[0])}
            className="px-6 py-3.5 bg-[#F5A623] hover:bg-[#D48810] text-[#0E2A47] font-black text-xs rounded-xl transition-all shadow-md shrink-0 cursor-pointer text-center"
          >
            Cek Kalender UTS
          </button>
        </div>
      </div>

      {/* 2 COLUMNS: LEFT Feed (65%) + RIGHT Calendar Deadlines (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Announcements Feed */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-black text-[#0E2A47]">Pengumuman Resmi Terkini</h3>
              <p className="text-xs text-slate-400 font-medium">Biro Administrasi Akademik &amp; Fakultas Sanata Dharma</p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#0E2A47] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List of Announcement Cards */}
          <div className="space-y-4">
            {filteredAnnouncements.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedAnnouncement(item)}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100/70 text-blue-700">
                    {item.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {item.date} &bull; {item.readTime}
                  </span>
                </div>

                <h4 className="text-base font-black text-[#0E2A47] group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span className="text-[11px] text-slate-400">Pengirim: {item.sender}</span>
                  <span className="text-blue-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Baca Rincian <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Academic Calendar & Deadlines */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 lg:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0E2A47]">Agenda Akademik 2025/2026</h3>
              <p className="text-xs text-slate-400">Jadwal penting semester berjalan</p>
            </div>

            <div className="space-y-3.5">
              {mockMilestones.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    m.status === 'active'
                      ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-amber-700 uppercase tracking-wide">
                      {m.date}
                    </span>
                    {m.status === 'active' && (
                      <span className="text-[10px] font-black bg-amber-500 text-white px-2 py-0.5 rounded-full">
                        SEDANG BERLANGSUNG
                      </span>
                    )}
                  </div>
                  <h4 className="font-extrabold text-xs text-[#0E2A47] mt-1.5">{m.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{m.description}</p>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-100 text-xs text-slate-600 font-medium">
              Syarat kehadiran perkuliahan minimal <span className="font-bold text-slate-800">75%</span> untuk mengikuti ujian akhir semester.
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handleDownloadCalendar}
              className="w-full py-3 bg-[#F5A623] hover:bg-[#D48810] text-[#0E2A47] font-black text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 size={16} /> Berhasil Mengunduh Kalender
                </>
              ) : (
                <>
                  <Download size={16} /> Unduh Kalender Akademik Resmi (PDF)
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedAnnouncement(null)}
          title={selectedAnnouncement.title}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                {selectedAnnouncement.badge}
              </span>
              <span>&bull;</span>
              <span>{selectedAnnouncement.date}</span>
              <span>&bull;</span>
              <span>Oleh: {selectedAnnouncement.sender}</span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {selectedAnnouncement.summary}
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="font-bold text-[#0E2A47]">Petunjuk Bagi Mahasiswa:</div>
              <ul className="list-disc list-inside space-y-1 pl-1">
                <li>Pastikan KRS telah disetujui Dosen Pembimbing Akademik (ACC PA).</li>
                <li>Status keuangan telah lunas pada sistem keuangan BAA USD.</li>
                <li>Kartu ujian dapat dicetak langsung melalui menu Rencana Studi (KRS).</li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-5 py-2 bg-[#0E2A47] text-white rounded-xl text-xs font-bold hover:bg-[#163B63]"
              >
                Tutup
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
