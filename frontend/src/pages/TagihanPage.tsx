import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Download, 
  Receipt, 
  Building2, 
  Info
} from 'lucide-react';
import { mockTuitionItems, mockVirtualAccounts } from '../data/mockData';

export const TagihanPage: React.FC = () => {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSummarySuccess, setDownloadSummarySuccess] = useState(false);

  const totalBill = mockTuitionItems.reduce((acc, item) => acc + item.amount, 0);

  const handleCopyVa = (vaNumber: string, bank: string) => {
    navigator.clipboard.writeText(vaNumber.replace(/\s+/g, ''));
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const handleDownloadReceipt = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => setDownloadingId(null), 1800);
  };

  const handleDownloadSummary = () => {
    setDownloadSummarySuccess(true);
    setTimeout(() => setDownloadSummarySuccess(false), 2200);
  };

  return (
    <div className="space-y-6">
      {/* FINANCIAL STATUS HERO BANNER */}
      <div className="bg-[#0E2A47] rounded-3xl p-7 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#163B63] rounded-full blur-2xl opacity-60 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase">
              <CheckCircle2 size={14} className="text-emerald-400" />
              STATUS BEBAS ADMINISTRASI KEUANGAN
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-white">
              Semua Tagihan Semester Telah Lunas
            </h2>
            <p className="text-xs text-slate-300">
              Mahasiswa memiliki hak penuh untuk mengikuti perkuliahan, UTS, dan mencetak dokumen sah akademik.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-right shrink-0">
            <div className="text-[10px] font-extrabold uppercase text-slate-300 tracking-wider">
              SISA TAGIHAN AKTIF
            </div>
            <div className="text-3xl font-black text-emerald-400 mt-0.5">
              Rp 0
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Total Terbayar: Rp {totalBill.toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>

      {/* 2 COLUMNS: LEFT Tuition Breakdown (65%) + RIGHT Virtual Accounts (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Detailed Tuition Breakdown */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-[#0E2A47]">
                Rincian Tagihan Semester Genap 2025/2026
              </h3>
              <p className="text-xs text-slate-400">Komponen SPP Tetap, SKS Variabel, dan Kemahasiswaan</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              LUNAS PENUH
            </span>
          </div>

          <div className="space-y-3.5">
            {mockTuitionItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="text-xs font-extrabold text-[#0E2A47]">{item.name}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span className="text-emerald-700 font-bold">• {item.status}</span>
                    <span>&bull;</span>
                    <span>Dibayar: {item.paidDate}</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    No. Kuitansi: {item.receiptNumber}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                  <span className="text-sm font-black text-[#0E2A47]">
                    Rp {item.amount.toLocaleString('id-ID')}
                  </span>
                  <button
                    onClick={() => handleDownloadReceipt(item.id)}
                    className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    {downloadingId === item.id ? (
                      <CheckCircle2 size={13} className="text-emerald-600" />
                    ) : (
                      <Receipt size={13} />
                    )}
                    <span>{downloadingId === item.id ? 'Mengunduh...' : 'Bukti Bayar'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal Summary Footer */}
          <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 flex items-center justify-between text-xs">
            <span className="font-extrabold text-slate-600 uppercase">
              Total Pembayaran Semester 6:
            </span>
            <span className="font-black text-[#0E2A47] text-base">
              Rp {totalBill.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Right: Payment Channels & VA Details */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 lg:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0E2A47]">Saluran Pembayaran Virtual Account</h3>
              <p className="text-xs text-slate-400">Nomor Virtual Account Mahasiswa Terdaftar</p>
            </div>

            <div className="space-y-3">
              {mockVirtualAccounts.map((va) => (
                <div key={va.bankName} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#0E2A47] flex items-center gap-1.5">
                      <Building2 size={15} className="text-slate-500" /> {va.bankName}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Otomatis Terverifikasi</span>
                  </div>

                  <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200">
                    <span className="font-mono font-bold text-xs text-[#0E2A47] tracking-wider">
                      {va.vaNumber}
                    </span>
                    <button
                      onClick={() => handleCopyVa(va.vaNumber, va.bankName)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#0E2A47] hover:bg-slate-100 transition-colors"
                      title="Salin Nomor VA"
                    >
                      {copiedBank === va.bankName ? (
                        <CheckCircle2 size={16} className="text-emerald-600" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Atas Nama: <span className="font-bold text-slate-700">{va.holderName}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Info size={14} className="text-blue-600 shrink-0" /> Panduan Pembayaran:
              </div>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                Pembayaran dapat dilakukan melalui Mobile Banking, Internet Banking, atau ATM dengan memilih menu Pembayaran Tagihan / Virtual Account.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handleDownloadSummary}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all border border-slate-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              {downloadSummarySuccess ? (
                <>
                  <CheckCircle2 size={16} className="text-emerald-600" /> Rekap Berhasil Diunduh
                </>
              ) : (
                <>
                  <Download size={16} /> Unduh Rekap Seluruh Bukti Bayar (PDF)
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
