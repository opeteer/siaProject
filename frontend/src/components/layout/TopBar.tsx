import React, { useState } from 'react';
import { Search, Bell, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { mockStudent, mockAnnouncements } from '../../data/mockData';

interface TopBarProps {
  onSearch?: (query: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 fixed top-0 right-0 left-[260px] z-20 px-8 flex items-center justify-between shadow-xs">
      {/* Search Input */}
      <div className="relative w-96">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search size={17} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Cari informasi akademik, jadwal, pengumuman..."
          className="w-full pl-10 pr-4 py-2 bg-slate-100/80 border border-transparent rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-300 focus:bg-white transition-all font-medium"
        />
      </div>

      {/* Right Header Actions */}
      <div className="flex items-center gap-4">
        {/* Semester Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-[#0E2A47]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{mockStudent.currentSemester}</span>
        </div>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            title="Pusat Notifikasi"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-2">
                <span className="font-extrabold text-xs text-[#0E2A47]">Notifikasi Akademik</span>
                <span className="text-[10px] text-amber-600 font-bold flex items-center gap-1">
                  <Sparkles size={12} /> BAA USD
                </span>
              </div>
              <div className="mt-2 space-y-2 max-h-64 overflow-y-auto pr-1">
                {mockAnnouncements.slice(0, 3).map((item) => (
                  <NavLink
                    key={item.id}
                    to="/pengumuman"
                    onClick={() => setShowNotifications(false)}
                    className="block p-2 rounded-xl hover:bg-slate-50 text-left transition-colors"
                  >
                    <div className="text-[11px] font-bold text-[#0E2A47] leading-snug line-clamp-1">{item.title}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.date} • {item.badge}</div>
                  </NavLink>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-100 mt-2 text-center">
                <NavLink
                  to="/pengumuman"
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] font-bold text-amber-600 hover:text-amber-700"
                >
                  Lihat Semua Pengumuman &rarr;
                </NavLink>
              </div>
            </div>
          )}
        </div>

        {/* Profile Chip */}
        <NavLink
          to="/biodata"
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#0E2A47] text-[#F5A623] font-black text-[10px] flex items-center justify-center shrink-0">
            {mockStudent.initials}
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold text-slate-900 leading-tight">Gerardo A.</div>
            <div className="text-[10px] font-semibold text-slate-400">Informatika '23</div>
          </div>
        </NavLink>
      </div>
    </header>
  );
};
