# Lampung Smart Waste --- Dokumen Desain UI/UX

> **Sumber desain:** HTML hasil desain Google Stitch yang diberikan.
> Dokumen ini merangkum struktur visual, komponen, konten, dan pola
> interaksi yang tampak pada sumber. Nilai angka, nama, alamat, dan data
> contoh dipertahankan sebagai konten mockup, bukan data operasional
> terverifikasi.

## 1. Ringkasan Produk

**Lampung Smart Waste** adalah antarmuka sistem informasi pengelolaan
dan pelaporan sampah untuk wilayah Bandar Lampung. Desain mengakomodasi
tiga kelompok pengguna utama:

-   **Masyarakat:** membuat aduan, memantau status, melihat riwayat,
    serta memperoleh informasi layanan persampahan.
-   **Petugas kebersihan:** menerima dan mengerjakan tugas lapangan,
    melihat rute, melakukan checklist perlengkapan, dan mengirim bukti
    penanganan.
-   **Pemerintah daerah / Admin:** memantau kondisi persampahan,
    menganalisis laporan, dan memverifikasi aduan.

### Cakupan layar yang terlihat pada file sumber

1.  Beranda Masyarakat --- Dashboard Warga.
2.  Buat Laporan Sampah --- Pelaporan Cepat.
3.  Dashboard Petugas Kebersihan --- Operasional Lapangan.
4.  Dashboard Admin --- Pusat Kendali Smart City.

Navigasi pada shell juga mencantumkan halaman Laporan Saya, Pelacakan
Status, Daftar Tugas, Riwayat Penanganan, Verifikasi Laporan, Manajemen
Pengguna, Kategori Sampah, dan Pengaturan Sistem. Pada sumber yang
diberikan, halaman-halaman tersebut muncul sebagai item navigasi; desain
isi terpisahnya tidak termasuk dalam empat layar yang dirangkum di sini.

## 2. Arah Visual dan Design System

### 2.1 Karakter visual

-   Gaya dashboard administrasi modern, bersih, informatif, dan
    berorientasi data.
-   Warna hijau menjadi identitas lingkungan dan aksi utama.
-   Biru digunakan sebagai aksen informasi, navigasi, dan status proses.
-   Latar terang dengan kartu putih, permukaan berlapis, sudut membulat,
    dan bayangan lembut.
-   Ikon menggunakan **Material Symbols Outlined**.
-   Tipografi menggunakan **Inter**.

### 2.2 Palet warna utama

Warna berikut diambil dari konfigurasi tema Tailwind pada sumber desain.

  Token                                Hex Penggunaan
  ---------------------------- ----------- ------------------------------------
  `primary`                      `#006B2C` Aksi utama, identitas hijau
  `primary-container`            `#00873A` Navigasi aktif dan permukaan hijau
  `primary-fixed`                `#7FFC97` Aksen hijau muda
  `secondary`                    `#0051D5` Informasi, tautan, status proses
  `secondary-container`          `#316BF3` Aksen biru
  `tertiary`                     `#1C6938` Status selesai dan keberhasilan
  `tertiary-container`           `#39834E` Variasi hijau
  `background`                   `#FAF8FF` Latar aplikasi
  `surface`                      `#FAF8FF` Latar konten
  `surface-container-lowest`     `#FFFFFF` Kartu dan panel
  `surface-container-low`        `#F2F3FF` Latar panel sekunder
  `surface-container`            `#EAEDFF` Permukaan kontrol
  `surface-container-high`       `#E2E7FF` Permukaan dengan penekanan
  `on-surface`                   `#131B2E` Teks utama
  `on-surface-variant`           `#3E4A3D` Teks sekunder
  `outline`                      `#6E7B6C` Teks/garis muted
  `error`                        `#BA1A1A` Peringatan dan kondisi darurat
  `error-container`              `#FFDAD6` Latar peringatan

### 2.3 Tipografi

Font utama: **Inter**.

  Gaya            Ukuran   Line height   Bobot
  ------------- -------- ------------- -------
  Headline XL      36 px         44 px     700
  Headline LG      28 px         36 px     700
  Headline MD      22 px         30 px     600
  Headline SM      18 px         26 px     600
  Body LG          16 px         26 px     400
  Body MD          14 px         22 px     400
  Body SM          12 px         18 px     400
  Label LG         14 px         20 px     600
  Label MD         12 px         16 px     600
  Label SM         11 px         14 px     700

Pada layar kecil, headline utama menggunakan ukuran sekitar 22--28 px
sesuai konfigurasi `headline-lg-mobile` dan `headline-xl-mobile`.

### 2.4 Spasi, bentuk, dan elevasi

-   Skala spasi khusus: `space-xs` 4 px, `space-sm` 8 px, `space-md` 16
    px, `space-lg` 24 px, `space-xl` 32 px.
-   Padding konten desktop menggunakan gutter sekitar 24--32 px; versi
    mobile sekitar 16 px.
-   Radius komponen: kecil 8 px, sedang 12 px, besar 16 px, dan penuh
    untuk badge/pill.
-   Kartu memakai bayangan tipis; panel utama dapat memakai bayangan
    sedang.
-   Batas antarbagian menggunakan warna permukaan/outline yang lembut.

### 2.5 Kerangka dashboard bersama

-   Sidebar tetap di sisi kiri, lebar desktop sekitar 288 px.
-   Header tetap di bagian atas area konten, tinggi sekitar 64 px.
-   Area konten utama berada di sebelah kanan sidebar.
-   Sidebar memuat identitas Lampung Smart Waste, atribusi Pemkot Bandar
    Lampung dan Universitas Teknokrat Indonesia, navigasi berdasarkan
    peran, helpdesk, serta kontrol simulasi mode.
-   Header memuat pencarian global, zona waktu Bandar Lampung (WIB),
    akses panggilan DLH 112, notifikasi, dan profil pengguna.
-   Layout menggunakan grid responsif: kolom tunggal pada layar kecil,
    beberapa kolom pada layar lebar.

### 2.6 Navigasi berdasarkan peran

**Masyarakat** - Beranda - Buat Laporan - Laporan Saya - Pelacakan
Status

**Petugas Kebersihan** - Dashboard Petugas - Daftar Tugas - Riwayat
Penanganan

**Pemerintah Daerah (Admin)** - Pemantauan Admin - Verifikasi Laporan -
Manajemen Pengguna - Kategori Sampah - Pengaturan Sistem

Shell juga menampilkan helpdesk warga (`dlh@bandarlampungkota.go.id`)
dengan label layanan 24/7 dan pilihan simulasi mode Warga, Petugas,
serta Admin.

------------------------------------------------------------------------

## 3. Spesifikasi Layar

## 3.1 Beranda Masyarakat --- Dashboard Warga

**Tujuan:** memberi warga ringkasan laporan pribadi, status penanganan,
peta sebaran, serta informasi layanan kebersihan.

### Struktur dan komponen

1.  **Hero / welcome banner**
    -   Sapaan pengguna.
    -   Deskripsi ajakan melaporkan tumpukan sampah liar.
    -   Informasi wilayah prioritas dan estimasi respon.
    -   Tombol utama **Buat Laporan Sampah**.
    -   Tombol sekunder **Cek Status Wilayah Saya**.
2.  **Empat kartu KPI**
    -   Total Laporan Saya.
    -   Laporan Diproses.
    -   Laporan Selesai.
    -   Ditolak / Dibatalkan.
    -   Setiap kartu menampilkan angka, ikon, keterangan, dan
        indikator/progress.
3.  **Laporan Terkini Saya**
    -   Pencarian berdasarkan ID, lokasi, atau kata kunci.
    -   Tab Semua, Diproses, dan Selesai.
    -   Ringkasan laporan berisi foto, ID, kategori, status, waktu,
        judul, lokasi, dan prioritas.
    -   Laporan yang sedang dikerjakan menampilkan regu petugas, armada,
        dan tautan pelacakan.
    -   Laporan selesai dapat menampilkan rating kepuasan,
        petugas/volume penanganan, serta aksi unduh berita acara atau
        lihat rincian.
4.  **Peta Sebaran Titik Laporan**
    -   Peta wilayah Bandar Lampung.
    -   Marker membedakan laporan aktif dan selesai.
    -   Legenda jumlah laporan dan informasi radius/wilayah.
    -   Kontrol zoom dan tampilan penuh.
5.  **Panel samping**
    -   **Poin Warga Bersih:** saldo poin, level warga, dan katalog
        penukaran.
    -   **Jadwal Truk DLH:** jadwal pengangkutan pagi dan sore beserta
        area layanan.
    -   **Edukasi Pilah Sampah:** kategori organik, anorganik, dan
        informasi limbah B3.
    -   **Layanan Darurat Sampah Liar:** akses panggilan 112 dan
        WhatsApp DLH.

### Contoh konten yang ditampilkan pada mockup

-   Total laporan: 8; diproses: 2; selesai: 5; ditolak/dibatalkan: 1.
-   Contoh ID laporan: `LSW-2026-089`, `LSW-2026-074`, dan
    `LSW-2026-061`.
-   Contoh lokasi: Jalan Raden Intan, Pasar Bambu Kuning, dan kawasan
    Enggal.
-   Contoh saldo insentif: 340 poin.
-   Jadwal contoh: pagi 06:00--09:00 dan sore 16:00--18:30.

Angka dan detail di atas adalah data contoh yang tertanam pada desain.

## 3.2 Buat Laporan Sampah --- Pelaporan Cepat

**Tujuan:** membantu warga mengirim laporan sampah dengan identitas
kejadian, kategori, bukti foto, dan lokasi yang jelas.

### Struktur dan komponen

1.  **Header dan progress**
    -   Judul halaman dan penjelasan singkat.
    -   Stepper empat tahap untuk menunjukkan progres pelaporan.
2.  **Kolom kiri --- identitas dan klasifikasi**
    -   Input judul laporan.
    -   Pilihan kategori sampah berbentuk radio card.
    -   Enam kartu kategori sesuai rancangan sumber.
    -   Input estimasi volume sampah.
    -   Text area deskripsi permasalahan.
    -   Checkbox untuk mengirim laporan secara anonim.
3.  **Kolom kanan --- media dan lokasi**
    -   Modul unggah foto/video dengan area drag-and-drop.
    -   Pratinjau berkas yang telah dipilih.
    -   Modul geolokasi dan pemilih titik pada peta.
    -   Marker/pin lokasi dan kontrol peta.
    -   Input rincian lokasi.
4.  **Footer aksi**
    -   Area aksi untuk kembali/melanjutkan atau mengirim laporan sesuai
        tahap.
    -   Penekanan visual pada aksi utama pengiriman.

### Prinsip interaksi

-   Pengguna diarahkan mengikuti urutan tahap melalui stepper.
-   Pilihan kategori harus terlihat sebagai kartu yang dapat dipilih.
-   Berkas terunggah ditampilkan sebagai pratinjau.
-   Lokasi laporan dapat ditentukan melalui peta dan dilengkapi rincian
    alamat.
-   Opsi anonim tersedia sebagai kontrol eksplisit.

> Label rinci keempat tahap dan nama seluruh kategori perlu mengikuti
> teks final pada formulir sumber saat implementasi. Dokumen ini tidak
> menambahkan validasi atau field yang tidak terlihat pada rancangan.

## 3.3 Dashboard Petugas Kebersihan --- Operasional Lapangan

**Tujuan:** menjadi ruang kerja petugas untuk melihat beban tugas,
memprioritaskan laporan, menavigasi lokasi, dan mengirim bukti
penyelesaian.

### Struktur dan komponen

1.  **Top operational bar**
    -   Identitas/status armada.
    -   Status operasional petugas.
    -   Tombol peringatan/darurat.
2.  **Empat kartu KPI**
    -   Total Tugas.
    -   Tugas Baru.
    -   Sedang Dikerjakan.
    -   Tugas Selesai.
3.  **Antrean tugas**
    -   Tab/filter tugas.
    -   Kartu tugas baru/prioritas.
    -   Kartu tugas dalam proses.
    -   Kartu tugas selesai.
    -   Foto bukti, ID laporan, lokasi, kategori, status, dan informasi
        penugasan ditampilkan pada kartu sesuai konteks.
4.  **Navigasi dan dispatch**
    -   Kartu rute dan geolokasi langsung.
    -   Peta GIS dengan tampilan posisi/rute.
    -   HUD GPS simulasi.
    -   Daftar waypoint/titik yang perlu dikunjungi.
    -   Checklist keselamatan dan perlengkapan.
    -   Kontak dispatch cepat.
5.  **Unggah bukti sebelum-sesudah**
    -   Modal/form unggah bukti penanganan.
    -   Mendukung dokumentasi kondisi sebelum dan sesudah pekerjaan.
    -   Komponen ini ditandai sebagai mock interactive pada sumber
        desain.

### Prinsip interaksi

-   Tugas baru, berjalan, dan selesai dibedakan secara visual.
-   Informasi lokasi dan rute harus mudah ditemukan saat petugas
    bekerja.
-   Checklist perlengkapan disajikan sebagai daftar yang mudah ditandai.
-   Bukti foto sebelum-sesudah menjadi bagian dari alur dokumentasi
    pekerjaan.

## 3.4 Dashboard Admin --- Pusat Kendali Smart City

**Tujuan:** menyediakan ringkasan eksekutif dan pemantauan
spasial/analitik untuk pengelolaan laporan persampahan.

### Struktur dan komponen

1.  **Top command dan executive sub-bar**
    -   Identitas pusat kendali.
    -   Kontrol/filter konteks pemantauan.
2.  **Empat KPI berdampak tinggi**
    -   Empat kartu ringkasan statistik utama.
    -   Menampilkan nilai dan konteks metrik.
3.  **Pemantauan geografis dan live heatmap**
    -   Kanvas peta wilayah.
    -   Peta dengan overlay telemetry.
    -   Badge insiden aktif.
    -   Informasi titik/wilayah untuk pemantauan spasial.
4.  **Matriks grafik eksekutif (grid 2×2)**
    -   **Tren bulanan:** grafik garis.
    -   **Lima kecamatan teratas:** grafik batang.
    -   **Distribusi status:** grafik donat.
    -   **Komposisi kategori sampah:** visualisasi kategori.
5.  **Antrean verifikasi cepat**
    -   Tabel lima laporan terbaru yang masuk.
    -   Informasi ringkas setiap baris laporan.
    -   Ringkasan status cepat di bagian bawah tabel.
6.  **Footer atribusi sistem**
    -   Area atribusi operasional/sistem.

### Contoh distribusi status pada grafik sumber

-   Selesai: 78%.
-   Penanganan: 12%.
-   Verifikasi: 7%.
-   Ditolak: 3%.

Persentase tersebut merupakan data ilustrasi pada mockup, bukan angka
real-time.

------------------------------------------------------------------------

## 4. Komponen UI yang Dapat Digunakan Ulang

  Komponen           Bentuk/pola                           Penggunaan
  ------------------ ------------------------------------- -------------------------------
  Sidebar navigasi   Panel vertikal tetap                  Navigasi lintas peran
  Top header         Bar horizontal tetap                  Pencarian, notifikasi, profil
  KPI card           Kartu angka + ikon + keterangan       Ringkasan statistik
  Status badge       Pill berwarna                         Status laporan/tugas
  Report card        Kartu dengan thumbnail dan metadata   Daftar laporan
  Task card          Kartu tugas operasional               Antrean petugas
  Filter tabs        Tab/pill horizontal                   Penyaringan daftar
  Search input       Input dengan ikon pencarian           Pencarian data
  Map panel          Peta + marker + legenda               Monitoring lokasi
  Upload panel       Dropzone + preview                    Bukti foto/video
  Checklist          Daftar item yang dapat ditandai       Perlengkapan petugas
  Data table         Header, baris, status                 Verifikasi laporan
  Chart card         Panel grafik berjudul                 Analitik admin
  Emergency action   Tombol beraksen merah                 Akses layanan darurat
  Helpdesk panel     Kartu kontak                          Bantuan pengguna

## 5. Status dan Bahasa Visual

Status yang tampak pada desain perlu memiliki gaya konsisten:

  Status/konteks             Perlakuan visual
  -------------------------- ----------------------------------------
  Aktif / dalam penanganan   Aksen biru (`secondary`)
  Selesai dibersihkan        Aksen hijau (`tertiary`)
  Ditolak / dibatalkan       Netral atau aksen error sesuai konteks
  Prioritas tinggi           Badge yang menonjol
  Darurat                    Merah (`error`)
  Informasi umum             Abu-abu/outline

Status tidak boleh dibedakan hanya dengan warna; teks status dan ikon
tetap ditampilkan agar mudah dipahami.

## 6. Responsivitas

Berdasarkan kelas layout pada HTML:

-   **Desktop lebar:** sidebar tetap di kiri; dashboard memakai grid
    multi-kolom.
-   **Tablet:** kolom dashboard menyusut dan panel dapat ditumpuk.
-   **Mobile:** konten menjadi satu kolom; area aksi dan kartu dibuat
    fleksibel; beberapa informasi header disembunyikan pada breakpoint
    tertentu.
-   Form pelaporan menggunakan layout dua kolom pada layar lebar dan
    susunan vertikal pada layar kecil.
-   Daftar laporan/tugas mengubah susunan horizontal menjadi vertikal
    pada viewport kecil.

## 7. Aksesibilitas dan UX

Rekomendasi implementasi yang konsisten dengan pola visual sumber:

-   Gunakan label yang jelas pada setiap input, bukan placeholder saja.
-   Sediakan focus state yang terlihat untuk input, tombol, tab, dan
    tautan.
-   Pastikan kontras teks/badge memadai.
-   Berikan teks status selain indikator warna.
-   Sediakan teks alternatif untuk foto laporan.
-   Peta harus disertai informasi lokasi/daftar titik yang dapat dibaca
    tanpa bergantung pada marker visual.
-   Aksi penting seperti kirim laporan, unggah bukti, dan tindakan
    darurat perlu memiliki label yang eksplisit.
-   Pada mobile, pastikan tombol utama mudah dijangkau dan tidak
    terpotong.

## 8. Catatan Implementasi

Dokumen ini adalah spesifikasi desain UI/UX, bukan spesifikasi backend
atau kontrak API.

-   Konten seperti angka KPI, ID laporan, nama petugas, lokasi, jadwal,
    poin, dan grafik pada HTML harus diperlakukan sebagai **data
    mockup** sampai terhubung ke sumber data aplikasi.
-   Komponen peta, GPS, grafik, upload, notifikasi, tombol, dan mode
    simulasi membutuhkan implementasi fungsional; tampilan HTML saja
    tidak membuktikan integrasi layanan tersebut.
-   Pastikan setiap menu mengarah ke route yang sesuai dengan hak akses
    peran.
-   Data laporan dan status harus berasal dari database, bukan angka
    statis pada mockup.
-   Detail validasi formulir, aturan transisi status, dan hak akses
    perlu ditetapkan pada PRD/kontrak aplikasi terpisah.

## 9. Checklist Kesesuaian UI

-   [ ] Identitas Lampung Smart Waste dan atribusi institusi tampil
    konsisten.
-   [ ] Sidebar dikelompokkan menurut Masyarakat, Petugas, dan Admin.
-   [ ] Header memuat pencarian, notifikasi, dan profil.
-   [ ] Warna, tipografi, radius, dan skala spasi mengikuti design
    system.
-   [ ] Dashboard warga menampilkan KPI, daftar laporan, peta, insentif,
    jadwal, edukasi, dan hotline.
-   [ ] Form laporan memuat stepper, klasifikasi, deskripsi, upload, dan
    geolokasi.
-   [ ] Dashboard petugas memuat KPI, antrean tugas, peta/rute,
    checklist, dan unggah bukti.
-   [ ] Dashboard admin memuat KPI, peta/heatmap, empat grafik, dan
    antrean verifikasi.
-   [ ] Layout responsif untuk desktop, tablet, dan mobile.
-   [ ] Seluruh data contoh telah diganti dengan data dinamis sebelum
    rilis.
