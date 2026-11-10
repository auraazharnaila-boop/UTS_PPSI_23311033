# VIBE CODING LOG & SPECIFICATION: LAMPUNG SMART WASTE

Aplikasi Smart City **Lampung Smart Waste** dikembangkan dengan pendekatan **Vibe Coding** berstandar industri oleh Senior Full-Stack Developer & AI Coding Agent untuk Pemerintah Kota Bandar Lampung dan Universitas Teknokrat Indonesia.

---

## 1. Identitas Proyek & Hak Cipta
- **Nama Aplikasi:** Lampung Smart Waste (Sistem Pelaporan dan Pengelolaan Sampah Digital Kota Bandar Lampung)
- **Mitra & Afiliasi:**
  - Pemerintah Kota Bandar Lampung (Dinas Lingkungan Hidup / DLH)
  - Universitas Teknokrat Indonesia
- **Footer Wajib:**
  > "Copyright©2026 by Aura Azhar Naila dan Dr. Erliyan Redy Susanto, M.Kom"

---

## 2. Arsitektur & Struktur Proyek (PPSI Standard)
Sesuai standar perkuliahan PPSI Universitas Teknokrat Indonesia:
```
Lampung-Smart-Waste/
├── assets/
│   ├── logo-bandarlampung.jpg    # Logo resmi Lambang Daerah Pemkot Bandar Lampung
│   └── logo-teknokrat.png        # Logo resmi Universitas Teknokrat Indonesia
├── app.js                        # Logika frontend, state management, Leaflet GIS, & Charts
├── customer.html                 # Portal khusus Masyarakat / Pelapor Warga
├── Design.md                     # Panduan Desain UI/UX & Tailwind Design System
├── index.html                    # Master Hub (Masyarakat, Petugas Kebersihan, Administrator)
├── manifest.json                 # Web App Manifest PWA
├── package.json                  # Konfigurasi dependensi Node.js / Express
├── PRD.md                        # Product Requirement Document versi lengkap
├── server.js                     # REST API Backend (17 Endpoints PRD, Auth, Reports, GIS)
├── style.css                     # Desain sistem responsif (Palet #006B2C, #0051D5, #FAF8FF)
├── sw.js                         # Service Worker PWA (offline caching & background sync)
└── VIBECODING.md                 # Dokumentasi Vibe Coding, panduan & log pengerjaan
```

---

## 3. Fitur Utama & Matriks Hak Akses (3 Peran)

### A. Masyarakat (Warga Pelapor)
- Registrasi dan login dengan autentikasi.
- **Buat Laporan Cepat:**
  - Stepper 4 tahap (Klasifikasi Kategori, Deskripsi Permasalahan, Upload Foto Bukti, Titik Koordinat Peta Bandar Lampung).
  - Pilihan kategori: Sampah Organik, Anorganik / Plastik, Limbah B3, Sampah Liar Jalanan, Puing Bangunan, Sampah Pasar/Komersial.
  - Opsi laporan anonim.
- **Dashboard Warga:**
  - 4 Kartu KPI: Total Laporan Saya, Diproses, Selesai, Ditolak.
  - Tabel Laporan Terkini dengan nomor tiket unik format `LSW-2026-XXX`.
  - Peta sebaran titik laporan wilayah Bandar Lampung (Leaflet GIS).
  - Saldo Poin Warga Bersih & Jadwal Truk Angkut DLH (pagi 06:00-09:00, sore 16:00-18:30).
  - Edukasi 3R (Pilah Sampah).

### B. Petugas Kebersihan (Operasional Lapangan)
- Login Petugas Kebersihan & status armada aktif.
- 4 Kartu KPI Tugas: Total Tugas, Tugas Baru, Sedang Dikerjakan, Tugas Selesai.
- Antrean Tugas Lapangan dengan detail foto pelapor, alamat, dan catatan admin.
- Rute GPS & titik waypoint penanganan.
- Checklist APD & keselamatan kerja (Rompi, Sarung Tangan, Sepatu Boot, Masker).
- Form pembaruan status & **Unggah Bukti Penanganan (Sebelum & Sesudah)**.

### C. Administrator (Pusat Kendali DLH Smart City)
- Executive top bar & 4 KPI metrik kinerja kota (Total Aduan, Tingkat Penyelesaian %, Waktu Respon Rata-rata, Armada Aktif).
- Peta GIS & Live Heatmap insiden sampah Kota Bandar Lampung.
- 4 Grafik Analitik Eksekutif:
  1. Tren Laporan Bulanan (Januari - November 2026).
  2. Top 5 Kecamatan Terbanyak (Tanjung Karang Pusat, Kedaton, Teluk Betung Selatan, Sukarame, Way Halim).
  3. Distribusi Status Laporan (Selesai, Penanganan, Verifikasi, Ditolak).
  4. Komposisi Kategori Jenis Sampah.
- Antrean Verifikasi Cepat (Terima/Verifikasi, Minta Perbaikan, Tolak dengan Catatan).
- Disposisi & Penugasan Petugas Kebersihan.
- Manajemen Pengguna & Manajemen Kategori Sampah.

---

## 4. Alur Transisi Status Laporan (State Machine)
Sesuai PRD Bab 8:
```
[Menunggu Verifikasi]
       │
       ├───> [Ditolak] (Alasan wajib diisi)
       ├───> [Perlu Perbaikan]
       │
       v
 [Terverifikasi]
       │ (Admin menetapkan petugas)
       v
  [Ditugaskan]
       │ (Petugas memulai pekerjaan)
       v
[Dalam Penanganan]
       │ (Petugas mengunggah bukti sebelum-sesudah)
       v
   [Selesai]
       │ (Admin meninjau dan menutup)
       v
   [Ditutup]
```

---

## 5. Design System & Token Warna
Berdasarkan `Design.md`:
- `Primary Green`: `#006B2C` (Identitas lingkungan & aksi utama)
- `Primary Container`: `#00873A` (Navigasi aktif)
- `Secondary Blue`: `#0051D5` (Informasi, status proses & tautan)
- `Tertiary Green`: `#1C6938` (Status sukses & selesai)
- `Background / Surface`: `#FAF8FF`
- `Surface Container Lowest`: `#FFFFFF` (Kartu & panel)
- `Text Primary`: `#131B2E`
- `Error`: `#BA1A1A`
- Tipografi: **Inter** (Google Fonts)
- Ikon: **Material Symbols Outlined** (Google Fonts) & FontAwesome/SVG

---

## 6. Cara Menjalankan Aplikasi
1. Jalankan `npm install` (atau langsung jalankan server karena backend menggunakan modul bawaan):
   ```bash
   node server.js
   ```
2. Buka browser pada alamat:
   - **Master Hub (Semua Role):** `http://localhost:3000`
   - **Portal Khusus Warga:** `http://localhost:3000/customer.html`
3. Akun Pengujian Cepat:
   - **Masyarakat:** `warga@lampung.go.id` / `warga123`
   - **Petugas:** `petugas@dlh.bandarlampungkota.go.id` / `petugas123`
   - **Admin:** `admin@dlh.bandarlampungkota.go.id` / `admin123`
   *(Atau gunakan tombol switcher instan pada header/sidebar aplikasi).*

