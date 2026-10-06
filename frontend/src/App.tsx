import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { PengumumanPage } from './pages/PengumumanPage';
import { JadwalPage } from './pages/JadwalPage';
import { TagihanPage } from './pages/TagihanPage';
import { BiodataPage } from './pages/BiodataPage';
import { KrsPage } from './pages/KrsPage';
import { KtmKhsPage } from './pages/KtmKhsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone Login Screen (01_login) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Authenticated Layout with Sidebar & TopBar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/pengumuman" element={<PengumumanPage />} />
          <Route path="/jadwal" element={<JadwalPage />} />
          <Route path="/tagihan" element={<TagihanPage />} />
          <Route path="/biodata" element={<BiodataPage />} />
          <Route path="/krs" element={<KrsPage />} />
          <Route path="/ktm-khs" element={<KtmKhsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
