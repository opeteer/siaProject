import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Download, 
  Edit, 
  AlertCircle 
} from 'lucide-react';
import { mockStudent, mockCourses } from '../data/mockData';
import { Modal } from '../components/ui/Modal';

export const KrsPage: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);

  const totalSks = mockCourses.reduce((acc, c) => acc + c.sks, 0);
  const maxSks = mockStudent.maxSksAllowed;
  const progressPercent = Math.round((totalSks / maxSks) * 100);

  const handlePrintKrs = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2200);
  };

  return (
    <div className="space-y-6">
      {/* SKS QUOTA HERO BANNER */}
      <div className="bg-[#0E2A47] rounded-3xl p-7 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#163B63] rounded-full blur-2xl opacity-60 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="text-[11px] font-black tracking-wider text-[#FDE68A] uppercase">
              BEBAN STUDI SEMESTER 6 GENAP
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl lg:text-4xl font-black text-white">{totalSks}</span>
              <span className="text-base text-slate-300 font-semibold">/ {maxSks} Maks SKS Diizinkan</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full sm:w-80">
              <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F5A623] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="text-[10px] text-slate-300 mt-1 font-semibold">
                Kapasitas Terpakai: {progressPercent}% (IPK Lalu &gt; 3.00)
              </div>
            </div>
          </div>

          {/* Right Meta Info & ACC Badge */}
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm flex items-center justify-between gap-6 shrink-0">
            <div>
              <div className="text-[11px] text-slate-300 font-semibold">Dosen Pembimbing PA:</div>
              <div className="text-xs font-black text-white mt-0.5">{mockStudent.advisor.name}</div>
              <div className="text-[10px] text-slate-400">NPP: {mockStudent.advisor.npp}</div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 size={16} />
              <span>ACC PA</span>
            </div>
          </div>
        </div>
      </div>

      {/* FULL KRS TABLE */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-black text-[#0E2A47]">
              Daftar Mata Kuliah Terdaftar (Genap 2025/2026)
            </h3>
            <p className="text-xs text-slate-400">
              Disahkan oleh Program Studi Teknik Informatika FST Universitas Sanata Dharma
            </p>
          </div>
          <div className="text-xs font-bold text-slate-500">
            Total Mata Kuliah: <span className="text-[#0E2A47] font-black">{mockCourses.length} Kelas</span>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100/80 text-slate-600 font-black uppercase text-[10px] tracking-wider rounded-xl">
                <th className="py-3 px-3.5 rounded-l-xl">NO</th>
                <th className="py-3 px-3.5">KODE</th>
                <th className="py-3 px-3.5">MATA KULIAH</th>
                <th className="py-3 px-3.5 text-center">KELAS</th>
                <th className="py-3 px-3.5 text-center">SKS</th>
                <th className="py-3 px-3.5">DOSEN PENGAMPU</th>
                <th className="py-3 px-3.5 rounded-r-xl">JADWAL &amp; RUANG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockCourses.map((c, idx) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-3.5 font-bold text-slate-400">{idx + 1}</td>
                  <td className="py-4 px-3.5 font-extrabold text-blue-700 font-mono">{c.code}</td>
                  <td className="py-4 px-3.5 font-black text-[#0E2A47]">{c.name}</td>
                  <td className="py-4 px-3.5 font-black text-[#D48810] text-center">
                    {c.classGroup.replace('Kelas ', '')}
                  </td>
                  <td className="py-4 px-3.5 font-black text-[#0E2A47] text-center">{c.sks}</td>
                  <td className="py-4 px-3.5 text-slate-600 font-semibold">{c.lecturer}</td>
                  <td className="py-4 px-3.5">
                    <div className="font-bold text-[#0F172A]">{c.day}, {c.time}</div>
                    <div className="text-[11px] text-slate-500">{c.room} (Paingan)</div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 font-black text-[#0E2A47] border-t border-slate-200">
                <td colSpan={4} className="py-3.5 px-3.5 text-right uppercase text-[11px] text-slate-500">
                  Total Beban SKS Semester Ini:
                </td>
                <td className="py-3.5 px-3.5 text-center text-sm font-black text-[#0E2A47]">
                  {totalSks} SKS
                </td>
                <td colSpan={2} className="py-3.5 px-3.5 text-right text-emerald-700 text-xs">
                  • Telah Divalidasi BAA
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => setIsRevisionModalOpen(true)}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Edit size={15} />
            <span>Ubah Mata Kuliah (Masa Revisi)</span>
          </button>

          <button
            onClick={handlePrintKrs}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0E2A47] hover:bg-[#163B63] text-white text-xs font-black transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle2 size={16} className="text-emerald-400" /> Lembar KRS Sah Berhasil Diunduh
              </>
            ) : (
              <>
                <Download size={16} /> Cetak Lembar KRS Sah (PDF)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Revision Notice Modal */}
      <Modal
        isOpen={isRevisionModalOpen}
        onClose={() => setIsRevisionModalOpen(false)}
        title="Periode Perubahan / Revisi KRS"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
            <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-black text-amber-800">Masa Revisi KRS Telah Ditutup</div>
              <p className="mt-1 leading-relaxed text-amber-700">
                Batas akhir perubahan Kartu Rencana Studi semester Genap 2025/2026 berakhir pada 21 Februari 2026. Perubahan jadwal saat ini hanya dapat dilakukan atas rekomendasi khusus Dosen Pembimbing Akademik dan persetujuan Dekanat FST.
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500">
            Silakan hubungi Dosen Pembimbing Akademik <span className="font-bold text-slate-700">{mockStudent.advisor.name}</span> jika terdapat kendala bentrok jadwal praktikum.
          </div>
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setIsRevisionModalOpen(false)}
              className="px-5 py-2.5 bg-[#0E2A47] text-white rounded-xl text-xs font-bold hover:bg-[#163B63]"
            >
              Mengerti
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
