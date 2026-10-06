import React, { useState } from 'react';
import { 
  QrCode, 
  Wallet, 
  Download, 
  CheckCircle2, 
  User
} from 'lucide-react';
import { mockStudent, mockKhsGrades } from '../data/mockData';
import { QrModal } from '../components/common/QrModal';

export const KtmKhsPage: React.FC = () => {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [walletSaved, setWalletSaved] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSaveWallet = () => {
    setWalletSaved(true);
    setTimeout(() => setWalletSaved(false), 2500);
  };

  const handleDownloadTranscript = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Physical e-KTM & Digital Identity Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* DIGITAL PHYSICAL e-KTM CARD */}
          <div className="w-full bg-[#0E2A47] rounded-3xl p-6 text-white border-2 border-[#F5A623] shadow-xl relative overflow-hidden select-none">
            {/* Background glow circle */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-[#163B63] rounded-full blur-2xl opacity-60 pointer-events-none"></div>

            {/* Card Header Brand & Gold Chip */}
            <div className="flex items-center justify-between pb-4 border-b border-white/15 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
                  <img src="/logo_usd.png" alt="USD" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="text-xs font-black tracking-wide text-white">
                    UNIVERSITAS SANATA DHARMA
                  </div>
                  <div className="text-[9px] font-extrabold text-[#F5A623] tracking-wider uppercase">
                    KARTU TANDA MAHASISWA &bull; e-KTM
                  </div>
                </div>
              </div>

              {/* Gold Smartcard EMV Chip */}
              <div className="w-10 h-7 rounded-md bg-[#FBBF24] border border-[#D97706] p-1 flex items-center justify-center shadow-inner">
                <div className="w-full h-full border border-amber-600/40 rounded-xs flex flex-col justify-between py-0.5">
                  <div className="h-0.5 bg-amber-700/40 w-full"></div>
                  <div className="h-0.5 bg-amber-700/40 w-full"></div>
                </div>
              </div>
            </div>

            {/* Card Body: Left Data + Right Official Photo */}
            <div className="py-5 flex items-start justify-between gap-4 relative z-10">
              <div className="space-y-3 flex-1">
                <div>
                  <div className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">
                    NAMA MAHASISWA
                  </div>
                  <div className="text-base font-black text-white tracking-wide">
                    {mockStudent.name.toUpperCase()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">
                      NIM
                    </div>
                    <div className="text-sm font-black text-[#F5A623] font-mono">
                      {mockStudent.nim}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">
                      PROGRAM STUDI
                    </div>
                    <div className="text-xs font-bold text-white">
                      Informatika (S1)
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">
                    KAMPUS
                  </div>
                  <div className="text-xs text-slate-200 font-semibold">
                    {mockStudent.campus}
                  </div>
                </div>
              </div>

              {/* Official Photo Box */}
              <div className="w-24 h-32 rounded-xl bg-[#163B63] border-2 border-[#F5A623] flex flex-col items-center justify-center shrink-0 relative overflow-hidden shadow-inner">
                <div className="w-12 h-12 rounded-full bg-[#0E2A47] flex items-center justify-center text-white/80 mb-1">
                  <User size={26} />
                </div>
                <div className="w-18 h-8 bg-[#0E2A47] rounded-t-full"></div>
                <div className="absolute bottom-1 px-1.5 py-0.5 bg-black/60 rounded text-[7px] font-black text-[#FDE68A] uppercase">
                  USD RESMI
                </div>
              </div>
            </div>

            {/* Barcode & Active Status Strip */}
            <div className="pt-3 border-t border-white/15 flex items-center justify-between relative z-10">
              <div className="font-mono text-xs text-slate-300 tracking-[0.25em] font-bold">
                ||||| | |||| |||||| || | |||||
              </div>
              <span className="px-3 py-1 rounded-md bg-emerald-900/80 border border-emerald-500/50 text-emerald-300 text-[10px] font-black tracking-wider uppercase">
                AKTIF 2025/2026
              </span>
            </div>
          </div>

          {/* Quick Actions Under Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-[#0E2A47]">Validasi Identitas Digital</h3>

            {/* QR Presensi Button */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-black text-slate-800">
                  QR Code Presensi Perpustakaan
                </div>
                <div className="text-[10px] text-slate-400">
                  Pindai di gerbang masuk Kampus II &amp; III
                </div>
              </div>
              <button
                onClick={() => setIsQrOpen(true)}
                className="px-3.5 py-1.5 bg-[#0E2A47] hover:bg-[#163B63] text-white text-[11px] font-black rounded-lg transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
              >
                <QrCode size={13} />
                <span>Buka QR</span>
              </button>
            </div>

            {/* Wallet Integration */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-black text-slate-800">
                  Simpan ke Google / Apple Wallet
                </div>
                <div className="text-[10px] text-slate-400">
                  Akses offline tanpa koneksi internet
                </div>
              </div>
              <button
                onClick={handleSaveWallet}
                className="px-3.5 py-1.5 bg-[#F5A623] hover:bg-[#D48810] text-[#0E2A47] text-[11px] font-black rounded-lg transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
              >
                {walletSaved ? <CheckCircle2 size={13} /> : <Wallet size={13} />}
                <span>{walletSaved ? 'Tersimpan' : 'Simpan'}</span>
              </button>
            </div>

            {/* PA Consultation Notes */}
            <div className="p-4 rounded-2xl bg-[#0E2A47] text-white space-y-2">
              <div className="text-[10px] font-black uppercase tracking-wider text-[#F5A623]">
                CATATAN PEMBIMBING AKADEMIK
              </div>
              <div className="text-xs font-black text-white">{mockStudent.advisor.name}</div>
              <p className="text-[11px] text-slate-300 italic leading-relaxed">
                "{mockStudent.advisor.notes}"
              </p>
              <div className="pt-2 border-t border-white/10 text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 size={13} />
                <span>Status Evaluasi Studi: {mockStudent.advisor.evaluation}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Full KHS Report Table & Stat Chips (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 3 STAT CHIPS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase text-amber-700 block">
                IP SEMESTER (IPS)
              </span>
              <div className="text-2xl font-black text-[#0E2A47] mt-1">
                {mockStudent.ips.toFixed(2)}
              </div>
              <span className="text-[11px] font-bold text-emerald-600 block mt-1">
                Sangat Memuaskan
              </span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase text-blue-700 block">
                IPK KUMULATIF
              </span>
              <div className="text-2xl font-black text-[#0E2A47] mt-1">
                {mockStudent.ipk.toFixed(2)}
              </div>
              <span className="text-[11px] font-bold text-blue-600 block mt-1">
                Predikat: Cum Laude
              </span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-extrabold uppercase text-emerald-700 block">
                TOTAL SKS LULUS
              </span>
              <div className="text-2xl font-black text-[#0E2A47] mt-1">
                {mockStudent.totalSksPassed}
              </div>
              <span className="text-[11px] font-bold text-slate-400 block mt-1">
                Semester 1 - 6
              </span>
            </div>
          </div>

          {/* Grades Table */}
          <div className="bg-white rounded-3xl p-6 lg:p-7 border border-slate-200/80 shadow-xs space-y-6">
            <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-[#0E2A47]">
                  Kartu Hasil Studi (KHS) Semester Genap
                </h3>
                <p className="text-xs text-slate-400">
                  Tahun Akademik 2025/2026 &bull; S1 Informatika USD
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                Genap '25/'26
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-600 font-black uppercase text-[10px] tracking-wider rounded-xl">
                    <th className="py-2.5 px-3 rounded-l-lg">KODE</th>
                    <th className="py-2.5 px-3">MATA KULIAH</th>
                    <th className="py-2.5 px-3 text-center">SKS</th>
                    <th className="py-2.5 px-3 text-center">NILAI</th>
                    <th className="py-2.5 px-3 text-right rounded-r-lg">BOBOT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockKhsGrades.map((g) => (
                    <tr key={g.code} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-extrabold text-blue-700 font-mono">{g.code}</td>
                      <td className="py-3 px-3">
                        <div className="font-black text-[#0E2A47]">{g.name}</div>
                        <div className="text-[11px] text-slate-400">{g.lecturer}</div>
                      </td>
                      <td className="py-3 px-3 font-bold text-center text-[#0E2A47]">{g.sks}</td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md font-black text-xs ${
                            g.grade === 'A'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {g.grade}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-black text-right text-slate-900">{g.weight.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Footer */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-semibold">
                Total SKS Semester: <span className="font-black text-[#0E2A47]">14 SKS</span>
              </span>
              <span className="font-black text-emerald-700 text-sm">
                Indeks Prestasi Semester: {mockStudent.ips.toFixed(2)}
              </span>
            </div>

            {/* Download Action Button */}
            <div className="pt-2">
              <button
                onClick={handleDownloadTranscript}
                className="w-full py-3.5 bg-[#0E2A47] hover:bg-[#163B63] text-white font-black text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle2 size={16} className="text-emerald-400" /> Dokumen KHS Sah Berhasil Diunduh
                  </>
                ) : (
                  <>
                    <Download size={16} /> Cetak Transkrip &amp; KHS Sah Tanda Tangan Digital BAA (PDF)
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Presensi Modal */}
      <QrModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </div>
  );
};
