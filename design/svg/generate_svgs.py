#!/usr/bin/env python3
"""
generate_svgs.py
Generates the 8 individual SVG desktop artboard screens (1440 x 900 px)
for SIA Sanata Dharma Web Browser mockup.

Student: Gerardo Ardianta (235314003)
Dosen Pembimbing PA: Prof. Ir. Bambang Soelistijanto, Ph.D.
Asal Sekolah: SMA Sedes Sapientiae
Tahun Ajaran: 2025/2026
"""

import base64
import os

svg_dir = "/home/opeteer/figmaExp/siaBrowser/svg"
os.makedirs(svg_dir, exist_ok=True)

logo_path = "/home/opeteer/figmaExp/assets/logo_usd.png"
if os.path.exists(logo_path):
    with open(logo_path, "rb") as f:
        logo_b64 = base64.b64encode(f.read()).decode("utf-8")
else:
    logo_b64 = ""

def get_sidebar_and_header(active_nav="dashboard", title="Dashboard Mahasiswa", breadcrumb="Dashboard"):
    nav_items = [
        ("dashboard", "Dashboard", 140, "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"),
        ("jadwal", "Jadwal Kuliah", 190, "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"),
        ("krs", "Rencana Studi (KRS)", 240, "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"),
        ("tagihan", "Keuangan &amp; SPP", 290, "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"),
        ("pengumuman", "Pengumuman BAA", 340, "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"),
        ("biodata", "Biodata Mahasiswa", 390, "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"),
        ("ktm_khs", "e-KTM &amp; KHS", 440, "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2")
    ]

    sidebar_svg = f'''
    <!-- SIDEBAR FIXED (width 260px, height 900px) -->
    <g id="Sidebar">
      <rect width="260" height="900" fill="#0E2A47"/>
      
      <!-- Brand Header -->
      <g transform="translate(24, 20)">
        <rect width="40" height="40" rx="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)"/>
        <image href="data:image/png;base64,{logo_b64}" x="4" y="4" width="32" height="32" preserveAspectRatio="xMidYMid meet"/>
        <text x="52" y="18" fill="#FFFFFF" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">SIA USD</text>
        <text x="52" y="32" fill="#F5A623" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">UNIVERSITAS SANATA DHARMA</text>
      </g>
      <line x1="0" y1="80" x2="260" y2="80" stroke="rgba(255,255,255,0.1)"/>

      <!-- Nav Items -->
      <g id="NavLinks">'''

    for key, label, ypos, path_d in nav_items:
        is_active = (key == active_nav)
        bg_fill = "#F5A623" if is_active else "none"
        text_fill = "#0E2A47" if is_active else "#CBD5E1"
        icon_stroke = "#0E2A47" if is_active else "#94A3B8"
        font_weight = "800" if is_active else "600"

        sidebar_svg += f'''
        <g transform="translate(16, {ypos})">
          <rect width="228" height="40" rx="10" fill="{bg_fill}"/>
          <svg x="14" y="11" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="{icon_stroke}" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="{path_d}"/>
          </svg>
          <text x="42" y="25" fill="{text_fill}" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="{font_weight}">{label}</text>
        </g>'''

    sidebar_svg += f'''
      </g>

      <!-- Bottom User Profile Pill -->
      <g transform="translate(0, 820)">
        <rect width="260" height="80" fill="rgba(0,0,0,0.25)"/>
        <line x1="0" y1="0" x2="260" y2="0" stroke="rgba(255,255,255,0.1)"/>
        <circle cx="44" cy="40" r="18" fill="#F5A623"/>
        <text x="44" y="44" text-anchor="middle" fill="#0E2A47" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">GA</text>
        <text x="72" y="35" fill="#FFFFFF" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Gerardo Ardianta</text>
        <text x="72" y="49" fill="#94A3B8" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="600">NIM: 235314003</text>
      </g>
    </g>

    <!-- TOP BAR (x: 260 to 1440, height 80px) -->
    <g id="TopBar" transform="translate(260, 0)">
      <rect width="1180" height="80" fill="#FFFFFF"/>
      <line x1="0" y1="80" x2="1180" y2="80" stroke="#E2E8F0"/>
      
      <!-- Search Input -->
      <g transform="translate(36, 20)">
        <rect width="380" height="40" rx="10" fill="#F1F5F9"/>
        <circle cx="20" cy="20" r="6" stroke="#94A3B8" stroke-width="1.8" fill="none"/>
        <line x1="24.5" y1="24.5" x2="29" y2="29" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
        <text x="40" y="24" fill="#94A3B8" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="500">Cari informasi akademik, jadwal, pengumuman...</text>
      </g>

      <!-- Right Header Actions -->
      <g transform="translate(740, 22)">
        <!-- Semester Pill -->
        <rect width="210" height="36" rx="18" fill="#F8FAFC" stroke="#E2E8F0"/>
        <circle cx="20" cy="18" r="4" fill="#10B981"/>
        <text x="32" y="22" fill="#0E2A47" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Semester Genap 2025/2026</text>

        <!-- Notification Bell -->
        <g transform="translate(230, 2)">
          <rect width="36" height="36" rx="10" fill="#F1F5F9"/>
          <path d="M18 10a4 4 0 0 0-8 0c0 5-2 6-2 6h12s-2-1-2-6" stroke="#475569" stroke-width="1.8" fill="none"/>
          <path d="M12 20a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z" stroke="#475569" stroke-width="1.8" fill="none"/>
          <circle cx="24" cy="8" r="3.5" fill="#EF4444"/>
        </g>

        <!-- Profile Chip -->
        <g transform="translate(285, 0)">
          <rect width="140" height="38" rx="10" fill="#F8FAFC" stroke="#E2E8F0"/>
          <circle cx="22" cy="19" r="13" fill="#0E2A47"/>
          <text x="22" y="23" text-anchor="middle" fill="#F5A623" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">GA</text>
          <text x="44" y="17" fill="#0F172A" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Gerardo A.</text>
          <text x="44" y="29" fill="#94A3B8" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="600">Informatika '23</text>
        </g>
      </g>
    </g>

    <!-- Content Breadcrumb -->
    <g transform="translate(296, 108)">
      <text x="0" y="0" fill="#94A3B8" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700" letter-spacing="0.5">SIA USD  /  {breadcrumb.upper().replace('&AMP;', '&amp;')}</text>
      <text x="0" y="26" fill="#0E2A47" font-size="22" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">{title}</text>
    </g>
    '''
    return sidebar_svg

# ==============================================================================
# 01_login.svg
# ==============================================================================
svg_01 = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900" fill="none">
  <g id="LeftBrand">
    <rect width="720" height="900" fill="#0E2A47"/>
    <circle cx="200" cy="200" r="300" fill="#163B63" opacity="0.5"/>
    <circle cx="600" cy="700" r="250" fill="#163B63" opacity="0.4"/>
    <g transform="translate(80, 80)">
      <rect width="64" height="64" rx="16" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)"/>
      <image href="data:image/png;base64,{logo_b64}" x="8" y="8" width="48" height="48" preserveAspectRatio="xMidYMid meet"/>
      <text x="80" y="30" fill="#FFFFFF" font-size="20" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">SIA USD BROWSER</text>
      <text x="80" y="50" fill="#F5A623" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">UNIVERSITAS SANATA DHARMA YOGYAKARTA</text>
    </g>
    <g transform="translate(80, 320)">
      <rect width="180" height="32" rx="16" fill="rgba(245,166,35,0.15)" stroke="rgba(245,166,35,0.3)"/>
      <text x="20" y="20" fill="#FDE68A" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" letter-spacing="1">CERDAS &amp; HUMANIS</text>
      <text x="0" y="80" fill="#FFFFFF" font-size="36" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Sistem Informasi Akademik</text>
      <text x="0" y="125" fill="#FFFFFF" font-size="36" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Portal Web Mahasiswa</text>
      <text x="0" y="175" fill="#CBD5E1" font-size="15" font-family="Plus Jakarta Sans, sans-serif">Akses jadwal kuliah terpadu, kartu rencana studi (KRS), status pembayaran SPP,</text>
      <text x="0" y="200" fill="#CBD5E1" font-size="15" font-family="Plus Jakarta Sans, sans-serif">dan hasil studi resmi mahasiswa Universitas Sanata Dharma.</text>
      <g transform="translate(0, 240)">
        <rect width="280" height="64" rx="16" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)"/>
        <text x="20" y="26" fill="#94A3B8" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">MAHASISWA TERDAFTAR</text>
        <text x="20" y="46" fill="#FFFFFF" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Gerardo Ardianta • 235314003</text>
      </g>
    </g>
    <text x="80" y="840" fill="#64748B" font-size="12" font-family="Plus Jakarta Sans, sans-serif">© 2026 Universitas Sanata Dharma • Biro Sistem Informasi</text>
  </g>
  <g id="RightLogin" transform="translate(720, 0)">
    <rect width="720" height="900" fill="#F8FAFC"/>
    <g transform="translate(135, 170)">
      <rect width="450" height="560" rx="24" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="48" y="60" fill="#0E2A47" font-size="24" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Masuk Akun Mahasiswa</text>
      <text x="48" y="85" fill="#64748B" font-size="13" font-family="Plus Jakarta Sans, sans-serif">Single Sign-On (SSO) USD Terintegrasi</text>
      <g transform="translate(48, 120)">
        <text x="0" y="0" fill="#475569" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">NOMOR INDUK MAHASISWA (NIM)</text>
        <rect x="0" y="10" width="354" height="48" rx="12" fill="#F8FAFC" stroke="#CBD5E1"/>
        <text x="18" y="40" fill="#0E2A47" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">235314003</text>
      </g>
      <g transform="translate(48, 210)">
        <text x="0" y="0" fill="#475569" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">KATA SANDI AKUN</text>
        <text x="354" y="0" text-anchor="end" fill="#D48810" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Lupa Sandi?</text>
        <rect x="0" y="10" width="354" height="48" rx="12" fill="#F8FAFC" stroke="#CBD5E1"/>
        <text x="18" y="42" fill="#0E2A47" font-size="18" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">••••••••••••</text>
      </g>
      <g transform="translate(48, 300)">
        <rect width="18" height="18" rx="4" fill="#0E2A47"/>
        <path d="M4 9l4 4 6-6" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round"/>
        <text x="28" y="14" fill="#64748B" font-size="12" font-family="Plus Jakarta Sans, sans-serif">Ingat Akun Saya</text>
        <rect x="254" y="-2" width="100" height="24" rx="6" fill="#ECFDF5" stroke="#A7F3D0"/>
        <text x="304" y="14" text-anchor="middle" fill="#047857" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">SSL Terproteksi</text>
      </g>
      <g transform="translate(48, 345)">
        <rect width="354" height="52" rx="14" fill="#0E2A47"/>
        <text x="177" y="32" text-anchor="middle" fill="#FFFFFF" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Masuk ke Portal SIA USD</text>
      </g>
      <g transform="translate(48, 430)">
        <rect width="354" height="74" rx="12" fill="#F1F5F9"/>
        <text x="16" y="24" fill="#0E2A47" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Butuh Bantuan Login?</text>
        <text x="16" y="42" fill="#64748B" font-size="11" font-family="Plus Jakarta Sans, sans-serif">Hubungi Sekretariat BAA / Pengelola SIA Kampus III Paingan</text>
        <text x="16" y="58" fill="#D48810" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Email: helpdesk@usd.ac.id • Telp: (0274) 883037</text>
      </g>
    </g>
  </g>
</svg>'''

# ==============================================================================
# 02_dashboard.svg
# ==============================================================================
svg_02 = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900" fill="none">
  <rect width="1440" height="900" fill="#F1F5F9"/>
  {get_sidebar_and_header("dashboard", "Dashboard Mahasiswa", "Beranda Utama")}

  <!-- 4 STAT METRIC CARDS -->
  <g id="StatCards" transform="translate(296, 160)">
    <!-- Card 1 -->
    <g transform="translate(0, 0)">
      <rect width="255" height="110" rx="16" fill="#FFFFFF" stroke="#E2E8F0"/>
      <rect x="16" y="16" width="36" height="36" rx="10" fill="#FEF3C7"/>
      <path d="M26 34l8-8m0 0h-6m6 0v6" stroke="#D97706" stroke-width="2" stroke-linecap="round"/>
      <text x="64" y="28" fill="#94A3B8" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">INDEKS PRESTASI KUMULATIF</text>
      <text x="64" y="52" fill="#0E2A47" font-size="24" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">3.78</text>
      <text x="16" y="92" fill="#059669" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">• Predikat: Cum Laude</text>
    </g>
    <!-- Card 2 -->
    <g transform="translate(275, 0)">
      <rect width="255" height="110" rx="16" fill="#FFFFFF" stroke="#E2E8F0"/>
      <rect x="16" y="16" width="36" height="36" rx="10" fill="#DBEAFE"/>
      <path d="M26 26h16v16H26z" stroke="#2563EB" stroke-width="2" fill="none"/>
      <text x="64" y="28" fill="#94A3B8" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">SKS TEMPUH / MAKS</text>
      <text x="64" y="52" fill="#0E2A47" font-size="24" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">112 <tspan font-size="14" fill="#94A3B8" font-weight="600">/ 14 SKS Genap</tspan></text>
      <text x="16" y="92" fill="#2563EB" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">• 5 Mata Kuliah Terdaftar</text>
    </g>
    <!-- Card 3 -->
    <g transform="translate(550, 0)">
      <rect width="255" height="110" rx="16" fill="#FFFFFF" stroke="#E2E8F0"/>
      <rect x="16" y="16" width="36" height="36" rx="10" fill="#D1FAE5"/>
      <path d="M26 34l4 4 8-8" stroke="#059669" stroke-width="2" stroke-linecap="round" fill="none"/>
      <text x="64" y="28" fill="#94A3B8" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">STATUS VALIDASI KRS</text>
      <text x="64" y="52" fill="#059669" font-size="20" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">DISETUJUI (ACC)</text>
      <text x="16" y="92" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="600">Dosen: Prof. Bambang Soelistijanto</text>
    </g>
    <!-- Card 4 -->
    <g transform="translate(825, 0)">
      <rect width="255" height="110" rx="16" fill="#FFFFFF" stroke="#E2E8F0"/>
      <rect x="16" y="16" width="36" height="36" rx="10" fill="#ECFDF5"/>
      <circle cx="34" cy="34" r="8" stroke="#059669" stroke-width="2" fill="none"/>
      <text x="64" y="28" fill="#94A3B8" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">STATUS BIAYA KULIAH</text>
      <text x="64" y="52" fill="#059669" font-size="20" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">LUNAS (BEBAS)</text>
      <text x="16" y="92" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="600">BNI VA: 988 003 235314003</text>
    </g>
  </g>

  <!-- TODAY'S SCHEDULE & RIGHT RAIL -->
  <g id="ScheduleSection" transform="translate(296, 295)">
    <g>
      <rect width="690" height="550" rx="20" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="24" y="36" fill="#0E2A47" font-size="15" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Jadwal Kuliah Hari Ini (Senin)</text>
      <text x="24" y="56" fill="#64748B" font-size="11" font-family="Plus Jakarta Sans, sans-serif">2 Mata Kuliah • Kampus III Paingan</text>

      <g transform="translate(24, 80)">
        <rect width="642" height="120" rx="14" fill="#F8FAFC" stroke="#BFDBFE"/>
        <rect x="0" y="0" width="6" height="120" rx="3" fill="#2563EB"/>
        <text x="24" y="28" fill="#2563EB" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">INF-331 • 3 SKS</text>
        <text x="620" y="28" text-anchor="end" fill="#64748B" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">07:00 - 08:40 WIB</text>
        <text x="24" y="54" fill="#0F172A" font-size="15" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Analisis Proses Bisnis (Kelas C)</text>
        <text x="24" y="74" fill="#64748B" font-size="12" font-family="Plus Jakarta Sans, sans-serif">Dosen: Agnes Maria Polina, S.Kom., M.Sc.</text>
        <line x1="24" y1="88" x2="620" y2="88" stroke="#E2E8F0"/>
        <text x="24" y="106" fill="#475569" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="600">Ruang: R.314 Gedung St. Robertus</text>
        <text x="620" y="106" text-anchor="end" fill="#2563EB" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Kampus III Paingan</text>
      </g>

      <g transform="translate(24, 220)">
        <rect width="642" height="120" rx="14" fill="#F8FAFC" stroke="#BAE6FD"/>
        <rect x="0" y="0" width="6" height="120" rx="3" fill="#0284C7"/>
        <text x="24" y="28" fill="#0284C7" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">INF-332 • 3 SKS</text>
        <text x="620" y="28" text-anchor="end" fill="#64748B" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">10:30 - 12:10 WIB</text>
        <text x="24" y="54" fill="#0F172A" font-size="15" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Desain UI/UX (Kelas A)</text>
        <text x="24" y="74" fill="#64748B" font-size="12" font-family="Plus Jakarta Sans, sans-serif">Dosen: Dr. Ir. Iwan Binanto</text>
        <line x1="24" y1="88" x2="620" y2="88" stroke="#E2E8F0"/>
        <text x="24" y="106" fill="#475569" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="600">Ruang: Lab Komputer 2 (Lantai 3)</text>
        <text x="620" y="106" text-anchor="end" fill="#0284C7" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Kampus III Paingan</text>
      </g>

      <g transform="translate(24, 365)">
        <text x="0" y="0" fill="#0E2A47" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Matriks Kuliah Mingguan</text>
        <g transform="translate(0, 15)">
          <rect x="0" y="0" width="120" height="70" rx="10" fill="#0E2A47"/>
          <text x="60" y="25" text-anchor="middle" fill="#F5A623" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">SENIN</text>
          <text x="60" y="45" text-anchor="middle" fill="#FFFFFF" font-size="10" font-family="Plus Jakarta Sans, sans-serif">2 MK • 6 SKS</text>

          <rect x="130" y="0" width="120" height="70" rx="10" fill="#F8FAFC" stroke="#E2E8F0"/>
          <text x="190" y="25" text-anchor="middle" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">SELASA</text>
          <text x="190" y="45" text-anchor="middle" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif">1 MK • Bergerak</text>

          <rect x="260" y="0" width="120" height="70" rx="10" fill="#F8FAFC" stroke="#E2E8F0"/>
          <text x="320" y="25" text-anchor="middle" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">RABU</text>
          <text x="320" y="45" text-anchor="middle" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif">1 MK • Jaringan</text>

          <rect x="390" y="0" width="120" height="70" rx="10" fill="#F8FAFC" stroke="#E2E8F0"/>
          <text x="450" y="25" text-anchor="middle" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">KAMIS</text>
          <text x="450" y="45" text-anchor="middle" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif">1 MK • Metodologi</text>

          <rect x="520" y="0" width="120" height="70" rx="10" fill="#F8FAFC" stroke="#E2E8F0"/>
          <text x="580" y="25" text-anchor="middle" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">JUMAT</text>
          <text x="580" y="45" text-anchor="middle" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Mandiri</text>
        </g>
      </g>
    </g>

    <!-- Right Side Rail -->
    <g transform="translate(710, 0)">
      <g>
        <rect width="370" height="230" rx="20" fill="#0E2A47"/>
        <text x="24" y="36" fill="#F5A623" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">DOSEN PEMBIMBING AKADEMIK</text>
        <text x="24" y="65" fill="#FFFFFF" font-size="16" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Prof. Ir. Bambang Soelistijanto, Ph.D.</text>
        <text x="24" y="85" fill="#94A3B8" font-size="11" font-family="Plus Jakarta Sans, sans-serif">NPP: 02198014 • Prodi Informatika FST</text>
        <rect x="24" y="105" width="322" height="50" rx="10" fill="rgba(255,255,255,0.08)"/>
        <text x="40" y="126" fill="#CBD5E1" font-size="11" font-family="Plus Jakarta Sans, sans-serif">Status Konsultasi KRS:</text>
        <text x="330" y="126" text-anchor="end" fill="#34D399" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">ACC Disetujui</text>
        <text x="40" y="142" fill="#94A3B8" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Jadwal Bimbingan: Kamis 13:00 - 15:00 WIB</text>
        <rect x="24" y="170" width="322" height="38" rx="10" fill="#F5A623"/>
        <text x="185" y="194" text-anchor="middle" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Ajukan Janji Bimbingan PA</text>
      </g>

      <g transform="translate(0, 250)">
        <rect width="370" height="300" rx="20" fill="#FFFFFF" stroke="#E2E8F0"/>
        <text x="24" y="36" fill="#0E2A47" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Pengumuman Terkini BAA</text>
        <g transform="translate(24, 55)">
          <rect width="322" height="65" rx="10" fill="#F8FAFC" stroke="#E2E8F0"/>
          <text x="12" y="20" fill="#DC2626" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">PENTING • BAA USD</text>
          <text x="12" y="38" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Jadwal Ujian Tengah Semester (UTS)</text>
          <text x="12" y="52" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Mulai 18 Maret 2026 • Cetak Kartu Ujian</text>
        </g>
        <g transform="translate(24, 130)">
          <rect width="322" height="65" rx="10" fill="#F8FAFC" stroke="#E2E8F0"/>
          <text x="12" y="20" fill="#2563EB" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">FST INFORMATIKA</text>
          <text x="12" y="38" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Workshop AI &amp; Software Engineering</text>
          <text x="12" y="52" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Jumat pukul 09.00 WIB di R. Driyarkara</text>
        </g>
        <g transform="translate(24, 205)">
          <rect width="322" height="65" rx="10" fill="#F8FAFC" stroke="#E2E8F0"/>
          <text x="12" y="20" fill="#059669" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">BEASISWA</text>
          <text x="12" y="38" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Beasiswa Driyarkara Prestasi 2026</text>
          <text x="12" y="52" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif">IPK &gt;= 3.50 • Batas 10 Maret 2026</text>
        </g>
      </g>
    </g>
  </g>
</svg>'''

# ==============================================================================
# 03_pengumuman.svg
# ==============================================================================
svg_03 = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900" fill="none">
  <rect width="1440" height="900" fill="#F1F5F9"/>
  {get_sidebar_and_header("pengumuman", "Pengumuman &amp; Agenda Akademik", "Pengumuman")}

  <g transform="translate(296, 160)">
    <!-- HIGHLIGHT PINNED BANNER (1080px wide) -->
    <rect width="1080" height="130" rx="20" fill="#0E2A47"/>
    <circle cx="1000" cy="65" r="90" fill="#163B63" opacity="0.6"/>
    <g transform="translate(30, 25)">
      <rect width="80" height="80" rx="16" fill="#F5A623"/>
      <path d="M40 30v20m-10-10h20" stroke="#0E2A47" stroke-width="4" stroke-linecap="round"/>
      <text x="100" y="24" fill="#FDE68A" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">PENTING • BAA USD</text>
      <text x="100" y="48" fill="#FFFFFF" font-size="18" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Jadwal Ujian Tengah Semester (UTS) Genap 2025/2026</text>
      <text x="100" y="68" fill="#CBD5E1" font-size="12" font-family="Plus Jakarta Sans, sans-serif">Mulai 18 Maret 2026. Mahasiswa diwajibkan melunasi SPP variabel untuk cetak kartu ujian resmi.</text>
      <rect x="850" y="20" width="160" height="40" rx="10" fill="#F5A623"/>
      <text x="930" y="45" text-anchor="middle" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Cek Kalender UTS</text>
    </g>

    <!-- 2 COLUMNS: LEFT 690px Feed + RIGHT 360px Deadlines -->
    <g transform="translate(0, 155)">
      <!-- Left Column Announcements -->
      <g>
        <rect width="690" height="520" rx="20" fill="#FFFFFF" stroke="#E2E8F0"/>
        <text x="24" y="36" fill="#0E2A47" font-size="15" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Pengumuman Resmi Terkini</text>

        <!-- Card 1 -->
        <g transform="translate(24, 60)">
          <rect width="642" height="125" rx="14" fill="#F8FAFC" stroke="#E2E8F0"/>
          <rect x="16" y="14" width="100" height="22" rx="6" fill="#DBEAFE"/>
          <text x="66" y="29" text-anchor="middle" fill="#1E40AF" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">FST INFORMATIKA</text>
          <text x="626" y="29" text-anchor="end" fill="#94A3B8" font-size="11" font-family="Plus Jakarta Sans, sans-serif">24 Februari 2026</text>
          <text x="16" y="60" fill="#0F172A" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Workshop AI &amp; Software Engineering Bersama Praktisi Industri</text>
          <text x="16" y="80" fill="#64748B" font-size="11" font-family="Plus Jakarta Sans, sans-serif">Diselenggarakan di Ruang Driyarkara Kampus II Mrican hari Jumat pukul 09.00 - 15.00 WIB.</text>
          <text x="16" y="105" fill="#D48810" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Unduh Jadwal &amp; Registrasi Workshop →</text>
        </g>

        <!-- Card 2 -->
        <g transform="translate(24, 205)">
          <rect width="642" height="125" rx="14" fill="#F8FAFC" stroke="#E2E8F0"/>
          <rect x="16" y="14" width="85" height="22" rx="6" fill="#D1FAE5"/>
          <text x="58" y="29" text-anchor="middle" fill="#065F46" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">BEASISWA</text>
          <text x="626" y="29" text-anchor="end" fill="#94A3B8" font-size="11" font-family="Plus Jakarta Sans, sans-serif">20 Februari 2026</text>
          <text x="16" y="60" fill="#0F172A" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Pembukaan Beasiswa Driyarkara Prestasi Akademik 2026</text>
          <text x="16" y="80" fill="#64748B" font-size="11" font-family="Plus Jakarta Sans, sans-serif">Pendaftaran bagi mahasiswa berprestasi dengan IPK &gt;= 3.50. Berkas ke Kemahasiswaan Paingan.</text>
          <text x="16" y="105" fill="#D48810" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Unduh Formulir &amp; Persyaratan Lengkap →</text>
        </g>

        <!-- Card 3 -->
        <g transform="translate(24, 350)">
          <rect width="642" height="125" rx="14" fill="#F8FAFC" stroke="#E2E8F0"/>
          <rect x="16" y="14" width="115" height="22" rx="6" fill="#FEF3C7"/>
          <text x="73" y="29" text-anchor="middle" fill="#92400E" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">PERPUSTAKAAN</text>
          <text x="626" y="29" text-anchor="end" fill="#94A3B8" font-size="11" font-family="Plus Jakarta Sans, sans-serif">15 Februari 2026</text>
          <text x="16" y="60" fill="#0F172A" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Akses Jurnal Internasional IEEE Xplore, ScienceDirect, ACM</text>
          <text x="16" y="80" fill="#64748B" font-size="11" font-family="Plus Jakarta Sans, sans-serif">Akses repositori jurnal melalui Single Sign-On akun student.usd.ac.id dari luar kampus.</text>
          <text x="16" y="105" fill="#D48810" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Panduan Akses VPN &amp; SSO Kampus →</text>
        </g>
      </g>

      <!-- Right Column Agenda Box (Ref: Sketsa Kotak 3 Kotak Besar di Bawah) -->
      <g transform="translate(710, 0)">
        <rect width="370" height="520" rx="20" fill="#0E2A47"/>
        <text x="24" y="36" fill="#F5A623" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">AGENDA AKADEMIK PENTING</text>
        <text x="24" y="60" fill="#FFFFFF" font-size="16" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Kalender Semester Genap</text>

        <!-- Deadline Item 1 -->
        <g transform="translate(24, 85)">
          <rect width="322" height="75" rx="12" fill="rgba(255,255,255,0.08)"/>
          <text x="16" y="24" fill="#FDE68A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Revisi &amp; Pembatalan KRS</text>
          <text x="16" y="44" fill="#FFFFFF" font-size="11" font-family="Plus Jakarta Sans, sans-serif">05 Maret - 12 Maret 2026</text>
          <text x="16" y="60" fill="#94A3B8" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Persetujuan via Dosen PA: Prof. Bambang</text>
        </g>

        <!-- Deadline Item 2 -->
        <g transform="translate(24, 175)">
          <rect width="322" height="75" rx="12" fill="rgba(255,255,255,0.08)"/>
          <text x="16" y="24" fill="#FDE68A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Pelaksanaan UTS Genap</text>
          <text x="16" y="44" fill="#FFFFFF" font-size="11" font-family="Plus Jakarta Sans, sans-serif">18 Maret - 28 Maret 2026</text>
          <text x="16" y="60" fill="#94A3B8" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Wajib cetak kartu ujian resmi di SIA</text>
        </g>

        <!-- Deadline Item 3 -->
        <g transform="translate(24, 265)">
          <rect width="322" height="75" rx="12" fill="rgba(255,255,255,0.08)"/>
          <text x="16" y="24" fill="#FDE68A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Batas Akhir Pelunasan SPP</text>
          <text x="16" y="44" fill="#FFFFFF" font-size="11" font-family="Plus Jakarta Sans, sans-serif">15 Mei 2026</text>
          <text x="16" y="60" fill="#34D399" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Status Gerardo: LUNAS</text>
        </g>

        <!-- Deadline Item 4 -->
        <g transform="translate(24, 355)">
          <rect width="322" height="75" rx="12" fill="rgba(255,255,255,0.08)"/>
          <text x="16" y="24" fill="#FDE68A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Ujian Akhir Semester (UAS)</text>
          <text x="16" y="44" fill="#FFFFFF" font-size="11" font-family="Plus Jakarta Sans, sans-serif">15 Juni - 27 Juni 2026</text>
          <text x="16" y="60" fill="#94A3B8" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Syarat kehadiran perkuliahan &gt;= 75%</text>
        </g>

        <rect x="24" y="450" width="322" height="42" rx="12" fill="#F5A623"/>
        <text x="185" y="476" text-anchor="middle" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Unduh Kalender Akademik Resmi</text>
      </g>
    </g>
  </g>
</svg>'''

# ==============================================================================
# 04_jadwal.svg (Timetable Matrix 5-Day Columns)
# ==============================================================================
svg_04 = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900" fill="none">
  <rect width="1440" height="900" fill="#F1F5F9"/>
  {get_sidebar_and_header("jadwal", "Jadwal Kuliah Mingguan", "Jadwal Kuliah")}

  <g transform="translate(296, 160)">
    <!-- Top Action Row -->
    <text x="0" y="20" fill="#64748B" font-size="12" font-family="Plus Jakarta Sans, sans-serif">Total 5 Mata Kuliah • 14 SKS Terdaftar • Kampus III Paingan</text>
    <g transform="translate(800, 0)">
      <rect width="130" height="36" rx="10" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="65" y="22" text-anchor="middle" fill="#475569" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Google Calendar</text>
      <rect x="145" y="0" width="135" height="36" rx="10" fill="#0E2A47"/>
      <text x="212" y="22" text-anchor="middle" fill="#FFFFFF" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Cetak Jadwal PDF</text>
    </g>

    <!-- 5-DAY MATRIX TABLE (1080px wide, 5 columns @ 205px each with 12px gap) -->
    <g transform="translate(0, 50)">
      <!-- SENIN -->
      <g transform="translate(0, 0)">
        <rect width="206" height="630" rx="16" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect width="206" height="50" rx="16" fill="#0E2A47"/>
        <rect y="34" width="206" height="16" fill="#0E2A47"/>
        <text x="103" y="25" text-anchor="middle" fill="#F5A623" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">SENIN</text>
        <text x="103" y="42" text-anchor="middle" fill="#CBD5E1" font-size="10" font-family="Plus Jakarta Sans, sans-serif">2 Mata Kuliah • 6 SKS</text>

        <!-- Course 1 -->
        <g transform="translate(12, 65)">
          <rect width="182" height="170" rx="12" fill="#F8FAFC" stroke="#BFDBFE"/>
          <rect width="4" height="170" rx="2" fill="#2563EB"/>
          <text x="12" y="22" fill="#2563EB" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">INF-331 • 3 SKS</text>
          <text x="12" y="38" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">07:00 - 08:40</text>
          <text x="12" y="60" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Analisis Proses</text>
          <text x="12" y="76" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Bisnis (Kelas C)</text>
          <text x="12" y="102" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Agnes Maria Polina,</text>
          <text x="12" y="116" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif">S.Kom., M.Sc.</text>
          <line x1="12" y1="130" x2="170" y2="130" stroke="#E2E8F0"/>
          <text x="12" y="148" fill="#2563EB" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">R.314 St. Robertus</text>
        </g>

        <!-- Course 2 -->
        <g transform="translate(12, 250)">
          <rect width="182" height="170" rx="12" fill="#F8FAFC" stroke="#BAE6FD"/>
          <rect width="4" height="170" rx="2" fill="#0284C7"/>
          <text x="12" y="22" fill="#0284C7" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">INF-332 • 3 SKS</text>
          <text x="12" y="38" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">10:30 - 12:10</text>
          <text x="12" y="60" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Desain UI/UX</text>
          <text x="12" y="76" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">(Kelas A)</text>
          <text x="12" y="102" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Dr. Ir. Iwan Binanto</text>
          <line x1="12" y1="130" x2="170" y2="130" stroke="#E2E8F0"/>
          <text x="12" y="148" fill="#0284C7" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Lab Komputer 2 Lt.3</text>
        </g>
      </g>

      <!-- SELASA -->
      <g transform="translate(218, 0)">
        <rect width="206" height="630" rx="16" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect width="206" height="50" rx="16" fill="#F8FAFC"/>
        <rect y="34" width="206" height="16" fill="#F8FAFC"/>
        <text x="103" y="25" text-anchor="middle" fill="#0E2A47" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">SELASA</text>
        <text x="103" y="42" text-anchor="middle" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif">1 Mata Kuliah • 3 SKS</text>

        <!-- Course 3 -->
        <g transform="translate(12, 65)">
          <rect width="182" height="180" rx="12" fill="#F8FAFC" stroke="#E9D5FF"/>
          <rect width="4" height="180" rx="2" fill="#9333EA"/>
          <text x="12" y="22" fill="#9333EA" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">INF-333 • 3 SKS</text>
          <text x="12" y="38" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">08:45 - 10:25</text>
          <text x="12" y="60" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Pemrograman</text>
          <text x="12" y="76" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Perangkat Bergerak</text>
          <text x="12" y="92" fill="#F5A623" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Kelas B</text>
          <text x="12" y="112" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Puspaningtyas Sanjoyo</text>
          <text x="12" y="126" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Adi, S.T., M.T.</text>
          <line x1="12" y1="140" x2="170" y2="140" stroke="#E2E8F0"/>
          <text x="12" y="158" fill="#9333EA" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Lab Pemrograman Lt.2</text>
        </g>
      </g>

      <!-- RABU -->
      <g transform="translate(436, 0)">
        <rect width="206" height="630" rx="16" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect width="206" height="50" rx="16" fill="#F8FAFC"/>
        <rect y="34" width="206" height="16" fill="#F8FAFC"/>
        <text x="103" y="25" text-anchor="middle" fill="#0E2A47" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">RABU</text>
        <text x="103" y="42" text-anchor="middle" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif">1 Mata Kuliah • 3 SKS</text>

        <!-- Course 4 -->
        <g transform="translate(12, 65)">
          <rect width="182" height="180" rx="12" fill="#F8FAFC" stroke="#A7F3D0"/>
          <rect width="4" height="180" rx="2" fill="#059669"/>
          <text x="12" y="22" fill="#059669" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">INF-334 • 3 SKS</text>
          <text x="12" y="38" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">07:00 - 08:40</text>
          <text x="12" y="60" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Pengukuran &amp; Analisis</text>
          <text x="12" y="76" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Kinerja Jaringan (A)</text>
          <text x="12" y="102" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Prof. Ir. Bambang</text>
          <text x="12" y="116" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Soelistijanto, Ph.D.</text>
          <line x1="12" y1="140" x2="170" y2="140" stroke="#E2E8F0"/>
          <text x="12" y="158" fill="#059669" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">R.312 St. Robertus</text>
        </g>
      </g>

      <!-- KAMIS -->
      <g transform="translate(654, 0)">
        <rect width="206" height="630" rx="16" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect width="206" height="50" rx="16" fill="#F8FAFC"/>
        <rect y="34" width="206" height="16" fill="#F8FAFC"/>
        <text x="103" y="25" text-anchor="middle" fill="#0E2A47" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">KAMIS</text>
        <text x="103" y="42" text-anchor="middle" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif">1 Mata Kuliah • 2 SKS</text>

        <!-- Course 5 -->
        <g transform="translate(12, 65)">
          <rect width="182" height="180" rx="12" fill="#F8FAFC" stroke="#FDE68A"/>
          <rect width="4" height="180" rx="2" fill="#D97706"/>
          <text x="12" y="22" fill="#D97706" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">INF-335 • 2 SKS</text>
          <text x="12" y="38" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">08:45 - 10:25</text>
          <text x="12" y="60" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Metodologi</text>
          <text x="12" y="76" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Penelitian (Kelas A)</text>
          <text x="12" y="102" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Prof. Ir. Bambang</text>
          <text x="12" y="116" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Soelistijanto, Ph.D.</text>
          <line x1="12" y1="140" x2="170" y2="140" stroke="#E2E8F0"/>
          <text x="12" y="158" fill="#D97706" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">R.205 Thomas Aquinas</text>
        </g>
      </g>

      <!-- JUMAT -->
      <g transform="translate(872, 0)">
        <rect width="206" height="630" rx="16" fill="#FFFFFF" stroke="#E2E8F0"/>
        <rect width="206" height="50" rx="16" fill="#F8FAFC"/>
        <rect y="34" width="206" height="16" fill="#F8FAFC"/>
        <text x="103" y="25" text-anchor="middle" fill="#0E2A47" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">JUMAT</text>
        <text x="103" y="42" text-anchor="middle" fill="#94A3B8" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Praktikum Mandiri</text>

        <g transform="translate(12, 180)">
          <rect width="182" height="130" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-dasharray="4 4"/>
          <text x="91" y="50" text-anchor="middle" fill="#94A3B8" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Jadwal Kosong</text>
          <text x="91" y="70" text-anchor="middle" fill="#CBD5E1" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Sesi Mandiri / Proyek</text>
          <text x="91" y="85" text-anchor="middle" fill="#CBD5E1" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Lab Informatika Paingan</text>
        </g>
      </g>
    </g>
  </g>
</svg>'''

# ==============================================================================
# 05_tagihan.svg (Financial & SPP Dashboard)
# ==============================================================================
svg_05 = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900" fill="none">
  <rect width="1440" height="900" fill="#F1F5F9"/>
  {get_sidebar_and_header("tagihan", "Keuangan &amp; SPP Mahasiswa", "Keuangan")}

  <g transform="translate(296, 160)">
    <!-- 2 COLUMNS: LEFT 650px Active Bill + RIGHT 410px History -->
    
    <!-- LEFT COLUMN: ACTIVE INVOICE -->
    <g>
      <rect width="650" height="675" rx="20" fill="#FFFFFF" stroke="#E2E8F0"/>
      
      <!-- Card Header -->
      <g transform="translate(32, 28)">
        <text x="0" y="16" fill="#D48810" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">SEMESTER GENAP 2025/2026</text>
        <text x="0" y="44" fill="#0E2A47" font-size="20" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Biaya Pendidikan Resmi (14 SKS)</text>
        <rect x="480" y="16" width="105" height="30" rx="8" fill="#ECFDF5" stroke="#A7F3D0"/>
        <text x="532" y="36" text-anchor="middle" fill="#059669" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">LUNAS</text>
      </g>
      <line x1="32" y1="95" x2="618" y2="95" stroke="#F1F5F9"/>

      <!-- Big Total Banner -->
      <g transform="translate(32, 115)">
        <rect width="586" height="90" rx="16" fill="#ECFDF5" stroke="#A7F3D0"/>
        <text x="24" y="34" fill="#065F46" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Total Beban Tagihan Semester</text>
        <text x="24" y="68" fill="#064E3B" font-size="28" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Rp 7.850.000</text>
        <text x="562" y="52" text-anchor="end" fill="#059669" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Lunas 12 Feb 2026</text>
      </g>

      <!-- Cost Breakdown List -->
      <g transform="translate(32, 235)">
        <text x="0" y="0" fill="#0E2A47" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Rincian Komponen Biaya Kuliah</text>
        
        <g transform="translate(0, 20)">
          <!-- Row 1 -->
          <rect width="586" height="42" fill="#F8FAFC" rx="8"/>
          <text x="16" y="26" fill="#475569" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="600">SPP Tetap (Biaya Operasional Pokok)</text>
          <text x="570" y="26" text-anchor="end" fill="#0F172A" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Rp 3.250.000</text>
        </g>
        <g transform="translate(0, 70)">
          <!-- Row 2 -->
          <rect width="586" height="42" fill="#FFFFFF" rx="8"/>
          <text x="16" y="26" fill="#475569" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="600">SKS Variabel (14 SKS × Rp 285.000)</text>
          <text x="570" y="26" text-anchor="end" fill="#0F172A" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Rp 3.990.000</text>
        </g>
        <g transform="translate(0, 120)">
          <!-- Row 3 -->
          <rect width="586" height="42" fill="#F8FAFC" rx="8"/>
          <text x="16" y="26" fill="#475569" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="600">Praktikum Lab Komputer &amp; Jaringan</text>
          <text x="570" y="26" text-anchor="end" fill="#0F172A" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Rp 450.000</text>
        </g>
        <g transform="translate(0, 170)">
          <!-- Row 4 -->
          <rect width="586" height="42" fill="#FFFFFF" rx="8"/>
          <text x="16" y="26" fill="#475569" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="600">Perpustakaan &amp; Fasilitas Kampus</text>
          <text x="570" y="26" text-anchor="end" fill="#0F172A" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Rp 160.000</text>
        </g>
      </g>

      <!-- BNI Virtual Account Card -->
      <g transform="translate(32, 485)">
        <rect width="586" height="95" rx="16" fill="#FEF3C7" stroke="#FDE68A"/>
        <text x="24" y="28" fill="#92400E" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">BNI VIRTUAL ACCOUNT RESMI USD</text>
        <text x="24" y="56" fill="#0E2A47" font-size="20" font-family="Plus Jakarta Sans, sans-serif" font-weight="900" letter-spacing="1">988 003 235314003</text>
        <text x="24" y="78" fill="#78350F" font-size="11" font-family="Plus Jakarta Sans, sans-serif">Nama Mahasiswa: Gerardo Ardianta (NIM: 235314003)</text>
        <rect x="470" y="30" width="95" height="36" rx="10" fill="#0E2A47"/>
        <text x="517" y="52" text-anchor="middle" fill="#FFFFFF" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Salin No. VA</text>
      </g>

      <!-- Download Button -->
      <g transform="translate(32, 600)">
        <rect width="586" height="46" rx="12" fill="#0E2A47"/>
        <text x="293" y="28" text-anchor="middle" fill="#FFFFFF" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Unduh Kwitansi Pembayaran Sah (PDF)</text>
      </g>
    </g>

    <!-- RIGHT COLUMN: PAYMENT HISTORY -->
    <g transform="translate(675, 0)">
      <rect width="405" height="675" rx="20" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="24" y="36" fill="#0E2A47" font-size="15" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Riwayat Pembayaran Kuliah</text>
      <text x="24" y="56" fill="#64748B" font-size="11" font-family="Plus Jakarta Sans, sans-serif">Semester 1 s/d Semester 5 Terverifikasi</text>

      <!-- History Item 1 -->
      <g transform="translate(24, 80)">
        <rect width="357" height="90" rx="14" fill="#F8FAFC" stroke="#E2E8F0"/>
        <text x="16" y="26" fill="#0F172A" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Semester 5 (Ganjil 2025/2026)</text>
        <text x="16" y="44" fill="#64748B" font-size="11" font-family="Plus Jakarta Sans, sans-serif">12 Ags 2025 • Mandiri Virtual Account</text>
        <text x="16" y="70" fill="#059669" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Rp 7.620.000</text>
        <rect x="250" y="52" width="90" height="24" rx="6" fill="#ECFDF5"/>
        <text x="295" y="68" text-anchor="middle" fill="#059669" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Tervalidasi BAA</text>
      </g>

      <!-- History Item 2 -->
      <g transform="translate(24, 185)">
        <rect width="357" height="90" rx="14" fill="#F8FAFC" stroke="#E2E8F0"/>
        <text x="16" y="26" fill="#0F172A" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Semester 4 (Genap 2024/2025)</text>
        <text x="16" y="44" fill="#64748B" font-size="11" font-family="Plus Jakarta Sans, sans-serif">10 Feb 2025 • BNI Virtual Account</text>
        <text x="16" y="70" fill="#059669" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Rp 7.450.000</text>
        <rect x="250" y="52" width="90" height="24" rx="6" fill="#ECFDF5"/>
        <text x="295" y="68" text-anchor="middle" fill="#059669" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Tervalidasi BAA</text>
      </g>

      <!-- History Item 3 -->
      <g transform="translate(24, 290)">
        <rect width="357" height="90" rx="14" fill="#F8FAFC" stroke="#E2E8F0"/>
        <text x="16" y="26" fill="#0F172A" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Semester 3 (Ganjil 2024/2025)</text>
        <text x="16" y="44" fill="#64748B" font-size="11" font-family="Plus Jakarta Sans, sans-serif">15 Ags 2024 • BNI Virtual Account</text>
        <text x="16" y="70" fill="#059669" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Rp 7.300.000</text>
        <rect x="250" y="52" width="90" height="24" rx="6" fill="#ECFDF5"/>
        <text x="295" y="68" text-anchor="middle" fill="#059669" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Tervalidasi BAA</text>
      </g>

      <!-- Bank Partners Info Box -->
      <g transform="translate(24, 400)">
        <rect width="357" height="150" rx="14" fill="#0E2A47"/>
        <text x="20" y="28" fill="#F5A623" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">KANAL RESMI PERBANKAN</text>
        <text x="20" y="50" fill="#FFFFFF" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Metode Pembayaran Tagihan</text>
        <text x="20" y="74" fill="#CBD5E1" font-size="11" font-family="Plus Jakarta Sans, sans-serif">Dukungan ATM &amp; Mobile Banking:</text>
        <text x="20" y="96" fill="#FDE68A" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">• Bank Negara Indonesia (BNI)</text>
        <text x="20" y="114" fill="#FDE68A" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">• Bank Mandiri • BCA • Permata Bank</text>
        <text x="20" y="132" fill="#94A3B8" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Bebas biaya admin melalui teller kampus USD</text>
      </g>

      <g transform="translate(24, 600)">
        <rect width="357" height="46" rx="12" fill="#F1F5F9" stroke="#E2E8F0"/>
        <text x="178" y="28" text-anchor="middle" fill="#475569" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Unduh Rekap Seluruh Bukti Bayar</text>
      </g>
    </g>
  </g>
</svg>'''

# ==============================================================================
# 06_biodata.svg (Student Dossier & Identity)
# ==============================================================================
svg_06 = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900" fill="none">
  <rect width="1440" height="900" fill="#F1F5F9"/>
  {get_sidebar_and_header("biodata", "Biodata &amp; Profil Mahasiswa", "Biodata Mahasiswa")}

  <g transform="translate(296, 160)">
    <!-- LEFT 380px: Student ID Photo & Fast Stats -->
    <g>
      <rect width="380" height="675" rx="20" fill="#FFFFFF" stroke="#E2E8F0"/>
      
      <!-- Student Photo Frame (Ref: Sketsa Kotak 6 Foto Kiri Atas) -->
      <g transform="translate(100, 32)">
        <rect width="180" height="230" rx="16" fill="#0E2A47" stroke="#F5A623" stroke-width="2"/>
        <circle cx="90" cy="95" r="40" fill="#163B63"/>
        <path d="M40 185c0-30 25-50 50-50s50 20 50 50" fill="#163B63"/>
        <rect x="30" y="195" width="120" height="24" rx="6" fill="#000000" opacity="0.6"/>
        <text x="90" y="211" text-anchor="middle" fill="#FDE68A" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">FOTO RESMI USD</text>
      </g>

      <!-- Student Name & Meta -->
      <text x="190" y="295" text-anchor="middle" fill="#0E2A47" font-size="20" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Gerardo Ardianta</text>
      <text x="190" y="318" text-anchor="middle" fill="#D48810" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">NIM: 235314003</text>
      <text x="190" y="338" text-anchor="middle" fill="#64748B" font-size="12" font-family="Plus Jakarta Sans, sans-serif">S1 Teknik Informatika • FST</text>
      <text x="190" y="354" text-anchor="middle" fill="#94A3B8" font-size="11" font-family="Plus Jakarta Sans, sans-serif">Kampus III Paingan, Maguwoharjo</text>

      <!-- Badges -->
      <g transform="translate(24, 380)">
        <rect width="332" height="60" rx="12" fill="#F8FAFC" stroke="#E2E8F0"/>
        <text x="20" y="25" fill="#94A3B8" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">STATUS MAHASISWA</text>
        <text x="20" y="44" fill="#059669" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">• Aktif (Semester 6 Genap)</text>
        <text x="220" y="25" fill="#94A3B8" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">ANGKATAN</text>
        <text x="220" y="44" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">2023 / Reguler</text>
      </g>

      <!-- Dosen PA Info Box -->
      <g transform="translate(24, 460)">
        <rect width="332" height="110" rx="14" fill="#0E2A47"/>
        <text x="20" y="25" fill="#F5A623" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">DOSEN PEMBIMBING AKADEMIK</text>
        <text x="20" y="50" fill="#FFFFFF" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Prof. Ir. Bambang Soelistijanto, Ph.D.</text>
        <text x="20" y="70" fill="#CBD5E1" font-size="11" font-family="Plus Jakarta Sans, sans-serif">NPP: 02198014 • Guru Besar FST</text>
        <text x="20" y="92" fill="#FDE68A" font-size="11" font-family="Plus Jakarta Sans, sans-serif">Email: bambang.s@usd.ac.id</text>
      </g>

      <!-- Button Edit -->
      <g transform="translate(24, 595)">
        <rect width="332" height="48" rx="12" fill="#0E2A47"/>
        <text x="166" y="29" text-anchor="middle" fill="#FFFFFF" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Ajukan Perubahan Kontak / Data</text>
      </g>
    </g>

    <!-- RIGHT 675px: Complete Dossier Details (Ref: Sketsa Kotak 6 Garis Data) -->
    <g transform="translate(405, 0)">
      <rect width="675" height="675" rx="20" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="32" y="36" fill="#0E2A47" font-size="16" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Informasi Pokok &amp; Data Kependudukan</text>
      <text x="32" y="56" fill="#64748B" font-size="11" font-family="Plus Jakarta Sans, sans-serif">Terverifikasi PDDikti Kementerian Pendidikan Tinggi</text>

      <!-- Detail Field Rows -->
      <g transform="translate(32, 80)">
        <!-- Row 1 -->
        <g transform="translate(0, 0)">
          <text x="0" y="16" fill="#94A3B8" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">NOMOR INDUK KEPENDUDUKAN (NIK)</text>
          <text x="0" y="38" fill="#0F172A" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">3471011508020003</text>
          <text x="320" y="16" fill="#94A3B8" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">TEMPAT, TANGGAL LAHIR</text>
          <text x="320" y="38" fill="#0F172A" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Semarang, 15 Agustus 2004</text>
        </g>
        <line x1="0" y1="55" x2="611" y2="55" stroke="#F1F5F9"/>

        <!-- Row 2 -->
        <g transform="translate(0, 70)">
          <text x="0" y="16" fill="#94A3B8" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">JENIS KELAMIN</text>
          <text x="0" y="38" fill="#0F172A" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Laki-laki</text>
          <text x="320" y="16" fill="#94A3B8" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">AGAMA / KEPERCAYAAN</text>
          <text x="320" y="38" fill="#0F172A" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Katolik</text>
        </g>
        <line x1="0" y1="125" x2="611" y2="125" stroke="#F1F5F9"/>

        <!-- Row 3 (Credential: Asal Sekolah) -->
        <g transform="translate(0, 140)">
          <text x="0" y="16" fill="#D48810" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">ASAL SEKOLAH MENENGAH (SMA)</text>
          <text x="0" y="38" fill="#0E2A47" font-size="15" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">SMA Sedes Sapientiae</text>
          <text x="320" y="16" fill="#94A3B8" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">JURUSAN SEKOLAH ASAL</text>
          <text x="320" y="38" fill="#0F172A" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">MIPA (Matematika &amp; IPA)</text>
        </g>
        <line x1="0" y1="195" x2="611" y2="195" stroke="#F1F5F9"/>

        <!-- Row 4 -->
        <g transform="translate(0, 210)">
          <text x="0" y="16" fill="#94A3B8" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">EMAIL KAMPUS MAHASISWA</text>
          <text x="0" y="38" fill="#0E2A47" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">235314003@student.usd.ac.id</text>
          <text x="320" y="16" fill="#94A3B8" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">NOMOR TELEPON / WA</text>
          <text x="320" y="38" fill="#0F172A" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">+62 812-3456-7890</text>
        </g>
        <line x1="0" y1="265" x2="611" y2="265" stroke="#F1F5F9"/>

        <!-- Row 5 -->
        <g transform="translate(0, 280)">
          <text x="0" y="16" fill="#94A3B8" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">ALAMAT DOMISILI SAAT KULIAH</text>
          <text x="0" y="38" fill="#0F172A" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Jl. Paingan No. 42, Maguwoharjo, Depok, Sleman, D.I. Yogyakarta 55282</text>
        </g>
        <line x1="0" y1="335" x2="611" y2="335" stroke="#F1F5F9"/>
      </g>

      <!-- Action Button Download Formulir (Ref: Dua Tombol Bawah Sketsa 6) -->
      <g transform="translate(32, 570)">
        <rect width="611" height="52" rx="14" fill="#0E2A47"/>
        <text x="305" y="32" text-anchor="middle" fill="#FFFFFF" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Unduh Formulir Biodata Resmi &amp; Surat Keterangan Aktif (PDF)</text>
      </g>
    </g>
  </g>
</svg>'''

# ==============================================================================
# 07_krs.svg (KRS Study Plan Table & SKS Quota)
# ==============================================================================
svg_07 = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900" fill="none">
  <rect width="1440" height="900" fill="#F1F5F9"/>
  {get_sidebar_and_header("krs", "Kartu Rencana Studi (KRS)", "Rencana Studi")}

  <g transform="translate(296, 160)">
    <!-- SKS QUOTA HERO BANNER (Ref: Sketsa Kotak 7 Cutout Card Kiri Atas) -->
    <rect width="1080" height="120" rx="20" fill="#0E2A47"/>
    <g transform="translate(32, 22)">
      <text x="0" y="16" fill="#FDE68A" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">BEBAN STUDI SEMESTER 6 GENAP</text>
      <text x="0" y="52" fill="#FFFFFF" font-size="32" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">14 <tspan font-size="18" fill="#94A3B8" font-weight="600">/ 24 Maks SKS</tspan></text>
      
      <!-- Progress Bar (58%) -->
      <rect x="0" y="65" width="400" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
      <rect x="0" y="65" width="233" height="8" rx="4" fill="#F5A623"/>

      <!-- Right Meta Info -->
      <g transform="translate(560, 0)">
        <rect width="450" height="75" rx="14" fill="rgba(255,255,255,0.08)"/>
        <text x="20" y="24" fill="#CBD5E1" font-size="11" font-family="Plus Jakarta Sans, sans-serif">Dosen Pembimbing PA:</text>
        <text x="20" y="44" fill="#FFFFFF" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Prof. Ir. Bambang Soelistijanto, Ph.D.</text>
        <rect x="330" y="20" width="100" height="35" rx="8" fill="#ECFDF5"/>
        <text x="380" y="42" text-anchor="middle" fill="#059669" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">ACC PA</text>
      </g>
    </g>

    <!-- FULL KRS TABLE (1080px wide) -->
    <g transform="translate(0, 145)">
      <rect width="1080" height="530" rx="20" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="32" y="36" fill="#0E2A47" font-size="16" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Daftar Mata Kuliah Terdaftar (Genap 2025/2026)</text>
      
      <!-- Table Header -->
      <g transform="translate(32, 60)">
        <rect width="1016" height="36" rx="8" fill="#F1F5F9"/>
        <text x="20" y="22" fill="#475569" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">NO</text>
        <text x="60" y="22" fill="#475569" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">KODE</text>
        <text x="140" y="22" fill="#475569" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">MATA KULIAH</text>
        <text x="440" y="22" fill="#475569" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">KELAS</text>
        <text x="510" y="22" fill="#475569" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">SKS</text>
        <text x="560" y="22" fill="#475569" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">DOSEN PENGAMPU</text>
        <text x="860" y="22" fill="#475569" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">JADWAL &amp; RUANG</text>
      </g>

      <!-- Row 1: Analisis Proses Bisnis C -->
      <g transform="translate(32, 110)">
        <text x="20" y="30" fill="#64748B" font-size="12" font-family="Plus Jakarta Sans, sans-serif">1</text>
        <text x="60" y="30" fill="#2563EB" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">INF-331</text>
        <text x="140" y="30" fill="#0F172A" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Analisis Proses Bisnis</text>
        <text x="450" y="30" fill="#D48810" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">C</text>
        <text x="520" y="30" fill="#0E2A47" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">3</text>
        <text x="560" y="30" fill="#475569" font-size="12" font-family="Plus Jakarta Sans, sans-serif">Agnes Maria Polina, S.Kom., M.Sc.</text>
        <text x="860" y="24" fill="#0F172A" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Senin, 07:00 - 08:40</text>
        <text x="860" y="38" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif">R.314 St. Robertus (Paingan)</text>
        <line x1="0" y1="50" x2="1016" y2="50" stroke="#F1F5F9"/>
      </g>

      <!-- Row 2: Desain UI/UX A -->
      <g transform="translate(32, 175)">
        <text x="20" y="30" fill="#64748B" font-size="12" font-family="Plus Jakarta Sans, sans-serif">2</text>
        <text x="60" y="30" fill="#0284C7" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">INF-332</text>
        <text x="140" y="30" fill="#0F172A" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Desain UI/UX</text>
        <text x="450" y="30" fill="#D48810" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">A</text>
        <text x="520" y="30" fill="#0E2A47" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">3</text>
        <text x="560" y="30" fill="#475569" font-size="12" font-family="Plus Jakarta Sans, sans-serif">Dr. Ir. Iwan Binanto</text>
        <text x="860" y="24" fill="#0F172A" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Senin, 10:30 - 12:10</text>
        <text x="860" y="38" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Lab Komputer 2 Lt.3 (Paingan)</text>
        <line x1="0" y1="50" x2="1016" y2="50" stroke="#F1F5F9"/>
      </g>

      <!-- Row 3: Pemrograman Perangkat Bergerak B -->
      <g transform="translate(32, 240)">
        <text x="20" y="30" fill="#64748B" font-size="12" font-family="Plus Jakarta Sans, sans-serif">3</text>
        <text x="60" y="30" fill="#9333EA" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">INF-333</text>
        <text x="140" y="30" fill="#0F172A" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Pemrograman Perangkat Bergerak</text>
        <text x="450" y="30" fill="#D48810" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">B</text>
        <text x="520" y="30" fill="#0E2A47" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">3</text>
        <text x="560" y="30" fill="#475569" font-size="12" font-family="Plus Jakarta Sans, sans-serif">Puspaningtyas Sanjoyo Adi, S.T., M.T.</text>
        <text x="860" y="24" fill="#0F172A" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Selasa, 08:45 - 10:25</text>
        <text x="860" y="38" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Lab Pemrograman Lt.2 (Paingan)</text>
        <line x1="0" y1="50" x2="1016" y2="50" stroke="#F1F5F9"/>
      </g>

      <!-- Row 4: Pengukuran dan Analisis Unjuk Kerja Jaringan A -->
      <g transform="translate(32, 305)">
        <text x="20" y="30" fill="#64748B" font-size="12" font-family="Plus Jakarta Sans, sans-serif">4</text>
        <text x="60" y="30" fill="#059669" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">INF-334</text>
        <text x="140" y="30" fill="#0F172A" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Pengukuran &amp; Analisis Unjuk Kerja Jaringan</text>
        <text x="450" y="30" fill="#D48810" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">A</text>
        <text x="520" y="30" fill="#0E2A47" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">3</text>
        <text x="560" y="30" fill="#475569" font-size="12" font-family="Plus Jakarta Sans, sans-serif">Prof. Ir. Bambang Soelistijanto, Ph.D.</text>
        <text x="860" y="24" fill="#0F172A" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Rabu, 07:00 - 08:40</text>
        <text x="860" y="38" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif">R.312 St. Robertus (Paingan)</text>
        <line x1="0" y1="50" x2="1016" y2="50" stroke="#F1F5F9"/>
      </g>

      <!-- Row 5: Metodologi Penelitian A -->
      <g transform="translate(32, 370)">
        <text x="20" y="30" fill="#64748B" font-size="12" font-family="Plus Jakarta Sans, sans-serif">5</text>
        <text x="60" y="30" fill="#D97706" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">INF-335</text>
        <text x="140" y="30" fill="#0F172A" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Metodologi Penelitian</text>
        <text x="450" y="30" fill="#D48810" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">A</text>
        <text x="520" y="30" fill="#0E2A47" font-size="13" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">2</text>
        <text x="560" y="30" fill="#475569" font-size="12" font-family="Plus Jakarta Sans, sans-serif">Prof. Ir. Bambang Soelistijanto, Ph.D.</text>
        <text x="860" y="24" fill="#0F172A" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Kamis, 08:45 - 10:25</text>
        <text x="860" y="38" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif">R.205 Thomas Aquinas (Paingan)</text>
        <line x1="0" y1="50" x2="1016" y2="50" stroke="#F1F5F9"/>
      </g>

      <!-- Bottom Actions -->
      <g transform="translate(32, 450)">
        <rect width="200" height="44" rx="10" fill="#F1F5F9" stroke="#E2E8F0"/>
        <text x="100" y="27" text-anchor="middle" fill="#475569" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Ubah Mata Kuliah</text>

        <rect x="220" y="0" width="220" height="44" rx="10" fill="#0E2A47"/>
        <text x="330" y="27" text-anchor="middle" fill="#FFFFFF" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Cetak Lembar KRS Sah (PDF)</text>
      </g>
    </g>
  </g>
</svg>'''

# ==============================================================================
# 08_ktm_khs.svg (Digital e-KTM + Full KHS Grade Matrix)
# ==============================================================================
svg_08 = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900" fill="none">
  <rect width="1440" height="900" fill="#F1F5F9"/>
  {get_sidebar_and_header("ktm_khs", "e-KTM &amp; Hasil Studi (KHS)", "e-KTM &amp; KHS")}

  <g transform="translate(296, 160)">
    <!-- LEFT 460px: PHYSICAL DIGITAL e-KTM CARD -->
    <g>
      <!-- The Card Base (Ref: Sketsa Kotak 8 Card KTM di Atas) -->
      <rect width="460" height="280" rx="24" fill="#0E2A47" stroke="#F5A623" stroke-width="2"/>
      <circle cx="400" cy="50" r="100" fill="#163B63" opacity="0.6"/>

      <!-- Card Top Brand -->
      <g transform="translate(24, 20)">
        <rect width="36" height="36" rx="8" fill="#FFFFFF"/>
        <image href="data:image/png;base64,{logo_b64}" x="4" y="4" width="28" height="28" preserveAspectRatio="xMidYMid meet"/>
        <text x="46" y="16" fill="#FFFFFF" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">UNIVERSITAS SANATA DHARMA</text>
        <text x="46" y="29" fill="#F5A623" font-size="8" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">KARTU TANDA MAHASISWA • e-KTM</text>
        
        <!-- Gold Chip -->
        <rect x="365" y="4" width="40" height="30" rx="6" fill="#FBBF24" stroke="#D97706"/>
      </g>
      <line x1="24" y1="70" x2="436" y2="70" stroke="rgba(255,255,255,0.15)"/>

      <!-- Card Body: Left Data + Right Photo -->
      <g transform="translate(24, 85)">
        <text x="0" y="12" fill="#94A3B8" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">NAMA MAHASISWA</text>
        <text x="0" y="32" fill="#FFFFFF" font-size="16" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">GERARDO ARDIANTA</text>

        <text x="0" y="60" fill="#94A3B8" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">NIM</text>
        <text x="0" y="80" fill="#F5A623" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">235314003</text>

        <text x="130" y="60" fill="#94A3B8" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">PROGRAM STUDI</text>
        <text x="130" y="80" fill="#FFFFFF" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Informatika (S1)</text>

        <text x="0" y="110" fill="#94A3B8" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">KAMPUS</text>
        <text x="0" y="126" fill="#CBD5E1" font-size="11" font-family="Plus Jakarta Sans, sans-serif">Kampus III Paingan</text>

        <!-- Official Photo Box on Right (Ref: Sketsa Kotak 8 Foto di Sisi Kanan) -->
        <g transform="translate(305, 0)">
          <rect width="105" height="135" rx="12" fill="#163B63" stroke="#F5A623"/>
          <circle cx="52" cy="55" r="24" fill="#0E2A47"/>
          <path d="M22 110c0-20 15-32 30-32s30 12 30 32" fill="#0E2A47"/>
          <text x="52" y="125" text-anchor="middle" fill="#FDE68A" font-size="8" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">USD RESMI</text>
        </g>
      </g>

      <!-- Barcode / Status Strip -->
      <g transform="translate(24, 240)">
        <line x1="0" y1="0" x2="412" y2="0" stroke="rgba(255,255,255,0.15)"/>
        <text x="0" y="24" fill="#CBD5E1" font-size="10" font-family="Courier, monospace" letter-spacing="4">||||| | |||| |||||| || | |||||</text>
        <rect x="300" y="10" width="112" height="20" rx="6" fill="#064E3B"/>
        <text x="356" y="24" text-anchor="middle" fill="#34D399" font-size="9" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">AKTIF 2025/2026</text>
      </g>

      <!-- Quick Action Under Card -->
      <g transform="translate(0, 305)">
        <rect width="460" height="370" rx="20" fill="#FFFFFF" stroke="#E2E8F0"/>
        <text x="24" y="36" fill="#0E2A47" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Validasi Identitas Digital</text>
        
        <g transform="translate(24, 60)">
          <rect width="412" height="60" rx="12" fill="#F8FAFC" stroke="#E2E8F0"/>
          <text x="20" y="25" fill="#475569" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">QR Code Presensi Perpustakaan</text>
          <text x="20" y="44" fill="#94A3B8" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Pindai di gerbang masuk Kampus II &amp; III</text>
          <rect x="310" y="15" width="85" height="30" rx="8" fill="#0E2A47"/>
          <text x="352" y="34" text-anchor="middle" fill="#FFFFFF" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Buka QR</text>
        </g>

        <g transform="translate(24, 135)">
          <rect width="412" height="60" rx="12" fill="#F8FAFC" stroke="#E2E8F0"/>
          <text x="20" y="25" fill="#475569" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Simpan ke Google Wallet / Apple Pay</text>
          <text x="20" y="44" fill="#94A3B8" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Akses offline tanpa koneksi internet</text>
          <rect x="310" y="15" width="85" height="30" rx="8" fill="#F5A623"/>
          <text x="352" y="34" text-anchor="middle" fill="#0E2A47" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Simpan</text>
        </g>

        <!-- Advisor PA Consultation Notes -->
        <g transform="translate(24, 215)">
          <rect width="412" height="130" rx="12" fill="#0E2A47"/>
          <text x="20" y="28" fill="#F5A623" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">CATATAN PEMBIMBING AKADEMIK</text>
          <text x="20" y="52" fill="#FFFFFF" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Prof. Ir. Bambang Soelistijanto, Ph.D.</text>
          <text x="20" y="74" fill="#CBD5E1" font-size="11" font-family="Plus Jakarta Sans, sans-serif">"Pertahankan prestasi akademik semester ini. Fokus pada</text>
          <text x="20" y="90" fill="#CBD5E1" font-size="11" font-family="Plus Jakarta Sans, sans-serif">persiapan usulan topik skripsi bidang jaringan cerdas."</text>
          <text x="20" y="112" fill="#34D399" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">• Status Evaluasi Studi: Sangat Baik</text>
        </g>
      </g>
    </g>

    <!-- RIGHT 600px: FULL KHS REPORT TABLE (Ref: Sketsa Kotak 8 Card Besar Bawah) -->
    <g transform="translate(485, 0)">
      
      <!-- 3 STAT CHIPS -->
      <g>
        <rect x="0" y="0" width="190" height="95" rx="16" fill="#FFFFFF" stroke="#E2E8F0"/>
        <text x="20" y="28" fill="#D97706" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">IP SEMESTER (IPS)</text>
        <text x="20" y="60" fill="#0E2A47" font-size="28" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">3.85</text>
        <text x="20" y="80" fill="#059669" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Sangat Memuaskan</text>

        <rect x="205" y="0" width="190" height="95" rx="16" fill="#FFFFFF" stroke="#E2E8F0"/>
        <text x="225" y="28" fill="#2563EB" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">IPK KUMULATIF</text>
        <text x="225" y="60" fill="#0E2A47" font-size="28" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">3.78</text>
        <text x="225" y="80" fill="#2563EB" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Cum Laude</text>

        <rect x="410" y="0" width="185" height="95" rx="16" fill="#FFFFFF" stroke="#E2E8F0"/>
        <text x="430" y="28" fill="#059669" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">TOTAL SKS LULUS</text>
        <text x="430" y="60" fill="#0E2A47" font-size="28" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">112</text>
        <text x="430" y="80" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Semester 1 - 6</text>
      </g>

      <!-- Grades Table -->
      <g transform="translate(0, 115)">
        <rect width="595" height="560" rx="20" fill="#FFFFFF" stroke="#E2E8F0"/>
        
        <text x="24" y="36" fill="#0E2A47" font-size="15" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Kartu Hasil Studi (KHS) Semester Genap</text>
        <text x="24" y="56" fill="#64748B" font-size="11" font-family="Plus Jakarta Sans, sans-serif">Tahun Akademik 2025/2026 • S1 Informatika</text>

        <!-- Table Header -->
        <g transform="translate(24, 75)">
          <rect width="547" height="32" rx="6" fill="#F1F5F9"/>
          <text x="12" y="20" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">KODE</text>
          <text x="80" y="20" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">MATA KULIAH</text>
          <text x="360" y="20" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">SKS</text>
          <text x="410" y="20" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">NILAI</text>
          <text x="480" y="20" fill="#475569" font-size="10" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">BOBOT</text>
        </g>

        <!-- Row 1 -->
        <g transform="translate(24, 120)">
          <text x="12" y="20" fill="#2563EB" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">INF-331</text>
          <text x="80" y="20" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Analisis Proses Bisnis (C)</text>
          <text x="80" y="35" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Agnes Maria Polina, M.Sc.</text>
          <text x="368" y="22" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">3</text>
          <rect x="405" y="6" width="30" height="24" rx="6" fill="#ECFDF5"/>
          <text x="420" y="22" text-anchor="middle" fill="#059669" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">A</text>
          <text x="495" y="22" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">12.0</text>
          <line x1="0" y1="46" x2="547" y2="46" stroke="#F1F5F9"/>
        </g>

        <!-- Row 2 -->
        <g transform="translate(24, 175)">
          <text x="12" y="20" fill="#0284C7" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">INF-332</text>
          <text x="80" y="20" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Desain UI/UX (A)</text>
          <text x="80" y="35" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Dr. Ir. Iwan Binanto</text>
          <text x="368" y="22" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">3</text>
          <rect x="405" y="6" width="30" height="24" rx="6" fill="#ECFDF5"/>
          <text x="420" y="22" text-anchor="middle" fill="#059669" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">A</text>
          <text x="495" y="22" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">12.0</text>
          <line x1="0" y1="46" x2="547" y2="46" stroke="#F1F5F9"/>
        </g>

        <!-- Row 3 -->
        <g transform="translate(24, 230)">
          <text x="12" y="20" fill="#9333EA" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">INF-333</text>
          <text x="80" y="20" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Pemrograman Bergerak (B)</text>
          <text x="80" y="35" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Puspaningtyas Sanjoyo Adi, M.T.</text>
          <text x="368" y="22" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">3</text>
          <rect x="405" y="6" width="30" height="24" rx="6" fill="#DBEAFE"/>
          <text x="420" y="22" text-anchor="middle" fill="#1D4ED8" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">A-</text>
          <text x="495" y="22" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">11.25</text>
          <line x1="0" y1="46" x2="547" y2="46" stroke="#F1F5F9"/>
        </g>

        <!-- Row 4 -->
        <g transform="translate(24, 285)">
          <text x="12" y="20" fill="#059669" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">INF-334</text>
          <text x="80" y="20" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Analisis Kinerja Jaringan (A)</text>
          <text x="80" y="35" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Prof. Ir. Bambang Soelistijanto</text>
          <text x="368" y="22" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">3</text>
          <rect x="405" y="6" width="30" height="24" rx="6" fill="#ECFDF5"/>
          <text x="420" y="22" text-anchor="middle" fill="#059669" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">A</text>
          <text x="495" y="22" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">12.0</text>
          <line x1="0" y1="46" x2="547" y2="46" stroke="#F1F5F9"/>
        </g>

        <!-- Row 5 -->
        <g transform="translate(24, 340)">
          <text x="12" y="20" fill="#D97706" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">INF-335</text>
          <text x="80" y="20" fill="#0F172A" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Metodologi Penelitian (A)</text>
          <text x="80" y="35" fill="#64748B" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Prof. Ir. Bambang Soelistijanto</text>
          <text x="368" y="22" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">2</text>
          <rect x="405" y="6" width="30" height="24" rx="6" fill="#DBEAFE"/>
          <text x="420" y="22" text-anchor="middle" fill="#1D4ED8" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">A-</text>
          <text x="495" y="22" fill="#0E2A47" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">7.5</text>
          <line x1="0" y1="46" x2="547" y2="46" stroke="#F1F5F9"/>
        </g>

        <!-- Summary Footer -->
        <g transform="translate(24, 400)">
          <rect width="547" height="40" rx="8" fill="#F8FAFC" stroke="#E2E8F0"/>
          <text x="20" y="25" fill="#475569" font-size="11" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">Total SKS: <tspan font-weight="900" fill="#0E2A47">14 SKS</tspan></text>
          <text x="527" y="25" text-anchor="end" fill="#059669" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">Indeks Prestasi Semester: 3.85</text>
        </g>

        <!-- Download Action Button -->
        <g transform="translate(24, 475)">
          <rect width="547" height="48" rx="12" fill="#0E2A47"/>
          <text x="273" y="30" text-anchor="middle" fill="#FFFFFF" font-size="12" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">Cetak Transkrip &amp; KHS Sah Tanda Tangan Digital BAA (PDF)</text>
        </g>
      </g>
    </g>
  </g>
</svg>'''

# Write individual SVGs
svg_files = [
    ("01_login.svg", svg_01),
    ("02_dashboard.svg", svg_02),
    ("03_pengumuman.svg", svg_03),
    ("04_jadwal.svg", svg_04),
    ("05_tagihan.svg", svg_05),
    ("06_biodata.svg", svg_06),
    ("07_krs.svg", svg_07),
    ("08_ktm_khs.svg", svg_08)
]

for fname, content in svg_files:
    target = os.path.join(svg_dir, fname)
    with open(target, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Generated {fname} ({os.path.getsize(target)} bytes)")

print("All 8 individual desktop SVGs successfully generated.")
