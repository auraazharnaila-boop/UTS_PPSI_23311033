# Lampung Smart Waste - Sistem Smart City Pengelolaan Sampah Kota Bandar Lampung

Aplikasi web modern **Lampung Smart Waste** dikembangkan untuk memudahkan masyarakat melaporkan permasalahan sampah dan memfasilitasi Dinas Lingkungan Hidup (DLH) Pemerintah Kota Bandar Lampung dalam memantau, memverifikasi, serta mendisposisikan penanganan sampah secara cepat, transparan, dan terintegrasi.

---

## 👥 Tim Pengembang & Hak Cipta
- **Pengembang:** Aura Azhar Naila
- **Dosen Pembimbing:** Dr. Erliyan Redy Susanto, M.Kom
- **Institusi:** Universitas Teknokrat Indonesia & Dinas Lingkungan Hidup Kota Bandar Lampung
- **Footer Resmi:**
  `Copyright©2026 by Aura Azhar Naila dan Dr. Erliyan Redy Susanto, M.Kom`

---

## 🗂️ Struktur Berkas Proyek (Sesuai Standar PPSI)
```
Lampung-Smart-Waste/
├── assets/
│   ├── logo-bandarlampung.jpg    # Logo resmi Lambang Daerah Pemkot Bandar Lampung
│   └── logo-teknokrat.png        # Logo resmi Universitas Teknokrat Indonesia
├── app.js                        # Logika frontend, state management, Leaflet GIS, & Charts
├── customer.html                 # Portal khusus Warga / Pelapor Masyarakat
├── database.sql                  # Skema database PostgreSQL (DDL, UUID, Index & Seed)
├── database_store.json           # Data penyimpanan persisten otomatis server
├── Design.md                     # Panduan Desain UI/UX & Tailwind Design System
├── index.html                    # Master Hub (Masyarakat, Petugas Kebersihan, Administrator)
├── manifest.json                 # Web App Manifest PWA
├── package.json                  # Konfigurasi dependensi Node.js / Express
├── PRD.md                        # Product Requirement Document (PRD v1.0)
├── server.js                     # REST API Backend Server (17 Endpoint PRD)
├── style.css                     # Stylesheet terstandarisasi (#006B2C, #0051D5, #FAF8FF)
├── sw.js                         # Service Worker PWA (Offline cache & sync)
├── VIBECODING.md                 # Log pengerjaan & panduan Vibe Coding
└── README.md                     # Petunjuk instalasi dan operasional
```

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi dibangun agar dapat dijalankan secara instan dengan runtime **Node.js**:

### 1. Jalankan Server Backend
Buka terminal pada folder proyek:
```bash
node server.js
```
*(Atau `npm start`)*

Server akan langsung aktif pada port `3000` dengan output:
```
🌿 Lampung Smart Waste Server is running on port 3000
📡 URL Master:    http://localhost:3000
👥 Portal Warga:  http://localhost:3000/customer.html
🔐 Admin Control: http://localhost:3000 (Switch to Admin)
```

### 2. Buka di Peramban Web (Browser)
- **Master Hub (Semua Role):** [http://localhost:3000](http://localhost:3000)
- **Portal Khusus Warga:** [http://localhost:3000/customer.html](http://localhost:3000/customer.html)

---

## 🔑 Akun & Kredensial Pengujian (Demo Akun)

Tersedia tombol pemilih mode peran instan (**Mode Tampilan**) pada pojok kiri atas aplikasi, atau masuk menggunakan kredensial:

| Peran Pengguna | Email | Kata Sandi | Deskripsi |
| :--- | :--- | :--- | :--- |
| **Masyarakat (Warga)** | `warga@lampung.go.id` | `warga123` | Buat laporan cepat (stepper), upload foto, cek poin & jadwal truk DLH |
| **Petugas Kebersihan** | `petugas@dlh.bandarlampungkota.go.id` | `petugas123` | Armada ARM-DLH-07, rute GPS, checklist APD, upload foto bukti selesai |
| **Administrator DLH** | `admin@dlh.bandarlampungkota.go.id` | `admin123` | Pusat Kendali, 4 grafik eksekutif, verifikasi cepat, disposisi petugas |

---

## 🗄️ Konfigurasi PostgreSQL (Opsional)
Jika ingin menggunakan PostgreSQL secara langsung:
1. Buat database:
   ```sql
   CREATE DATABASE lampung_smart_waste;
   ```
2. Impor skema tabel dan indeks:
   ```bash
   psql -U postgres -d lampung_smart_waste -f database.sql
   ```

---

## 🌟 Fitur Utama Sesuai PRD & Desain

1. **Desain Smart City & Identitas:**
   - Palet warna: Hijau DLH (`#006B2C`), Biru Smart City (`#0051D5`), Abu Lembut (`#FAF8FF`).
   - Logo resmi berdampingan: Pemkot Bandar Lampung & Universitas Teknokrat Indonesia.
   - Jam digital real-time Waktu Indonesia Barat (WIB).
   - Akses cepat panggilan darurat DLH 112.
2. **Pelaporan Stepper 4 Tahap:**
   - Tahap 1: Pemilihan kartu radio kategori sampah (Liar, Organik, Plastik, B3, Puing, Pasar).
   - Tahap 2: Judul, estimasi volume sampah, deskripsi, opsi anonim.
   - Tahap 3: Unggah foto bukti (drag & drop dengan preview langsung).
   - Tahap 4: Geolokasi otomatis atau pinpoint titik peta Bandar Lampung.
3. **Peta Interaktif Leaflet GIS:**
   - Menampilkan sebaran titik sampah di Bandar Lampung (Raden Intan, Bambu Kuning, Kedaton, Sukarame, Way Halim, Teluk Betung).
   - Penanda membedakan status aktif (biru) dan selesai dibersihkan (hijau).
4. **Pusat Kendali Eksekutif Admin:**
   - 4 Metrik KPI Utama Kota.
   - 4 Grafik Analitik (Tren Bulanan, 5 Kecamatan Teratas, Distribusi Donat Status, Komposisi Jenis Sampah).
   - Antrean Verifikasi Cepat (Terima, Tolak dengan Catatan, Disposisi Petugas).
5. **Dukungan PWA (Progressive Web App):**
   - Mendukung instalasi aplikasi di layar utama (Add to Home Screen).
   - Cache offline menggunakan Service Worker (`sw.js`).

