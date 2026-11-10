/**
 * app.js - Lampung Smart Waste Client-side Logic & State Management
 * Berdasarkan PRD_LAMPUNG_SMART_WASTE.md dan DESAIN_UI_UX_LAMPUNG_SMART_WASTE.md
 * Copyright©2026 by Aura Azhar Naila dan Dr. Erliyan Redy Susanto, M.Kom
 */

// ==========================================
// SEED DATA LOKAL & CADANGAN (OFFLINE / VERCEL COMPATIBLE)
// ==========================================
const DEFAULT_CATEGORIES = [
  { id: 'cat-1', name: 'Sampah Liar Jalanan', description: 'Tumpukan sampah liar di bahu jalan atau lahan kosong' },
  { id: 'cat-2', name: 'Sampah Organik', description: 'Sisa makanan, dedaunan, ranting, dan limbah pasar basah' },
  { id: 'cat-3', name: 'Sampah Anorganik / Plastik', description: 'Kemasan plastik, botol kaca, kardus, dan kaleng logam' },
  { id: 'cat-4', name: 'Limbah B3 & Medis', description: 'Baterai bekas, lampu neon, elektronik, jarum/perban' },
  { id: 'cat-5', name: 'Puing Bangunan & Residu', description: 'Pecahan semen, genteng, kayu sisa proyek konstruksi' },
  { id: 'cat-6', name: 'Sampah Pasar / Komersial', description: 'Limbah padat kegiatan perdagangan dan pertokoan' }
];

const DEFAULT_REPORTS = [
  {
    id: 'rep-089',
    ticket_number: 'LSW-2026-089',
    reporter_id: 'usr-001',
    reporter_name: 'Aura Azhar Naila',
    category_id: 'cat-1',
    category_name: 'Sampah Liar Jalanan',
    title: 'Tumpukan Sampah Plastik Menutupi Trotoar',
    description: 'Tumpukan sampah liar menumpuk di depan ruko kosong, aroma menyengat dan mengganggu pejalan kaki serta saluran drainase.',
    address: 'Jl. Raden Intan No. 45, Kel. Pelita, Kec. Enggal, Kota Bandar Lampung',
    latitude: -5.4194,
    longitude: 105.2592,
    estimated_volume: '± 2.5 m³ (1 Bak Pick-up)',
    priority: 'Tinggi',
    status: 'Dalam Penanganan',
    assigned_officer_id: 'usr-002',
    assigned_officer_name: 'Budi Santoso (Regu Rajabasa 01)',
    photo_url: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800&auto=format&fit=crop&q=60',
    evidence_before: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800&auto=format&fit=crop&q=60',
    evidence_after: null,
    admin_note: 'Segera bersihkan sebelum hujan tiba karena berisiko menyumbat gorong-gorong.',
    officer_note: 'Regu 01 armada ARM-DLH-07 sudah berada di lokasi, sedang proses pengangkutan.',
    created_at: '2026-11-09T08:15:00Z',
    updated_at: '2026-11-10T09:30:00Z'
  },
  {
    id: 'rep-074',
    ticket_number: 'LSW-2026-074',
    reporter_id: 'usr-001',
    reporter_name: 'Aura Azhar Naila',
    category_id: 'cat-6',
    category_name: 'Sampah Pasar / Komersial',
    title: 'Limbah Sayuran & Peti Kayu Menumpuk di Area Bongkar Muat',
    description: 'Sisa dagangan sayur membusuk di belakang los buah, menimbulkan lalat dan bau busuk.',
    address: 'Kawasan Pasar Bambu Kuning, Kel. Pasir Gintung, Kec. Tanjung Karang Pusat, Bandar Lampung',
    latitude: -5.4147,
    longitude: 105.2542,
    estimated_volume: '± 5.0 m³ (1 Truk Penuh)',
    priority: 'Darurat',
    status: 'Selesai',
    assigned_officer_id: 'usr-002',
    assigned_officer_name: 'Budi Santoso (Regu Rajabasa 01)',
    photo_url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=60',
    evidence_before: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=60',
    evidence_after: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=60',
    admin_note: 'Sudah disetujui untuk pembersihan shift pagi.',
    officer_note: 'Pengangkutan 5.2 m³ selesai, area disemprot desinfektan DLH.',
    created_at: '2026-11-07T06:30:00Z',
    updated_at: '2026-11-07T11:00:00Z'
  },
  {
    id: 'rep-061',
    ticket_number: 'LSW-2026-061',
    reporter_id: 'usr-001',
    reporter_name: 'Aura Azhar Naila',
    category_id: 'cat-4',
    category_name: 'Limbah B3 & Medis',
    title: 'Pembuangan Baterai dan Komponen Aki Rusak',
    description: 'Ditemukan drum bocor berisi bekas aki dan kabel terbakar dekat aliran anak sungai.',
    address: 'Jl. Z.A. Pagar Alam, Kel. Gedong Meneng, Kec. Rajabasa, Bandar Lampung',
    latitude: -5.3789,
    longitude: 105.2435,
    estimated_volume: '± 1.2 m³',
    priority: 'Darurat',
    status: 'Ditutup',
    assigned_officer_id: 'usr-003',
    assigned_officer_name: 'Ahmad Yani (Regu Teluk Betung 02)',
    photo_url: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&auto=format&fit=crop&q=60',
    evidence_before: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&auto=format&fit=crop&q=60',
    evidence_after: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=60',
    admin_note: 'Penanganan khusus unit B3 DLH Kota.',
    officer_note: 'Evakuasi limbah B3 telah dipindahkan ke depo TPS-3R TPA Bakung.',
    created_at: '2026-11-05T14:20:00Z',
    updated_at: '2026-11-06T16:00:00Z'
  },
  {
    id: 'rep-092',
    ticket_number: 'LSW-2026-092',
    reporter_id: 'usr-001',
    reporter_name: 'Aura Azhar Naila',
    category_id: 'cat-2',
    category_name: 'Sampah Organik',
    title: 'Tebasan Dahan Pohon Menumpuk Setelah Angin Kencang',
    description: 'Dahan dan ranting pohon tumbang dipinggirkan ke sudut pertigaan jalan, belum diangkut mobil pick up dinas.',
    address: 'Jl. Sultan Agung No. 12, Kel. Way Halim Permai, Kec. Way Halim, Bandar Lampung',
    latitude: -5.3951,
    longitude: 105.2718,
    estimated_volume: '± 3.0 m³',
    priority: 'Sedang',
    status: 'Menunggu Verifikasi',
    assigned_officer_id: null,
    assigned_officer_name: null,
    photo_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60',
    created_at: '2026-11-10T14:10:00Z',
    updated_at: '2026-11-10T14:10:00Z'
  },
  {
    id: 'rep-093',
    ticket_number: 'LSW-2026-093',
    reporter_id: 'usr-001',
    reporter_name: 'Aura Azhar Naila',
    category_id: 'cat-1',
    category_name: 'Sampah Liar Jalanan',
    title: 'Tumpukan Sampah Plastik Rumah Tangga di Pinggir Jembatan',
    description: 'Banyak kantong kresek dibuang sembarangan di bantaran jembatan dekat perumahan.',
    address: 'Jl. Ryacudu, Kel. Harapan Jaya, Kec. Sukarame, Bandar Lampung',
    latitude: -5.3812,
    longitude: 105.3025,
    estimated_volume: '± 1.8 m³',
    priority: 'Sedang',
    status: 'Terverifikasi',
    assigned_officer_id: null,
    assigned_officer_name: null,
    photo_url: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800&auto=format&fit=crop&q=60',
    created_at: '2026-11-10T11:00:00Z',
    updated_at: '2026-11-10T11:45:00Z'
  }
];

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Status Laporan Diperbarui',
    message: 'Laporan Anda LSW-2026-089 di Jl. Raden Intan saat ini sedang Dalam Penanganan oleh Budi Santoso.',
    read_at: null,
    created_at: '2026-11-10T09:30:00Z'
  },
  {
    id: 'notif-2',
    title: 'Tugas Baru Ditetapkan',
    message: 'Anda mendapatkan tugas penanganan sampah baru di Jl. Raden Intan (LSW-2026-089).',
    read_at: '2026-11-09T10:00:00Z',
    created_at: '2026-11-09T09:30:00Z'
  }
];

// Inisialisasi awal dengan seed data agar tampilan langsung muncul 100%
let appReports = JSON.parse(localStorage.getItem('lsw_reports')) || DEFAULT_REPORTS;
let appCategories = DEFAULT_CATEGORIES;
let appNotifications = DEFAULT_NOTIFICATIONS;

// PROFILES
const PROFILES = {
  masyarakat: {
    id: 'usr-001',
    name: 'Aura Azhar Naila',
    email: 'warga@lampung.go.id',
    role: 'masyarakat',
    label: 'Masyarakat (Warga)',
    initials: 'A',
    points: 340,
    level: 'Warga Peduli Lingkungan'
  },
  petugas: {
    id: 'usr-002',
    name: 'Budi Santoso',
    email: 'petugas@dlh.bandarlampungkota.go.id',
    role: 'petugas',
    label: 'Petugas Kebersihan',
    initials: 'B',
    fleet: 'ARM-DLH-07 (Dump Truck 4.5T)'
  },
  admin: {
    id: 'usr-004',
    name: 'Dr. Erliyan Redy Susanto, M.Kom',
    email: 'admin@dlh.bandarlampungkota.go.id',
    role: 'admin',
    label: 'Administrator DLH',
    initials: 'E',
    position: 'Kepala Pusat Kendali Smart City'
  }
};

let currentRole = 'masyarakat';
let currentUser = PROFILES.masyarakat;
let currentStep = 1;

// Leaflet & Chart references
let mapWarga = null;
let mapPetugas = null;
let mapAdmin = null;
let chartTren = null;
let chartKecamatan = null;
let chartStatus = null;
let chartKategori = null;

// ==========================================
// INIT APP
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  setupRoleFromStorage();

  // Render awal langsung dari data lokal agar UI TIDAK PERNAH KOSONG
  renderCategoryCards();
  updateUIWithReports();
  renderNotifications();
  setupEventListeners();

  // Lalu coba sinkronisasi ke API backend di latar belakang jika tersedia
  fetchReports();
  loadCategories();
  fetchNotifications();
});

// Real-Time Clock (WIB = UTC+7)
function initLiveClock() {
  const clockEl = document.getElementById('live-clock');
  function update() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour12: false }) + ' WIB';
    if (clockEl) clockEl.textContent = timeStr;
  }
  update();
  setInterval(update, 1000);
}

// ==========================================
// ROLE SWITCHING & NAVIGATION
// ==========================================
function setupRoleFromStorage() {
  const savedRole = localStorage.getItem('lsw_user_role') || 'masyarakat';
  const roleSelect = document.getElementById('role-selector');
  if (roleSelect) roleSelect.value = savedRole;
  switchRole(savedRole);
}

function switchRole(role) {
  if (!PROFILES[role]) role = 'masyarakat';
  currentRole = role;
  currentUser = PROFILES[role];
  localStorage.setItem('lsw_user_role', role);

  const avatarEl = document.getElementById('user-avatar');
  const nameEl = document.getElementById('user-name-display');
  const roleEl = document.getElementById('user-role-display');

  if (avatarEl) avatarEl.textContent = currentUser.initials;
  if (nameEl) nameEl.textContent = currentUser.name;
  if (roleEl) roleEl.textContent = currentUser.label;

  const views = ['masyarakat', 'petugas', 'admin'];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) el.style.display = v === role ? 'block' : 'none';
  });

  renderSidebarNav(role);

  setTimeout(() => {
    if (role === 'masyarakat') initMapWarga();
    if (role === 'petugas') {
      initMapPetugas();
      renderOfficerTasks();
    }
    if (role === 'admin') {
      initMapAdmin();
      initAdminCharts();
      renderAdminTable();
    }
  }, 150);
}

function renderSidebarNav(role) {
  const nav = document.getElementById('nav-menu');
  if (!nav) return;

  let html = '';
  if (role === 'masyarakat') {
    html = `
      <div class="nav-group-title">Masyarakat</div>
      <a class="nav-item active" onclick="scrollToTop()">
        <span class="material-symbols-outlined">dashboard</span>
        <span>Beranda Warga</span>
      </a>
      <a class="nav-item" onclick="openReportModal()">
        <span class="material-symbols-outlined">add_circle</span>
        <span>Buat Laporan</span>
      </a>
      <a class="nav-item" onclick="scrollToMap()">
        <span class="material-symbols-outlined">map</span>
        <span>Peta Sebaran Laporan</span>
      </a>
      <a class="nav-item" onclick="scrollToReports()">
        <span class="material-symbols-outlined">receipt_long</span>
        <span>Laporan Saya</span>
      </a>
    `;
  } else if (role === 'petugas') {
    html = `
      <div class="nav-group-title">Petugas Lapangan</div>
      <a class="nav-item active" onclick="scrollToTop()">
        <span class="material-symbols-outlined">dashboard</span>
        <span>Dashboard Petugas</span>
      </a>
      <a class="nav-item" onclick="scrollToOfficerQueue()">
        <span class="material-symbols-outlined">format_list_bulleted</span>
        <span>Daftar Tugas</span>
      </a>
      <a class="nav-item" onclick="scrollToOfficerMap()">
        <span class="material-symbols-outlined">navigation</span>
        <span>Rute Navigasi GPS</span>
      </a>
    `;
  } else if (role === 'admin') {
    html = `
      <div class="nav-group-title">Pemerintah Daerah (DLH)</div>
      <a class="nav-item active" onclick="scrollToTop()">
        <span class="material-symbols-outlined">monitoring</span>
        <span>Pemantauan Admin</span>
      </a>
      <a class="nav-item" onclick="scrollToAdminTable()">
        <span class="material-symbols-outlined">rule</span>
        <span>Verifikasi Laporan</span>
      </a>
      <a class="nav-item" onclick="alert('Modul Manajemen Pengguna: \n- Masyarakat: 1.420 Terdaftar\n- Petugas Aktif: 48 Personel\n- Administrator: 3 Akun')">
        <span class="material-symbols-outlined">group</span>
        <span>Manajemen Pengguna</span>
      </a>
      <a class="nav-item" onclick="alert('Kategori Sampah DLH Bandar Lampung: \n1. Sampah Liar Jalanan\n2. Sampah Organik\n3. Anorganik / Plastik\n4. Limbah B3\n5. Puing Residu\n6. Pasar / Komersial')">
        <span class="material-symbols-outlined">category</span>
        <span>Kategori Sampah</span>
      </a>
    `;
  }
  nav.innerHTML = html;
}

// ==========================================
// DATA FETCHING DENGAN FALLBACK AMAN
// ==========================================
async function fetchReports() {
  try {
    const res = await fetch('/api/v1/admin/reports', {
      headers: { 'x-user-email': currentUser.email }
    });
    if (res.ok) {
      const result = await res.json();
      if (result && result.data && Array.isArray(result.data) && result.data.length > 0) {
        appReports = result.data;
        localStorage.setItem('lsw_reports', JSON.stringify(appReports));
        updateUIWithReports();
      }
    }
  } catch (err) {
    console.log('Menggunakan data laporan lokal:', err.message);
  }
}

async function loadCategories() {
  try {
    const res = await fetch('/api/v1/categories');
    if (res.ok) {
      const result = await res.json();
      if (result && result.data && Array.isArray(result.data)) {
        appCategories = result.data;
        renderCategoryCards();
      }
    }
  } catch (err) { }
}

async function fetchNotifications() {
  try {
    const res = await fetch('/api/v1/notifications');
    if (res.ok) {
      const result = await res.json();
      if (result && result.data) {
        appNotifications = result.data;
        renderNotifications();
      }
    }
  } catch (err) { }
}

function updateUIWithReports() {
  renderWargaReports();
  renderOfficerTasks();
  renderAdminTable();
  updateKPIs();
  updateMarkersOnMaps();
}

// ==========================================
// WARGA (CITIZEN) LOGIC & RENDERING
// ==========================================
function renderWargaReports(filterStatus = 'Semua') {
  const tbody = document.getElementById('warga-reports-tbody');
  if (!tbody) return;

  let list = appReports;
  if (filterStatus === 'Proses') {
    list = list.filter(r => ['Menunggu Verifikasi', 'Terverifikasi', 'Ditugaskan', 'Dalam Penanganan'].includes(r.status));
  } else if (filterStatus === 'Selesai') {
    list = list.filter(r => ['Selesai', 'Ditutup'].includes(r.status));
  }

  tbody.innerHTML = list.map(r => `
    <tr>
      <td>
        <strong style="color: var(--primary);">${r.ticket_number}</strong>
        <div style="font-size: 11px; color: var(--outline);">${formatDate(r.created_at)}</div>
      </td>
      <td>
        <strong>${r.category_name}</strong>
        <div style="font-size: 11px; color: var(--on-surface-variant); max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${r.title}</div>
      </td>
      <td style="font-size: 12px; max-width: 200px;">${r.address}</td>
      <td>${getStatusBadge(r.status)}</td>
      <td>
        <button class="btn-secondary" style="color: var(--primary); font-size: 12px; padding: 4px 10px;" onclick="openDetailModal('${r.id}')">
          <span class="material-symbols-outlined" style="font-size: 14px;">visibility</span>
          <span>Rincian</span>
        </button>
      </td>
    </tr>
  `).join('');
}

function filterWargaReports(filter) {
  renderWargaReports(filter);
}

// ==========================================
// OFFICER (PETUGAS) LOGIC & RENDERING
// ==========================================
function renderOfficerTasks() {
  const container = document.getElementById('officer-tasks-list');
  if (!container) return;

  const tasks = appReports.filter(r => ['Ditugaskan', 'Dalam Penanganan', 'Terverifikasi'].includes(r.status));

  if (tasks.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 24px; color: var(--outline);">Tidak ada antrean tugas aktif untuk armada ini.</div>`;
    return;
  }

  container.innerHTML = tasks.map(t => `
    <div style="border: 1px solid var(--surface-container); border-radius: var(--radius-md); padding: 16px; background: #fff; box-shadow: var(--shadow-sm);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
        <div>
          <span style="font-weight: 800; color: var(--primary); font-size: 15px;">${t.ticket_number}</span>
          <span style="font-size: 12px; color: var(--outline); margin-left: 8px;">${t.category_name}</span>
        </div>
        ${getStatusBadge(t.status)}
      </div>

      <div style="font-size: 13px; font-weight: 700; margin-bottom: 4px;">${t.title}</div>
      <div style="font-size: 12px; color: var(--on-surface-variant); margin-bottom: 8px;">
        <span class="material-symbols-outlined" style="font-size: 14px; color: var(--error);">location_on</span>
        ${t.address}
      </div>

      <div style="display: flex; gap: 14px; font-size: 12px; color: var(--outline); margin-bottom: 12px; background: var(--surface-container-low); padding: 8px 12px; border-radius: 6px;">
        <div>Volume: <strong>${t.estimated_volume}</strong></div>
        <div>Prioritas: <strong style="color: var(--error);">${t.priority}</strong></div>
      </div>

      <div style="display: flex; gap: 8px; justify-content: flex-end;">
        <button class="btn-secondary" style="font-size: 12px; color: var(--secondary); padding: 6px 12px;" onclick="openDetailModal('${t.id}')">
          <span class="material-symbols-outlined" style="font-size: 15px;">info</span>
          <span>Detail</span>
        </button>
        ${t.status === 'Ditugaskan' ? `
          <button class="btn-primary" style="font-size: 12px; padding: 6px 14px; background: var(--secondary);" onclick="updateOfficerTaskStatus('${t.id}', 'Dalam Penanganan')">
            <span class="material-symbols-outlined" style="font-size: 15px;">play_arrow</span>
            <span>Mulai Bersihkan</span>
          </button>
        ` : `
          <button class="btn-primary" style="font-size: 12px; padding: 6px 14px;" onclick="openOfficerProofModal('${t.id}')">
            <span class="material-symbols-outlined" style="font-size: 15px;">add_a_photo</span>
            <span>Unggah Bukti Selesai</span>
          </button>
        `}
      </div>
    </div>
  `).join('');
}

async function updateOfficerTaskStatus(reportId, newStatus) {
  const report = appReports.find(r => r.id === reportId);
  if (report) {
    report.status = newStatus;
    report.updated_at = new Date().toISOString();
    localStorage.setItem('lsw_reports', JSON.stringify(appReports));
    updateUIWithReports();
  }

  try {
    await fetch(`/api/v1/assignments/${reportId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-user-name': currentUser.name },
      body: JSON.stringify({ status: newStatus, officer_note: `Diubah statusnya ke ${newStatus}` })
    });
  } catch (err) { }

  alert(`Status laporan berhasil diubah ke '${newStatus}'!`);
}

// ==========================================
// ADMIN LOGIC & RENDERING
// ==========================================
function renderAdminTable() {
  const tbody = document.getElementById('admin-reports-tbody');
  if (!tbody) return;

  tbody.innerHTML = appReports.map(r => `
    <tr>
      <td>
        <strong style="color: var(--primary);">${r.ticket_number}</strong>
        <div style="font-size: 11px; color: var(--outline);">${formatDate(r.created_at)}</div>
      </td>
      <td>
        <div style="font-weight: 600;">${r.reporter_name}</div>
        <div style="font-size: 11px; color: var(--outline);">Warga Pelapor</div>
      </td>
      <td>
        <strong>${r.category_name}</strong>
        <div style="font-size: 11px; color: var(--outline); max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${r.address}</div>
      </td>
      <td>${getStatusBadge(r.status)}</td>
      <td style="font-size: 12px;">
        ${r.assigned_officer_name ? `<span style="color: var(--primary); font-weight: 600;">${r.assigned_officer_name}</span>` : '<span style="color: var(--outline);">Belum Ditugaskan</span>'}
      </td>
      <td>
        <div style="display: flex; gap: 6px;">
          ${r.status === 'Menunggu Verifikasi' ? `
            <button class="btn-primary" style="font-size: 11px; padding: 4px 8px;" onclick="adminReviewAction('${r.id}', 'VERIFIKASI')">
              Verifikasi
            </button>
            <button class="btn-secondary" style="font-size: 11px; padding: 4px 8px; color: var(--error);" onclick="adminReviewAction('${r.id}', 'TOLAK')">
              Tolak
            </button>
          ` : r.status === 'Terverifikasi' ? `
            <button class="btn-primary" style="font-size: 11px; padding: 4px 8px; background: var(--secondary);" onclick="openAssignModal('${r.id}')">
              Tugaskan
            </button>
          ` : r.status === 'Selesai' ? `
            <button class="btn-primary" style="font-size: 11px; padding: 4px 8px; background: var(--tertiary);" onclick="adminReviewAction('${r.id}', 'TUTUP')">
              Tinjau & Tutup
            </button>
          ` : `
            <button class="btn-secondary" style="font-size: 11px; padding: 4px 8px;" onclick="openDetailModal('${r.id}')">
              Rincian
            </button>
          `}
        </div>
      </td>
    </tr>
  `).join('');
}

async function adminReviewAction(reportId, action) {
  const report = appReports.find(r => r.id === reportId);
  if (!report) return;

  let note = '';
  if (action === 'TOLAK') {
    note = prompt('Masukkan alasan penolakan laporan:');
    if (!note) return;
    report.status = 'Ditolak';
  } else if (action === 'VERIFIKASI') {
    report.status = 'Terverifikasi';
  } else if (action === 'TUTUP') {
    report.status = 'Ditutup';
  }

  report.updated_at = new Date().toISOString();
  localStorage.setItem('lsw_reports', JSON.stringify(appReports));
  updateUIWithReports();

  try {
    await fetch(`/api/v1/admin/reports/${reportId}/review`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-user-name': currentUser.name },
      body: JSON.stringify({ action, admin_note: note })
    });
  } catch (err) { }

  alert(`Aksi '${action}' berhasil diproses.`);
}

function openAssignModal(reportId) {
  const officerName = prompt("Tugaskan laporan ini ke petugas:\n1. Budi Santoso (Regu Rajabasa 01 - Dump Truck)\n2. Ahmad Yani (Regu Teluk Betung 02 - Compactor)\n\nKetik '1' atau '2':");
  if (!officerName) return;

  const report = appReports.find(r => r.id === reportId);
  if (report) {
    report.assigned_officer_id = officerName === '2' ? 'usr-003' : 'usr-002';
    report.assigned_officer_name = officerName === '2' ? 'Ahmad Yani (Regu Teluk Betung 02)' : 'Budi Santoso (Regu Rajabasa 01)';
    report.status = 'Ditugaskan';
    report.updated_at = new Date().toISOString();
    localStorage.setItem('lsw_reports', JSON.stringify(appReports));
    updateUIWithReports();
  }

  try {
    fetch(`/api/v1/admin/reports/${reportId}/assignments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ officer_id: officerName === '2' ? 'usr-003' : 'usr-002' })
    });
  } catch (err) { }

  alert('Petugas kebersihan berhasil ditugaskan!');
}

// ==========================================
// KPI & METRICS UPDATE
// ==========================================
function updateKPIs() {
  const total = appReports.length;
  const menunggu = appReports.filter(r => r.status === 'Menunggu Verifikasi').length;
  const proses = appReports.filter(r => ['Terverifikasi', 'Ditugaskan', 'Dalam Penanganan'].includes(r.status)).length;
  const selesai = appReports.filter(r => ['Selesai', 'Ditutup'].includes(r.status)).length;
  const ditolak = appReports.filter(r => ['Ditolak', 'Perlu Perbaikan'].includes(r.status)).length;

  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('kpi-warga-total', total);
  setEl('kpi-warga-proses', proses);
  setEl('kpi-warga-selesai', selesai);
  setEl('kpi-warga-ditolak', ditolak);

  setEl('kpi-petugas-total', proses + selesai);
  setEl('kpi-petugas-baru', appReports.filter(r => r.status === 'Ditugaskan').length);
  setEl('kpi-petugas-proses', appReports.filter(r => r.status === 'Dalam Penanganan').length);
  setEl('kpi-petugas-selesai', selesai);

  setEl('admin-kpi-total', total + 120);
  const rate = total > 0 ? Math.round((selesai / total) * 100) : 88;
  setEl('admin-kpi-rate', `${rate}%`);
  setEl('admin-kpi-waiting', menunggu);
}

// ==========================================
// LEAFLET GIS MAPS INTEGRATION
// ==========================================
const BANDAR_LAMPUNG_COORDS = [-5.4292, 105.2625];

function initMapWarga() {
  if (mapWarga) {
    mapWarga.invalidateSize();
    return;
  }
  const el = document.getElementById('map-warga');
  if (!el || typeof L === 'undefined') return;

  try {
    mapWarga = L.map('map-warga').setView(BANDAR_LAMPUNG_COORDS, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap DLH Bandar Lampung'
    }).addTo(mapWarga);
    updateMarkersOnMaps();
  } catch (e) { }
}

function initMapPetugas() {
  if (mapPetugas) {
    mapPetugas.invalidateSize();
    return;
  }
  const el = document.getElementById('map-petugas');
  if (!el || typeof L === 'undefined') return;

  try {
    mapPetugas = L.map('map-petugas').setView([-5.4194, 105.2592], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap DLH GPS'
    }).addTo(mapPetugas);
    updateMarkersOnMaps();
  } catch (e) { }
}

function initMapAdmin() {
  if (mapAdmin) {
    mapAdmin.invalidateSize();
    return;
  }
  const el = document.getElementById('map-admin');
  if (!el || typeof L === 'undefined') return;

  try {
    mapAdmin = L.map('map-admin').setView(BANDAR_LAMPUNG_COORDS, 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap DLH Smart City'
    }).addTo(mapAdmin);
    updateMarkersOnMaps();
  } catch (e) { }
}

function updateMarkersOnMaps() {
  const maps = [mapWarga, mapPetugas, mapAdmin].filter(Boolean);
  if (maps.length === 0 || typeof L === 'undefined') return;

  maps.forEach(map => {
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    appReports.forEach(r => {
      if (!r.latitude || !r.longitude) return;

      const isClean = ['Selesai', 'Ditutup'].includes(r.status);
      const markerColor = isClean ? '#1C6938' : '#0051D5';

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `<div style="background:${markerColor}; width:16px; height:16px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 6px rgba(0,0,0,0.4);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const marker = L.marker([r.latitude, r.longitude], { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; line-height: 1.4;">
          <strong style="color: #006B2C;">${r.ticket_number}</strong><br>
          <b>${r.category_name}</b><br>
          ${r.address}<br>
          <div style="margin-top: 4px;">Status: <b>${r.status}</b></div>
          <button style="margin-top: 6px; padding: 4px 8px; font-size: 11px; background: #006B2C; color: #fff; border: none; border-radius: 4px; cursor: pointer;" onclick="openDetailModal('${r.id}')">Lihat Rincian</button>
        </div>
      `);
    });
  });
}

// ==========================================
// EXECUTIVE CHARTS (CHART.JS)
// ==========================================
function initAdminCharts() {
  if (typeof Chart === 'undefined') return;

  const ctxTren = document.getElementById('chart-tren-bulanan')?.getContext('2d');
  if (ctxTren && !chartTren) {
    chartTren = new Chart(ctxTren, {
      type: 'line',
      data: {
        labels: ['Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov'],
        datasets: [{
          label: 'Jumlah Aduan Masuk',
          data: [42, 58, 74, 86, 105, 128],
          borderColor: '#006B2C',
          backgroundColor: 'rgba(0, 107, 44, 0.08)',
          fill: true,
          tension: 0.35,
          pointRadius: 4
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const ctxKec = document.getElementById('chart-top-kecamatan')?.getContext('2d');
  if (ctxKec && !chartKecamatan) {
    chartKecamatan = new Chart(ctxKec, {
      type: 'bar',
      data: {
        labels: ['Tj. Karang Pusat', 'Kedaton', 'Teluk Betung', 'Sukarame', 'Way Halim'],
        datasets: [{
          label: 'Titik Sampah',
          data: [28, 22, 19, 16, 14],
          backgroundColor: '#0051D5',
          borderRadius: 6
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const ctxStatus = document.getElementById('chart-status-doughnut')?.getContext('2d');
  if (ctxStatus && !chartStatus) {
    chartStatus = new Chart(ctxStatus, {
      type: 'doughnut',
      data: {
        labels: ['Selesai (78%)', 'Penanganan (12%)', 'Verifikasi (7%)', 'Ditolak (3%)'],
        datasets: [{
          data: [78, 12, 7, 3],
          backgroundColor: ['#1C6938', '#0051D5', '#D97706', '#BA1A1A']
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const ctxKat = document.getElementById('chart-kategori-bar')?.getContext('2d');
  if (ctxKat && !chartKategori) {
    chartKategori = new Chart(ctxKat, {
      type: 'bar',
      data: {
        labels: ['Liar Jalanan', 'Plastik/Anorganik', 'Organik', 'Pasar', 'Limbah B3', 'Puing'],
        datasets: [{
          label: 'Persentase %',
          data: [35, 25, 20, 10, 6, 4],
          backgroundColor: ['#006B2C', '#316BF3', '#39834E', '#D97706', '#BA1A1A', '#6E7B6C'],
          borderRadius: 6
        }]
      },
      options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false }
    });
  }
}

function refreshAdminData() {
  fetchReports();
  alert('Data pemantauan admin telah diperbarui secara real-time!');
}

// ==========================================
// STEPPER REPORTING FORM LOGIC
// ==========================================
function renderCategoryCards() {
  const container = document.getElementById('category-radio-container');
  if (!container) return;

  container.innerHTML = appCategories.map((c, i) => `
    <div class="category-radio-card ${i === 0 ? 'selected' : ''}" onclick="selectCategoryCard('${c.id}', this)">
      <div class="cat-title">${c.name}</div>
      <div class="cat-desc">${c.description}</div>
    </div>
  `).join('');
}

function selectCategoryCard(catId, cardEl) {
  document.querySelectorAll('.category-radio-card').forEach(c => c.classList.remove('selected'));
  cardEl.classList.add('selected');
  const hiddenInput = document.getElementById('form-selected-category');
  if (hiddenInput) hiddenInput.value = catId;
}

function goToStep(stepNumber) {
  currentStep = stepNumber;
  for (let i = 1; i <= 4; i++) {
    const content = document.getElementById(`step-content-${i}`);
    const btn = document.getElementById(`step-btn-${i}`);
    if (content) content.style.display = i === stepNumber ? 'block' : 'none';
    if (btn) {
      if (i < stepNumber) {
        btn.className = 'step-item done';
      } else if (i === stepNumber) {
        btn.className = 'step-item active';
      } else {
        btn.className = 'step-item';
      }
    }
  }

  const prevBtn = document.getElementById('btn-prev-step');
  const nextBtn = document.getElementById('btn-next-step');
  const submitBtn = document.getElementById('btn-submit-step');

  if (prevBtn) prevBtn.disabled = stepNumber === 1;
  if (nextBtn) nextBtn.style.display = stepNumber === 4 ? 'none' : 'inline-flex';
  if (submitBtn) submitBtn.style.display = stepNumber === 4 ? 'inline-flex' : 'none';
}

function nextStep() {
  if (currentStep < 4) goToStep(currentStep + 1);
}

function prevStep() {
  if (currentStep > 1) goToStep(currentStep - 1);
}

function handlePhotoUpload(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById('report-photo-preview');
      const base64Input = document.getElementById('report-photo-base64');
      if (preview) {
        preview.src = e.target.result;
        preview.style.display = 'block';
      }
      if (base64Input) base64Input.value = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function useCurrentGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latInput = document.getElementById('report-lat');
        const lngInput = document.getElementById('report-lng');
        if (latInput) latInput.value = pos.coords.latitude.toFixed(5);
        if (lngInput) lngInput.value = pos.coords.longitude.toFixed(5);
        alert(`Titik GPS berhasil disinkronisasi: \nLat: ${pos.coords.latitude}, Lng: ${pos.coords.longitude}`);
      },
      () => {
        alert('Gagal mengambil GPS. Menggunakan koordinat default Kota Bandar Lampung.');
      }
    );
  } else {
    alert('Browser tidak mendukung geolokasi.');
  }
}

async function submitReportForm(e) {
  e.preventDefault();

  const title = document.getElementById('report-title')?.value;
  const category_id = document.getElementById('form-selected-category')?.value;
  const description = document.getElementById('report-desc')?.value;
  const estimated_volume = document.getElementById('report-volume')?.value;
  const address = document.getElementById('report-address')?.value;
  const latitude = document.getElementById('report-lat')?.value;
  const longitude = document.getElementById('report-lng')?.value;
  const photo_url = document.getElementById('report-photo-base64')?.value;
  const is_anonymous = document.getElementById('report-anonymous')?.checked;

  const cat = appCategories.find(c => c.id === category_id) || appCategories[0];
  const newReport = {
    id: 'rep-' + Date.now().toString(36),
    ticket_number: 'LSW-2026-' + (appReports.length + 90).toString().padStart(3, '0'),
    reporter_id: currentUser.id,
    reporter_name: is_anonymous ? 'Warga Anonim' : currentUser.name,
    category_id: cat.id,
    category_name: cat.name,
    title: title || `Laporan ${cat.name}`,
    description,
    estimated_volume,
    address,
    latitude: parseFloat(latitude) || -5.4292,
    longitude: parseFloat(longitude) || 105.2625,
    photo_url: photo_url || 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800',
    priority: 'Sedang',
    status: 'Menunggu Verifikasi',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  appReports.unshift(newReport);
  localStorage.setItem('lsw_reports', JSON.stringify(appReports));
  updateUIWithReports();

  try {
    await fetch('/api/v1/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-email': currentUser.email },
      body: JSON.stringify({ title, category_id, description, estimated_volume, address, latitude, longitude, photo_url, is_anonymous })
    });
  } catch (err) { }

  alert(`✅ Laporan Berhasil Dikirim!\nNomor Tiket Anda: ${newReport.ticket_number}\nStatus: Menunggu Verifikasi DLH.`);
  closeReportModal();
  document.getElementById('report-form').reset();
  goToStep(1);
}

// ==========================================
// OFFICER PROOF UPLOAD MODAL
// ==========================================
function openOfficerProofModal(reportId) {
  const report = appReports.find(r => r.id === reportId);
  if (!report) return;

  document.getElementById('proof-report-id').value = report.id;
  document.getElementById('proof-ticket-info').textContent = `${report.ticket_number} - ${report.title} (${report.address})`;
  document.getElementById('modal-officer-proof').classList.add('active');
}

function closeOfficerProofModal() {
  document.getElementById('modal-officer-proof').classList.remove('active');
}

function handleProofPhotoUpload(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById('proof-photo-preview');
      const base64Input = document.getElementById('proof-photo-base64');
      if (preview) {
        preview.src = e.target.result;
        preview.style.display = 'block';
      }
      if (base64Input) base64Input.value = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

async function submitOfficerProof(e) {
  e.preventDefault();
  const reportId = document.getElementById('proof-report-id').value;
  const status = document.getElementById('proof-status-select').value;
  const evidence_after = document.getElementById('proof-photo-base64').value;
  const officer_note = document.getElementById('proof-officer-notes').value;

  const report = appReports.find(r => r.id === reportId);
  if (report) {
    report.status = status;
    if (evidence_after) report.evidence_after = evidence_after;
    if (officer_note) report.officer_note = officer_note;
    report.updated_at = new Date().toISOString();
    localStorage.setItem('lsw_reports', JSON.stringify(appReports));
    updateUIWithReports();
  }

  try {
    await fetch(`/api/v1/assignments/${reportId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-user-name': currentUser.name },
      body: JSON.stringify({ status, evidence_after, officer_note })
    });
  } catch (err) { }

  alert('✅ Bukti penanganan berhasil dikirim! Status tugas diperbarui.');
  closeOfficerProofModal();
}

// ==========================================
// DETAIL MODAL (TIMELINE & PHOTOS)
// ==========================================
function openDetailModal(reportId) {
  const r = appReports.find(x => x.id === reportId);
  if (!r) return;

  const titleEl = document.getElementById('detail-ticket-title');
  const bodyEl = document.getElementById('detail-body-content');

  if (titleEl) titleEl.textContent = `Rincian Laporan: ${r.ticket_number}`;

  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-size: 13px; color: var(--outline);">${r.category_name}</span>
          ${getStatusBadge(r.status)}
        </div>
        <h3 style="font-size: 16px; font-weight: 800; color: var(--on-surface); margin-bottom: 6px;">${r.title}</h3>
        <p style="font-size: 13px; color: var(--on-surface-variant);">${r.description}</p>
      </div>

      <div style="background: var(--surface-container-low); padding: 12px; border-radius: var(--radius-sm); font-size: 12px; margin-bottom: 16px;">
        <div><strong>Lokasi:</strong> ${r.address}</div>
        <div><strong>Koordinat:</strong> ${r.latitude}, ${r.longitude}</div>
        <div><strong>Volume:</strong> ${r.estimated_volume}</div>
        <div><strong>Pelapor:</strong> ${r.reporter_name}</div>
        <div><strong>Petugas Bertugas:</strong> ${r.assigned_officer_name || 'Menunggu Penugasan'}</div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
        <div>
          <label style="font-size: 11px; font-weight: 700; color: var(--outline); text-transform: uppercase;">Kondisi Awal (Pelapor):</label>
          <img src="${r.evidence_before || r.photo_url}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 8px; border: 1px solid var(--surface-container);" alt="Kondisi Awal">
        </div>
        <div>
          <label style="font-size: 11px; font-weight: 700; color: var(--outline); text-transform: uppercase;">Kondisi Bersih (Petugas):</label>
          ${r.evidence_after ? `
            <img src="${r.evidence_after}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 8px; border: 1px solid var(--surface-container);" alt="Kondisi Sesudah">
          ` : `
            <div style="height: 140px; background: var(--surface-container); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 11px; color: var(--outline); text-align: center; padding: 10px;">
              Petugas belum mengunggah foto sesudah pembersihan
            </div>
          `}
        </div>
      </div>

      <div style="border-top: 1px solid var(--surface-container-low); padding-top: 12px; font-size: 12px;">
        <strong style="display: block; margin-bottom: 6px; color: var(--on-surface);">Catatan Operasional:</strong>
        <div style="color: var(--on-surface-variant); margin-bottom: 4px;">• <b>Catatan Admin:</b> ${r.admin_note || 'Tidak ada catatan khusus.'}</div>
        <div style="color: var(--on-surface-variant);">• <b>Catatan Petugas:</b> ${r.officer_note || 'Pekerjaan dalam pemantauan reguler.'}</div>
      </div>
    `;
  }

  document.getElementById('modal-detail').classList.add('active');
}

function closeDetailModal() {
  document.getElementById('modal-detail').classList.remove('active');
}

function openReportModal() {
  document.getElementById('modal-report').classList.add('active');
}

function closeReportModal() {
  document.getElementById('modal-report').classList.remove('active');
}

// ==========================================
// NOTIFICATIONS & PROFILE UI
// ==========================================
function toggleNotifDropdown() {
  const dd = document.getElementById('notif-dropdown');
  if (dd) dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
}

function renderNotifications() {
  const listEl = document.getElementById('notif-list');
  const badgeEl = document.getElementById('notif-badge');
  if (!listEl) return;

  const unread = appNotifications.filter(n => !n.read_at);
  if (badgeEl) badgeEl.textContent = unread.length;

  listEl.innerHTML = appNotifications.map(n => `
    <div style="padding: 8px; border-bottom: 1px solid var(--surface-container-low); background: ${n.read_at ? '#fff' : '#F2F3FF'}; border-radius: 4px; margin-bottom: 4px;">
      <div style="font-weight: 700; color: var(--primary);">${n.title}</div>
      <div style="color: var(--on-surface-variant);">${n.message}</div>
      <div style="font-size: 10px; color: var(--outline); margin-top: 4px;">${formatDate(n.created_at)}</div>
    </div>
  `).join('');
}

function openProfileModal() {
  alert(`Identitas Pengguna Aktif:\nNama: ${currentUser.name}\nEmail: ${currentUser.email}\nHak Akses: ${currentUser.label}\n\nLampung Smart Waste v1.0\nCopyright©2026 by Aura Azhar Naila dan Dr. Erliyan Redy Susanto, M.Kom`);
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

// ==========================================
// UTILITY FUNCTIONS & HELPERS
// ==========================================
function getStatusBadge(status) {
  const map = {
    'Menunggu Verifikasi': 'menunggu',
    'Terverifikasi': 'terverifikasi',
    'Ditugaskan': 'ditugaskan',
    'Dalam Penanganan': 'penanganan',
    'Selesai': 'selesai',
    'Ditutup': 'ditutup',
    'Ditolak': 'ditolak',
    'Perlu Perbaikan': 'ditolak'
  };
  const cls = map[status] || 'menunggu';
  return `<span class="status-pill ${cls}">${status}</span>`;
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function scrollToMap() {
  document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
}

function scrollToReports() {
  document.getElementById('warga-reports-tbody')?.scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToOfficerQueue() {
  document.getElementById('officer-tasks-list')?.scrollIntoView({ behavior: 'smooth' });
}

function scrollToOfficerMap() {
  document.getElementById('map-petugas')?.scrollIntoView({ behavior: 'smooth' });
}

function scrollToAdminTable() {
  document.getElementById('admin-reports-tbody')?.scrollIntoView({ behavior: 'smooth' });
}

function handleGlobalSearch(query) {
  const q = (query || '').toLowerCase();
  const filtered = appReports.filter(r =>
    r.ticket_number.toLowerCase().includes(q) ||
    r.address.toLowerCase().includes(q) ||
    r.category_name.toLowerCase().includes(q) ||
    r.title.toLowerCase().includes(q)
  );

  const tbody = document.getElementById('warga-reports-tbody');
  if (tbody) {
    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--outline); padding: 20px;">Tidak ditemukan laporan yang cocok.</td></tr>`;
    } else {
      tbody.innerHTML = filtered.map(r => `
        <tr>
          <td><strong style="color: var(--primary);">${r.ticket_number}</strong></td>
          <td><strong>${r.category_name}</strong><br><small>${r.title}</small></td>
          <td style="font-size: 12px;">${r.address}</td>
          <td>${getStatusBadge(r.status)}</td>
          <td><button class="btn-secondary" style="font-size: 11px; padding: 4px 8px;" onclick="openDetailModal('${r.id}')">Rincian</button></td>
        </tr>
      `).join('');
    }
  }
}

function setupEventListeners() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });
}
