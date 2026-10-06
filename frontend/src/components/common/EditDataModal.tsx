import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { mockStudent } from '../../data/mockData';
import { CheckCircle2, AlertCircle } from 'lucide-react';

import { api } from '../../services/api';

interface EditDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditDataModal: React.FC<EditDataModalProps> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState(mockStudent.biodata.phone);
  const [address, setAddress] = useState(mockStudent.biodata.domicileAddress);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.updateBiodata(phone, address);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ajukan Perubahan Kontak & Data Domisili" maxWidth="lg">
      {submitted ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>
          <h4 className="text-base font-black text-[#0E2A47]">Pengajuan Berhasil Dikirim</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Permohonan pembaruan data telah diteruskan ke Sekretariat BAA Kampus III Paingan untuk proses validasi.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-start gap-2.5 text-amber-800 text-xs">
            <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <span>
              Perubahan NIK, Nama, dan Tanggal Lahir memerlukan dokumen fisik Akta / KTP ke loket BAA USD.
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold uppercase text-slate-500 mb-1">
              Nomor Telepon / WhatsApp
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0E2A47] focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-extrabold uppercase text-slate-500 mb-1">
              Alamat Domisili Saat Kuliah
            </label>
            <textarea
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0E2A47] focus:bg-white"
              required
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
            <Button variant="secondary" size="md" type="button" onClick={onClose}>
              Batal
            </Button>
            <Button variant="primary" size="md" type="submit">
              Simpan & Ajukan
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
