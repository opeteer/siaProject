import React from 'react';
import { Modal } from '../ui/Modal';
import { QrCode, ShieldCheck } from 'lucide-react';
import { mockStudent } from '../../data/mockData';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="QR Code Presensi Kampus" maxWidth="sm">
      <div className="text-center py-2">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 inline-block mb-4 shadow-inner">
          {/* Simulated QR Code with high-fidelity look */}
          <div className="w-52 h-52 bg-white p-3 rounded-xl border border-slate-300 flex flex-col items-center justify-center relative shadow-sm">
            <QrCode size={170} className="text-[#0E2A47]" strokeWidth={1.5} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 p-1 flex items-center justify-center shadow-md">
                <img src="/logo_usd.png" alt="USD" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
          <div className="mt-3 font-mono font-bold text-xs text-slate-600 tracking-wider">
            NIM: {mockStudent.nim}
          </div>
        </div>

        <div className="space-y-1 text-left bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl mb-4">
          <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs">
            <ShieldCheck size={16} className="text-emerald-600" /> Token Presensi Terverifikasi BAA
          </div>
          <p className="text-[11px] text-emerald-700">
            Dapat dipindai di turnstile gerbang masuk Kampus II Mrican, Kampus III Paingan, dan loket sirkulasi Perpustakaan.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#0E2A47] text-white rounded-xl font-bold text-xs hover:bg-[#163B63] transition-colors"
        >
          Tutup QR Presensi
        </button>
      </div>
    </Modal>
  );
};
