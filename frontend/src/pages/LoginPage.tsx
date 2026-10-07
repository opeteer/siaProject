import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { mockStudent } from '../data/mockData';
import { api } from '../services/api';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [nim, setNim] = useState('235314003');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.login(nim, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Kombinasi NIM atau Password salah.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC]">
      {/* Left Brand Panel */}
      <div className="md:w-1/2 bg-[#0E2A47] text-white p-8 md:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle background ambient circles */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#163B63] rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#163B63] rounded-full blur-3xl opacity-40 pointer-events-none"></div>

        <div className="relative z-10">
          {/* Logo & Institution */}
          <div className="flex items-center gap-3.5 mb-14">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 p-2 flex items-center justify-center">
              <img src="/logo_usd.png" alt="USD Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-xl font-black tracking-wide text-white">SIA USD BROWSER</div>
              <div className="text-xs font-bold text-[#F5A623] tracking-wider uppercase">
                UNIVERSITAS SANATA DHARMA YOGYAKARTA
              </div>
            </div>
          </div>

          {/* Value Tagline & Overview */}
          <div className="space-y-6 max-w-lg">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/30 text-[#FDE68A] text-xs font-black tracking-wider uppercase">
              CERDAS &amp; HUMANIS
            </div>

            <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight">
              Sistem Informasi Akademik <br />
              <span className="text-[#F5A623]">Portal Web Mahasiswa</span>
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed">
              Akses jadwal kuliah terpadu, kartu rencana studi (KRS), status pembayaran SPP, dan hasil studi resmi mahasiswa Universitas Sanata Dharma.
            </p>

            {/* Quick Profile Chip preview */}
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#F5A623] text-[#0E2A47] font-black text-sm flex items-center justify-center shrink-0">
                GA
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                  MAHASISWA TERDAFTAR
                </div>
                <div className="text-sm font-black text-white">
                  {mockStudent.name} • {mockStudent.nim}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-8 text-xs text-slate-400 font-medium">
          &copy; 2026 Universitas Sanata Dharma &bull; Biro Sistem Informasi (BSI USD)
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div className="md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-xl">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-[#0E2A47]">Masuk Akun Mahasiswa</h2>
            <p className="text-slate-500 text-xs font-semibold mt-1">
              Single Sign-On (SSO) USD Terintegrasi
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2.5 text-xs text-red-700 font-semibold">
              <AlertCircle size={18} className="text-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* NIM Field */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1.5">
                Nomor Induk Mahasiswa (NIM)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-[#0E2A47] focus:outline-none focus:border-[#0E2A47] focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                  Kata Sandi Akun
                </label>
                <a href="#lupa-sandi" className="text-[11px] font-bold text-[#D48810] hover:underline">
                  Lupa Sandi?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-[#0E2A47] focus:outline-none focus:border-[#0E2A47] focus:bg-white transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & SSL Badge */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#0E2A47] focus:ring-[#0E2A47]"
                />
                <span className="text-xs text-slate-600 font-semibold">Ingat Akun Saya</span>
              </label>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>SSL Terproteksi</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#0E2A47] hover:bg-[#163B63] text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{loading ? 'Memverifikasi...' : 'Masuk ke Portal SIA USD'}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Helpdesk Info Box */}
          <div className="mt-8 p-4 rounded-xl bg-slate-100/80 border border-slate-200/80 text-left">
            <div className="text-xs font-black text-[#0E2A47]">Butuh Bantuan Login?</div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Hubungi Sekretariat BAA / Pengelola SIA Kampus III Paingan
            </p>
            <div className="text-[11px] font-bold text-[#D48810] mt-1.5">
              Email: helpdesk@usd.ac.id &bull; Telp: (0274) 883037
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
