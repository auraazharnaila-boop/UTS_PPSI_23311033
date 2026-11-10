PRODUCT REQUIREMENT DOCUMENT LAMPUNG SMART WASTE

Sistem Pelaporan dan Penanganan Sampah Berbasis Digital

|  \| \|

| --- \| --- \|

Versi 1.0 \| 10 November 2026

Draf kebutuhan awal untuk validasi pemangku kepentingan

# Catatan Identitas dan Penggunaan Logo

Gambar pada sampul saat ini adalah placeholder posisi, bukan reproduksi
logo resmi. Sebelum dokumen dipublikasikan atau digunakan secara resmi,
ganti kedua gambar tersebut dengan berkas logo resmi beresolusi tinggi
yang telah disetujui Pemerintah Kota Bandar Lampung dan Universitas
Teknokrat Indonesia. Pertahankan proporsi, warna, dan bentuk logo sesuai
pedoman masing-masing institusi.

Rujukan lambang daerah: Peraturan Daerah Kota Bandar Lampung Nomor 09
Tahun 2012 tentang Lambang Daerah. Logo Universitas Teknokrat Indonesia
perlu dikonfirmasi menggunakan aset resmi terkini dari universitas.

# Riwayat Dokumen

| Elemen \| Keterangan \|

| --- \| --- \|

| Nama produk \| Lampung Smart Waste \|

| Jenis dokumen \| Product Requirement Document (PRD) \|

| Versi \| 1.0 \|

| Tanggal \| 10 November 2026 \|

| Status \| Draf untuk validasi \|

| Platform \| Aplikasi web responsif \|

| Backend \| Rust \|

| Database \| PostgreSQL \|

| API \| REST API \|

# Daftar Isi

1.  Gambaran Proyek dan Latar Belakang

2.  Tujuan dan Ruang Lingkup

3.  Target Pengguna dan Hak Akses

4.  User Stories

5.  Kebutuhan Fungsional

6.  Kebutuhan Nonfungsional

7.  Fitur Aplikasi

8.  Alur Sistem

9.  Rancangan Database

10. Kebutuhan API

11. Keamanan dan Privasi

12. Asumsi, Batasan, dan Risiko

13. Kriteria Keberhasilan dan Pengujian

14. Tahapan Pengembangan

15. Identitas dan Footer

# 1. Gambaran Proyek dan Latar Belakang

Lampung Smart Waste adalah aplikasi pengelolaan laporan permasalahan
sampah di wilayah Kota Bandar Lampung. Aplikasi menghubungkan masyarakat
sebagai pelapor, petugas kebersihan sebagai pelaksana penanganan, dan
administrator sebagai pengelola operasional. Sistem mencatat proses
sejak laporan dibuat hingga ditangani dan ditutup.

Permasalahan sampah perkotaan membutuhkan kanal pelaporan yang mudah
diakses serta koordinasi penanganan yang dapat dipantau. Pelaporan
melalui kanal yang tersebar dapat menyulitkan pencatatan, verifikasi,
distribusi tugas, dan pelacakan penyelesaian. Aplikasi ini menyediakan
pencatatan terpusat dan data dasar untuk evaluasi.

# 2. Tujuan dan Ruang Lingkup

## 2.1 Tujuan

Memudahkan masyarakat mengirim laporan sampah disertai deskripsi,
lokasi, dan foto.

Menyediakan antrean laporan untuk diverifikasi dan ditugaskan
administrator.

Membantu petugas melihat tugas dan memperbarui progres penanganan.

Memberikan informasi status laporan kepada masyarakat.

Menyediakan ringkasan data operasional bagi administrator.

## 2.2 Ruang Lingkup MVP

Registrasi, login, dan hak akses berbasis peran.

Pembuatan laporan dengan kategori, deskripsi, lokasi, dan foto opsional.

Daftar laporan masyarakat beserta status dan riwayat.

Verifikasi laporan dan penugasan petugas oleh administrator.

Daftar tugas petugas, pembaruan status, dan bukti penanganan.

Dashboard ringkas, pencarian/filter laporan, dan pengelolaan
pengguna/kategori.

Notifikasi di dalam aplikasi untuk perubahan penting.

## 2.3 Di Luar Ruang Lingkup MVP

Pembayaran atau transaksi komersial.

Integrasi IoT, sensor tempat sampah, dan GPS kendaraan langsung.

Optimasi rute otomatis atau klasifikasi foto berbasis AI.

Gamifikasi, poin hadiah, atau marketplace daur ulang.

Integrasi sistem eksternal pemerintah sebelum ada persetujuan dan
spesifikasi teknis.

# 3. Target Pengguna dan Hak Akses

| Peran \| Kebutuhan \| Hak akses utama \|

| --- \| --- \| --- \|

| Masyarakat \| Melaporkan sampah dan mengetahui tindak lanjut. \|
  Registrasi/login; membuat laporan; melihat laporan sendiri; memantau
  status/riwayat; mengelola profil. \|

| Petugas kebersihan \| Menerima dan menyelesaikan tugas lapangan. \|
  Melihat tugas yang ditugaskan; memperbarui status sesuai tahapan;
  mengunggah bukti dan catatan. \|

| Administrator \| Mengelola operasional aplikasi. \| Mengelola
  akun/peran dan kategori; memverifikasi laporan; menetapkan petugas;
  melihat/filter semua laporan; melihat dashboard dan audit. \|

Prinsip akses: masyarakat hanya membaca laporan miliknya; petugas hanya
mengelola penugasan miliknya; administrator memiliki akses operasional
sesuai kebijakan. Semua pemeriksaan izin wajib dilakukan di backend.

# 4. User Stories

| ID \| Peran \| User story \| Manfaat \|

| --- \| --- \| --- \| --- \|

| US-01 \| Masyarakat \| Saya ingin mendaftar dan masuk. \| Menggunakan
  layanan dengan akun sendiri. \|

| US-02 \| Masyarakat \| Saya ingin mengirim laporan dengan lokasi dan
  foto. \| Petugas mendapat informasi yang cukup. \|

| US-03 \| Masyarakat \| Saya ingin melihat status dan riwayat laporan
  saya. \| Mengetahui perkembangan penanganan. \|

| US-04 \| Petugas \| Saya ingin melihat tugas yang ditugaskan kepada
  saya. \| Menentukan pekerjaan yang perlu dilakukan. \|

| US-05 \| Petugas \| Saya ingin memperbarui status dan mengunggah
  bukti. \| Progres penanganan tercatat. \|

| US-06 \| Administrator \| Saya ingin memverifikasi dan menetapkan
  petugas. \| Laporan diproses secara terarah. \|

| US-07 \| Administrator \| Saya ingin mencari dan memfilter laporan. \|
  Memantau beban dan progres. \|

| US-08 \| Administrator \| Saya ingin mengelola akun dan kategori. \|
  Data aplikasi tetap tertib. \|

| US-09 \| Semua \| Saya ingin menerima notifikasi perubahan penting. \|
  Tidak melewatkan informasi. \|

# 5. Kebutuhan Fungsional

| ID \| Kebutuhan \| Prioritas \| Kriteria penerimaan \|

| --- \| --- \| --- \| --- \|

| FR-01 \| Registrasi, login, logout, dan sesi pengguna. \| Must \| Akun
  valid dapat masuk; kredensial salah ditolak. \|

| FR-02 \| RBAC untuk tiga peran. \| Must \| Akses lintas peran yang
  tidak sah ditolak. \|

| FR-03 \| Masyarakat membuat laporan: kategori, deskripsi,
  alamat/koordinat, foto opsional. \| Must \| Tersimpan dengan nomor
  tiket dan status Menunggu Verifikasi. \|

| FR-04 \| Masyarakat melihat daftar/detail laporan sendiri. \| Must \|
  Tidak dapat membaca laporan pengguna lain. \|

| FR-05 \| Admin memverifikasi, menolak dengan alasan, atau meminta
  perbaikan. \| Must \| Keputusan, pelaku, dan waktu tercatat. \|

| FR-06 \| Admin menugaskan laporan terverifikasi ke petugas. \| Must \|
  Tugas muncul pada akun petugas yang ditunjuk. \|

| FR-07 \| Petugas memperbarui status tugas sesuai transisi. \| Must \|
  Perubahan menyimpan waktu dan pelaku. \|

| FR-08 \| Petugas mengunggah foto bukti dan catatan penyelesaian. \|
  Must \| Lampiran terhubung dengan laporan yang benar. \|

| FR-09 \| Masyarakat melihat status terkini dan linimasa. \| Must \|
  Riwayat tersusun berdasarkan waktu. \|

| FR-10 \| Admin mencari/filter laporan. \| Must \| Filter status,
  kategori, tanggal, dan petugas tersedia. \|

| FR-11 \| Dashboard ringkas jumlah laporan per status/periode. \|
  Should \| Ringkasan tampil sesuai data. \|

| FR-12 \| Notifikasi dalam aplikasi. \| Should \| Pelapor/petugas
  menerima notifikasi perubahan penting. \|

| FR-13 \| Admin mengaktifkan/menonaktifkan akun dan kategori. \| Should
  \| Riwayat laporan tidak terhapus. \|

# 6. Kebutuhan Nonfungsional

| Aspek \| Persyaratan \|

| --- \| --- \|

| Kinerja \| Target awal 95% permintaan API umum selesai ≤2 detik pada
  beban normal yang disepakati. \|

| Ketersediaan \| Target awal 99% per bulan di luar pemeliharaan
  terjadwal. \|

| Skalabilitas \| Indeks dan pagination mendukung pertumbuhan data
  laporan. \|

| Keandalan \| Transaksi konsisten; kegagalan unggah tidak meninggalkan
  data lampiran yang tidak valid. \|

| Kemudahan penggunaan \| Antarmuka responsif, bahasa Indonesia,
  formulir ringkas, pesan kesalahan jelas. \|

| Kompatibilitas \| Mendukung peramban modern pada desktop dan ponsel.
  \|

| Pemeliharaan \| Kode Rust modular, konfigurasi environment, migrasi
  database, dan dokumentasi API. \|

| Aksesibilitas \| Label input jelas, kontras memadai, navigasi keyboard
  dasar, teks alternatif. \|

| Pencadangan \| Backup terjadwal dan prosedur restore diuji. \|

| Auditabilitas \| Verifikasi, penugasan, perubahan status, dan
  pengelolaan akun memiliki jejak audit. \|

# 7. Fitur Aplikasi

## 7.1 Masyarakat

Beranda dan ringkasan laporan sendiri.

Form laporan: kategori, uraian, alamat/lokasi, koordinat opsional, foto
opsional.

Daftar laporan dengan nomor tiket, tanggal, dan status.

Detail laporan dan riwayat status.

Profil dan pengaturan akun dasar.

## 7.2 Petugas Kebersihan

Daftar tugas aktif dan riwayat tugas.

Detail laporan, lokasi, foto pelapor, dan catatan admin.

Pembaruan status: Ditugaskan, Dalam Penanganan, Selesai.

Unggah bukti foto dan catatan penanganan.

## 7.3 Administrator

Dashboard jumlah laporan berdasarkan status.

Daftar laporan dengan pencarian dan filter.

Verifikasi/penolakan dengan alasan.

Penugasan atau pengalihan petugas.

Manajemen pengguna, kategori, dan status akun.

Riwayat aktivitas dan detail laporan.

# 8. Alur Sistem

## 8.1 Alur Laporan

Masyarakat login dan mengisi formulir laporan.

Backend memvalidasi data/file; laporan disimpan dengan status Menunggu
Verifikasi.

Administrator memeriksa laporan. Jika belum memenuhi syarat, laporan
diminta diperbaiki atau ditolak dengan alasan.

Jika valid, administrator mengubah status menjadi Terverifikasi dan
menetapkan petugas.

Petugas melihat tugas dan mengubah status menjadi Dalam Penanganan saat
pekerjaan dimulai.

Petugas mengunggah bukti serta catatan, lalu mengajukan status Selesai.

Sistem menyimpan riwayat dan memberi notifikasi. Administrator dapat
meninjau bukti dan menutup laporan.

## 8.2 Status Laporan

| Status \| Makna \| Pengubah \|

| --- \| --- \| --- \|

| Menunggu Verifikasi \| Laporan baru masuk. \| Sistem \|

| Perlu Perbaikan \| Informasi perlu dilengkapi. \| Administrator \|

| Ditolak \| Tidak dapat diproses; alasan wajib. \| Administrator \|

| Terverifikasi \| Valid dan siap ditugaskan. \| Administrator \|

| Ditugaskan \| Petugas ditentukan. \| Administrator \|

| Dalam Penanganan \| Petugas sedang menangani. \| Petugas \|

| Selesai \| Petugas menyatakan pekerjaan selesai dan mengirim bukti. \|
  Petugas \|

| Ditutup \| Proses telah ditinjau dan berakhir. \| Administrator \|

Backend harus memvalidasi transisi status; pengguna tidak boleh bebas
mengubah status hanya dengan mengirim nilai dari antarmuka.

# 9. Rancangan Database

PostgreSQL digunakan sebagai basis data relasional. Rekomendasi: UUID
sebagai primary key, timestamptz untuk waktu, foreign key untuk relasi,
CHECK constraint untuk nilai status/role, dan indeks untuk kolom
pencarian.

| Tabel \| Kolom utama \| Keterangan \|

| --- \| --- \| --- \|

| users \| id UUID PK, full_name, email UNIQUE, phone, password_hash,
  role, is_active, created_at, updated_at \| Akun tiga peran. \|

| waste_categories \| id UUID PK, name, description, is_active,
  created_at \| Kategori laporan. \|

| reports \| id UUID PK, ticket_number UNIQUE, reporter_id FK,
  category_id FK, description, address, latitude, longitude, status,
  created_at, updated_at \| Data laporan; koordinat opsional. \|

| report_attachments \| id UUID PK, report_id FK, uploaded_by FK,
  file_path, mime_type, file_size, attachment_type, created_at \|
  Metadata foto laporan/bukti. \|

| assignments \| id UUID PK, report_id FK, officer_id FK, assigned_by
  FK, assigned_at, assignment_status, notes \| Riwayat penugasan. \|

| status_histories \| id UUID PK, report_id FK, changed_by FK NULL,
  old_status, new_status, note, created_at \| Riwayat perubahan status.
  \|

| notifications \| id UUID PK, user_id FK, report_id FK NULL, title,
  message, read_at, created_at \| Notifikasi aplikasi. \|

| audit_logs \| id UUID PK, actor_id FK NULL, action, entity_type,
  entity_id, metadata JSONB, created_at \| Audit aktivitas penting. \|

## 9.1 Relasi dan Aturan Data

users (masyarakat) 1:N reports melalui reporter_id; kategori 1:N
reports.

reports 1:N report_attachments, assignments, dan status_histories.

users (petugas) 1:N assignments; users 1:N notifications dan audit_logs.

Email dinormalisasi huruf kecil dan unik; ticket_number dibuat unik
backend.

Latitude -90..90 dan longitude -180..180.

Indeks: users(email), reports(ticket_number),
reports(status,created_at), reports(reporter_id,created_at),
assignments(officer_id,assignment_status),
status_histories(report_id,created_at).

File foto disimpan di penyimpanan file/object storage; PostgreSQL
menyimpan metadata dan referensi file.

Gunakan soft-disable untuk akun/kategori yang telah memiliki histori;
hindari penghapusan permanen laporan operasional.

# 10. Kebutuhan API

REST API menggunakan prefix /api/v1, JSON, autentikasi berbasis sesi
atau token yang aman, serta kode HTTP standar. Seluruh endpoint kecuali
endpoint publik yang ditentukan memerlukan autentikasi.

| Method & endpoint \| Akses \| Fungsi \|

| --- \| --- \| --- \|

| POST /auth/register \| Publik \| Membuat akun masyarakat; role
  ditentukan sistem. \|

| POST /auth/login \| Publik \| Autentikasi. \|

| POST /auth/logout \| Semua \| Mengakhiri sesi/mencabut refresh token.
  \|

| GET /me \| Semua \| Profil pengguna login. \|

| POST /reports \| Masyarakat \| Membuat laporan. \|

| GET /reports/mine \| Masyarakat \| Daftar laporan sendiri. \|

| GET /reports/{id} \| Pemilik/petugas terkait/admin \| Detail sesuai
  hak akses. \|

| GET /officer/assignments \| Petugas \| Daftar tugas petugas login. \|

| PATCH /assignments/{id}/status \| Petugas terkait \| Perbarui status
  tugas. \|

| POST /reports/{id}/attachments \| Pelapor/petugas terkait/admin \|
  Unggah lampiran sesuai izin. \|

| GET /admin/reports \| Admin \| Daftar laporan dengan
  filter/pagination. \|

| PATCH /admin/reports/{id}/review \| Admin \| Verifikasi, minta
  perbaikan, atau tolak. \|

| POST /admin/reports/{id}/assignments \| Admin \| Tetapkan petugas. \|

| GET /admin/users \| Admin \| Daftar pengguna. \|

| PATCH /admin/users/{id} \| Admin \| Ubah status/data akun yang
  diizinkan. \|

| GET /admin/dashboard/summary \| Admin \| Ringkasan laporan. \|

| GET /notifications \| Semua \| Daftar notifikasi sendiri. \|

| PATCH /notifications/{id}/read \| Pemilik notifikasi \| Tandai telah
  dibaca. \|

## 10.1 Validasi dan Respons

Respons sukses dapat menggunakan {"data": ..., "meta": ...}; respons
gagal menggunakan {"error": {"code": "VALIDATION_ERROR", "message":
"...", "details": \[...\]}}. Gunakan pagination dengan batas maksimum.
Validasi field dilakukan di backend.

HTTP: 201 dibuat, 200 berhasil, 204 tanpa isi, 400/422 input tidak
valid, 401 belum login, 403 tidak berwenang, 404 tidak ditemukan, 409
konflik.

Unggah file memakai multipart/form-data dengan batas ukuran, MIME, dan
signature.

Perubahan status dan penugasan dijalankan transaksional serta mencatat
status_histories/audit_logs.

# 11. Keamanan dan Privasi

Hash password dengan Argon2id atau algoritma modern setara; jangan
simpan password asli.

Wajib HTTPS/TLS di produksi.

Terapkan RBAC dan pemeriksaan kepemilikan data di backend pada setiap
endpoint.

Gunakan query parameterized/ORM dan validasi input untuk mencegah SQL
injection.

Batasi percobaan login; jangan mengungkap keberadaan email pada pesan
login gagal.

Validasi file berdasarkan ukuran, MIME, ekstensi, dan signature; nama
file acak; lokasi penyimpanan tidak dapat mengeksekusi file.

Akses lampiran dibatasi sesuai peran; gunakan endpoint terautentikasi
atau URL sementara.

Simpan secret pada environment/secret manager, bukan repository.

Log aktivitas tanpa password/token dan minimalkan data pribadi.

Backup terenkripsi, uji pemulihan, pembaruan dependensi, dan pemantauan
error.

Kumpulkan lokasi hanya sejauh diperlukan; sediakan kebijakan privasi dan
retensi data sesuai ketentuan yang berlaku.

# 12. Asumsi, Batasan, dan Risiko

| Jenis \| Uraian \| Mitigasi \|

| --- \| --- \| --- \|

| Asumsi \| Wilayah awal adalah Kota Bandar Lampung. \| Konfirmasi batas
  wilayah dan unit operasional. \|

| Asumsi \| Administrator memiliki daftar petugas aktif. \| Sediakan
  manajemen akun petugas. \|

| Batasan \| MVP memerlukan koneksi internet. \| Pesan kegagalan
  jaringan dan pertahankan draft bila memungkinkan. \|

| Risiko \| Laporan duplikat/tidak relevan. \| Verifikasi admin dan
  pencarian manual laporan serupa. \|

| Risiko \| Foto terlalu besar/berbahaya. \| Validasi tipe dan ukuran
  serta batasi akses. \|

| Risiko \| Petugas tidak memperbarui status. \| Tampilan tugas
  sederhana dan pemantauan admin. \|

| Risiko \| Lokasi kurang akurat. \| Alamat teks tetap disediakan;
  koordinat bersifat opsional. \|

# 13. Kriteria Keberhasilan dan Pengujian

## 13.1 Indikator Keberhasilan

≥95% laporan uji berhasil tersimpan dengan nomor tiket unik.

100% akses lintas peran yang tidak sah ditolak dalam pengujian
otorisasi.

≥90% peserta uji masyarakat dapat membuat laporan tanpa bantuan setelah
onboarding singkat.

Petugas dapat menemukan tugas dan memperbarui status sesuai alur.

Setiap perubahan status penting tercatat dengan waktu dan pelaku.

Admin dapat mencari/filter laporan berdasarkan status, tanggal,
kategori, dan petugas.

Tidak ada kerentanan kritis/tinggi yang belum ditangani sebelum rilis.

## 13.2 Skenario Uji Minimum

Registrasi dengan email valid dan email duplikat.

Login benar/salah dan logout.

Membuat laporan lengkap, tanpa foto, dan dengan input tidak valid.

Masyarakat mencoba mengakses laporan pengguna lain.

Admin memverifikasi, menolak, dan meminta perbaikan.

Admin menugaskan petugas; petugas lain tidak dapat mengubah tugas.

Petugas memperbarui status dan mengunggah bukti valid/tidak valid.

Masyarakat melihat perubahan status dan riwayat.

Admin menggunakan filter, pagination, dan dashboard.

Backup dan restore database pada staging.

# 14. Tahapan Pengembangan

| Tahap \| Aktivitas \| Hasil \|

| --- \| --- \| --- \|

| 1. Validasi \| Konfirmasi alur, status, kategori, lokasi, kebijakan
  admin. \| PRD disetujui dan backlog MVP. \|

| 2. Desain \| Wireframe, skema database, kontrak API, otorisasi. \|
  Dokumen desain/prototipe. \|

| 3. Fondasi \| Setup Rust, PostgreSQL, migrasi, autentikasi, RBAC. \|
  API dasar. \|

| 4. Fitur inti \| Pelaporan, verifikasi, penugasan, status, lampiran.
  \| Alur end-to-end. \|

| 5. Antarmuka \| Halaman tiga peran, dashboard, riwayat, notifikasi. \|
  Web responsif. \|

| 6. Pengujian/rilis \| Uji fungsional, keamanan, kinerja, backup, UAT.
  \| Rilis kandidat dan panduan. \|

# 15. Identitas dan Footer

Logo Pemerintah Kota Bandar Lampung dan Universitas Teknokrat Indonesia
ditempatkan berdampingan pada sampul dengan ukuran proporsional.

Gunakan aset logo resmi yang diverifikasi dan telah memperoleh
persetujuan penggunaan sesuai ketentuan institusi.

Footer seluruh halaman utama aplikasi wajib memuat teks berikut secara
persis:

"Copyright©2026 by Aura Azhar Naila dan Dr. Erliyan Redy Susanto, M.Kom"

Pertahankan simbol ©, angka tahun, kapitalisasi, spasi, dan tanda baca.
Teks ini merupakan ketentuan footer aplikasi, bukan hanya footer dokumen
PRD.

# Lampiran A. Struktur Backend Rust yang Disarankan

src/main.rs

src/config/

src/routes/ \# routing endpoint

src/handlers/ \# request/response

src/services/ \# aturan bisnis

src/repositories/ \# akses PostgreSQL

src/models/ \# entitas dan DTO

src/middleware/ \# autentikasi, otorisasi, logging

src/errors/ \# pemetaan error

migrations/ \# migrasi PostgreSQL

tests/ \# integration tests

# Lampiran B. Keputusan untuk Validasi

Apakah status Selesai dari petugas perlu persetujuan admin sebelum
Ditutup? Draf ini mengasumsikan admin meninjau dan menutup.

Apakah koordinat GPS wajib atau alamat teks cukup? Draf menetapkan
koordinat opsional.

Batas ukuran foto, format file, dan penyimpanan lampiran.

Daftar kategori awal dan definisi prioritas.

Jam operasional dan target waktu respons petugas.

Persetujuan resmi penggunaan logo dan footer.

# Referensi Awal

Peraturan Daerah Kota Bandar Lampung Nomor 09 Tahun 2012 tentang Lambang
Daerah:
https://peraturan.bpk.go.id/Details/317442/perda-kota-bandar-lampung-no-09-tahun-2012

Portal Satu Data Lampung:
https://opendata.lampungprov.go.id/portal-data-kab-kota

Logo Universitas Teknokrat Indonesia pada Wikimedia Commons (perlu
konfirmasi aset resmi terkini):
https://commons.wikimedia.org/wiki/File:UNIVERSITASTEKNOKRAT.png
