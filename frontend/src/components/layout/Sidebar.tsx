import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  FileText, 
  CreditCard, 
  Bell, 
  UserCircle2, 
  Award,
  LogOut
} from 'lucide-react';
import { mockStudent } from '../../data/mockData';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { key: 'jadwal', label: 'Jadwal Kuliah', path: '/jadwal', icon: CalendarDays },
    { key: 'krs', label: 'Rencana Studi (KRS)', path: '/krs', icon: FileText },
    { key: 'tagihan', label: 'Keuangan & SPP', path: '/tagihan', icon: CreditCard },
    { key: 'pengumuman', label: 'Pengumuman BAA', path: '/pengumuman', icon: Bell },
    { key: 'biodata', label: 'Biodata Mahasiswa', path: '/biodata', icon: UserCircle2 },
    { key: 'ktm_khs', label: 'e-KTM & KHS', path: '/ktm-khs', icon: Award },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside className="w-[260px] bg-[#0E2A47] text-white h-screen flex flex-col justify-between shrink-0 fixed left-0 top-0 z-30 select-none shadow-xl">
      <div>
        {/* Brand Header */}
        <div className="p-5 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center p-1.5 shrink-0">
            <img src="/logo_usd.png" alt="USD Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="font-black text-sm tracking-wide text-white">SIA USD</div>
            <div className="text-[9px] font-bold text-[#F5A623] tracking-wider uppercase">
              UNIVERSITAS SANATA DHARMA
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3.5 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#F5A623] text-[#0E2A47] shadow-sm font-extrabold'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} className={isActive ? 'text-[#0E2A47]' : 'text-slate-400'} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Profile Pill & Logout */}
      <div className="border-t border-white/10 bg-black/20 p-4">
        <div className="flex items-center justify-between">
          <NavLink to="/biodata" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 rounded-full bg-[#F5A623] text-[#0E2A47] font-black text-xs flex items-center justify-center shrink-0 shadow-inner">
              {mockStudent.initials}
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate max-w-[125px]">
                {mockStudent.name}
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                NIM: {mockStudent.nim}
              </div>
            </div>
          </NavLink>
          <button
            onClick={handleLogout}
            title="Keluar / Logout"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/10 transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
