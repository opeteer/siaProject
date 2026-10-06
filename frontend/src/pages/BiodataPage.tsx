import React, { useState } from 'react';
import { 
  User, 
  Download, 
  Edit3, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { mockStudent } from '../data/mockData';
import { EditDataModal } from '../components/common/EditDataModal';

export const BiodataPage: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadDossier = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2200);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Student Photo Frame & Advisor (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Student Photo Frame */}
            <div className="flex flex-col items-center">
              <div className="w-44 h-56 rounded-2xl bg-[#0E2A47] border-2 border-[#F5A623] relative flex flex-col items-center justify-center shadow-md overflow-hidden group">
                <div className="w-20 h-20 rounded-full bg-[#163B63] flex items-center justify-center text-white/80 mb-2">
                  <User size={46} />
                </div>
                <div className="w-32 h-14 bg-[#163B63] rounded-t-full"></div>
                <div className="absolute bottom-2 px-3 py-1 bg-black/60 backdrop-blur-xs rounded-md text-[9px] font-black tracking-wider text-[#FDE68A] uppercase">
                  FOTO RESMI USD
                </div>
              </div>

              {/* Student Name & Meta */}
              <div className="text-center mt-4">
                <h2 className="text-xl font-black text-[#0E2A47]">{mockStudent.name}</h2>
                <div className="text-xs font-black text-[#D48810] mt-0.5">
                  NIM: {mockStudent.nim}
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-1">
                  {mockStudent.major} &bull; FST
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {mockStudent.campus}
                </div>
              </div>
            </div>

            {/* Badges Box */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-left">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                  STATUS MAHASISWA
                </span>
                <span className="text-xs font-black text-emerald-700 block mt-0.5">
                  • {mockStudent.status}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                  ANGKATAN
                </span>
                <span className="text-xs font-black text-[#0E2A47] block mt-0.5">
                  {mockStudent.angkatan}
                </span>
              </div>
            </div>

            {/* Dosen PA Info Box */}
            <div className="p-4 rounded-2xl bg-[#0E2A47] text-white space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#F5A623]">
                DOSEN PEMBIMBING AKADEMIK
              </span>
              <div className="text-xs font-black text-white">{mockStudent.advisor.name}</div>
              <div className="text-[11px] text-slate-300">
                NPP: {mockStudent.advisor.npp} &bull; {mockStudent.advisor.title}
              </div>
              <div className="text-[11px] text-[#FDE68A] font-semibold">{mockStudent.advisor.email}</div>
            </div>
          </div>

          {/* Button Edit Contact */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="w-full py-3 bg-[#0E2A47] hover:bg-[#163B63] text-white font-black text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Edit3 size={15} />
            <span>Ajukan Perubahan Kontak / Data</span>
          </button>
        </div>

        {/* Right Column: Detailed Dossier Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-[#0E2A47]">
                  Informasi Pokok &amp; Data Kependudukan
                </h3>
                <p className="text-xs text-slate-400">
                  Terverifikasi PDDikti Kementerian Pendidikan Tinggi, Sains, dan Teknologi
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>PDDikti Valid</span>
              </div>
            </div>

            {/* Detail Rows */}
            <div className="space-y-5">
              {/* Row 1: NIK & TTL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-extrabold uppercase text-slate-400 block">
                    NOMOR INDUK KEPENDUDUKAN (NIK)
                  </span>
                  <span className="text-sm font-black text-slate-900 mt-1 block font-mono">
                    {mockStudent.biodata.nik}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase text-slate-400 block">
                    TEMPAT, TANGGAL LAHIR
                  </span>
                  <span className="text-sm font-black text-slate-900 mt-1 block">
                    {mockStudent.biodata.birthPlaceDate}
                  </span>
                </div>
              </div>

              {/* Row 2: Jenis Kelamin & Agama */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-extrabold uppercase text-slate-400 block">
                    JENIS KELAMIN
                  </span>
                  <span className="text-sm font-black text-slate-900 mt-1 block">
                    {mockStudent.biodata.gender}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase text-slate-400 block">
                    AGAMA / KEPERCAYAAN
                  </span>
                  <span className="text-sm font-black text-slate-900 mt-1 block">
                    {mockStudent.biodata.religion}
                  </span>
                </div>
              </div>

              {/* Row 3: Asal Sekolah (Highlight Asal SMA) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100 bg-amber-50/50 p-4 rounded-2xl border border-amber-200/60">
                <div>
                  <span className="text-[11px] font-extrabold uppercase text-[#D48810] block">
                    ASAL SEKOLAH MENENGAH (SMA)
                  </span>
                  <span className="text-base font-black text-[#0E2A47] mt-1 block">
                    {mockStudent.biodata.highSchool}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase text-slate-400 block">
                    JURUSAN SEKOLAH ASAL
                  </span>
                  <span className="text-sm font-black text-slate-900 mt-1 block">
                    {mockStudent.biodata.highSchoolMajor}
                  </span>
                </div>
              </div>

              {/* Row 4: Email & Telepon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-extrabold uppercase text-slate-400 block">
                    EMAIL KAMPUS MAHASISWA
                  </span>
                  <span className="text-sm font-black text-[#0E2A47] mt-1 block font-mono">
                    {mockStudent.biodata.studentEmail}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase text-slate-400 block">
                    NOMOR TELEPON / WA
                  </span>
                  <span className="text-sm font-black text-slate-900 mt-1 block">
                    {mockStudent.biodata.phone}
                  </span>
                </div>
              </div>

              {/* Row 5: Alamat Domisili */}
              <div className="pb-4 border-b border-slate-100">
                <span className="text-[11px] font-extrabold uppercase text-slate-400 block">
                  ALAMAT DOMISILI SAAT KULIAH
                </span>
                <span className="text-sm font-black text-slate-900 mt-1 block leading-relaxed">
                  {mockStudent.biodata.domicileAddress}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button: Download Official Dossier */}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handleDownloadDossier}
              className="w-full py-3.5 bg-[#0E2A47] hover:bg-[#163B63] text-white font-black text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 size={16} className="text-emerald-400" /> Dokumen Resmi Berhasil Diunduh
                </>
              ) : (
                <>
                  <Download size={16} /> Unduh Formulir Biodata Resmi &amp; Surat Keterangan Aktif (PDF)
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditDataModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </div>
  );
};
