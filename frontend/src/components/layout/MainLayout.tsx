import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const MainLayout: React.FC = () => {
  const location = useLocation();

  const getPageMeta = () => {
    switch (location.pathname) {
      case '/dashboard':
      case '/':
        return { breadcrumb: 'BERANDA UTAMA', title: 'Dashboard Mahasiswa' };
      case '/jadwal':
        return { breadcrumb: 'JADWAL KULIAH', title: 'Jadwal Kuliah Mingguan' };
      case '/krs':
        return { breadcrumb: 'RENCANA STUDI', title: 'Kartu Rencana Studi (KRS)' };
      case '/tagihan':
        return { breadcrumb: 'KEUANGAN', title: 'Keuangan & SPP Mahasiswa' };
      case '/pengumuman':
        return { breadcrumb: 'PENGUMUMAN', title: 'Pengumuman & Agenda Akademik' };
      case '/biodata':
        return { breadcrumb: 'BIODATA MAHASISWA', title: 'Biodata & Profil Mahasiswa' };
      case '/ktm-khs':
        return { breadcrumb: 'e-KTM & KHS', title: 'e-KTM & Hasil Studi (KHS)' };
      default:
        return { breadcrumb: 'PORTAL', title: 'Portal Akademik USD' };
    }
  };

  const { breadcrumb, title } = getPageMeta();

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-[260px] flex flex-col min-w-0">
        {/* Fixed Top Bar */}
        <TopBar />

        {/* Page View Container */}
        <main className="mt-20 px-9 py-7 flex-1 flex flex-col max-w-[1440px]">
          {/* Breadcrumb & Title */}
          <div className="mb-6">
            <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase">
              SIA USD &nbsp;/&nbsp; {breadcrumb}
            </div>
            <h1 className="text-2xl font-black text-[#0E2A47] mt-0.5 tracking-tight">
              {title}
            </h1>
          </div>

          {/* Active Screen Outlet */}
          <div className="flex-1">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
