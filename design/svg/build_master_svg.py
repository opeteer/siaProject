#!/usr/bin/env python3
import os
import re

svg_dir = "/home/opeteer/figmaExp/siaBrowser/svg"
actual_files = sorted([f for f in os.listdir(svg_dir) if f.endswith('.svg') and not f.startswith('all')])

print('Available Desktop SVGs:', actual_files)

canvas_width = 6160
canvas_height = 2160

combined = [
    f'<svg xmlns="http://www.w3.org/2000/svg" width="{canvas_width}" height="{canvas_height}" viewBox="0 0 {canvas_width} {canvas_height}" fill="none">',
    f'  <rect width="{canvas_width}" height="{canvas_height}" fill="#0A0F1D"/>',
    '  <!-- Master Canvas Title Bar -->',
    '  <g transform="translate(80, 50)">',
    '    <text x="0" y="24" fill="#FFFFFF" font-size="28" font-family="Plus Jakarta Sans, sans-serif" font-weight="900">SIA USD Web Browser - Master Design System Canvas (Desktop 1440 × 900 px)</text>',
    '    <text x="0" y="50" fill="#F5A623" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="700">8 Artboard Desktop &amp; Responsif • Mahasiswa: Gerardo Ardianta (235314003) • Universitas Sanata Dharma</text>',
    '  </g>'
]

positions = [
    # Row 1 (4 screens)
    (80, 140),
    (1600, 140),
    (3120, 140),
    (4640, 140),
    # Row 2 (4 screens)
    (80, 1160),
    (1600, 1160),
    (3120, 1160),
    (4640, 1160),
]

names = [
    '01. Login Portal SSO USD (Desktop 1440 × 900)',
    '02. Dashboard Mahasiswa (Desktop 1440 × 900)',
    '03. Pengumuman & Agenda BAA (Desktop 1440 × 900)',
    '04. Matriks Jadwal Kuliah Mingguan (Desktop 1440 × 900)',
    '05. Keuangan & SPP Mahasiswa (Desktop 1440 × 900)',
    '06. Biodata & Profil Mahasiswa (Desktop 1440 × 900)',
    '07. Kartu Rencana Studi / KRS (Desktop 1440 × 900)',
    '08. e-KTM & Kartu Hasil Studi / KHS (Desktop 1440 × 900)'
]

for idx, fname in enumerate(actual_files):
    if idx >= len(positions):
        break
    x, y = positions[idx]
    title = names[idx].replace('&', '&amp;')
    with open(os.path.join(svg_dir, fname), 'r', encoding='utf-8') as fp:
        raw = fp.read()
    match = re.search(r'<svg[^>]*>(.*)</svg>', raw, re.DOTALL)
    inner = match.group(1) if match else raw
    combined.append(f'  <g id="Desktop_Artboard_{idx+1}" transform="translate({x}, {y})">')
    combined.append(f'    <text x="0" y="-16" fill="#94A3B8" font-size="14" font-family="Plus Jakarta Sans, sans-serif" font-weight="800">{title}</text>')
    combined.append(f'    {inner}')
    combined.append('  </g>')

combined.append('</svg>')

target_path = os.path.join(svg_dir, 'all_desktop_canvas.svg')
with open(target_path, 'w', encoding='utf-8') as out:
    out.write('\n'.join(combined))

print(f"Master canvas SVG successfully created at {target_path} (size: {os.path.getsize(target_path)} bytes)")
