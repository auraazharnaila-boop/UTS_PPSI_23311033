// server.js - REST API Backend Server untuk Lampung Smart Waste
// Dibuat sesuai PRD_LAMPUNG_SMART_WASTE.md dan PPSI Standard

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'database_store.json');
const UPLOAD_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Data awal (Seed Data) sesuai spesifikasi PRD & Lokasi Riil Bandar Lampung
const initialData = {
  users: [
    {
      id: 'usr-001',
      full_name: 'Aura Azhar Naila',
      email: 'warga@lampung.go.id',
      phone: '081278990011',
      password_hash: 'warga123',
      role: 'masyarakat',
      is_active: true,
      points: 340,
      level: 'Warga Peduli Lingkungan',
      created_at: '2026-11-01T08:00:00Z'
    },
    {
      id: 'usr-002',
      full_name: 'Budi Santoso (Regu Rajabasa 01)',
      email: 'petugas@dlh.bandarlampungkota.go.id',
      phone: '085269001122',
      password_hash: 'petugas123',
      role: 'petugas',
      is_active: true,
      fleet_id: 'ARM-DLH-07',
      fleet_name: 'Dump Truck Isuzu Elf 4.5T',
      operational_status: 'Aktif - Operasi Lapangan',
      created_at: '2026-10-15T08:00:00Z'
    },
    {
      id: 'usr-003',
      full_name: 'Ahmad Yani (Regu Teluk Betung 02)',
      email: 'petugas2@dlh.bandarlampungkota.go.id',
      phone: '085269003344',
      password_hash: 'petugas123',
      role: 'petugas',
      is_active: true,
      fleet_id: 'ARM-DLH-12',
      fleet_name: 'Compactor Truck 6T',
      operational_status: 'Siaga Pangkalan',
      created_at: '2026-10-15T08:00:00Z'
    },
    {
      id: 'usr-004',
      full_name: 'Dr. Erliyan Redy Susanto, M.Kom',
      email: 'admin@dlh.bandarlampungkota.go.id',
      phone: '081172009988',
      password_hash: 'admin123',
      role: 'admin',
      is_active: true,
      position: 'Kepala Pusat Kendali Smart City DLH',
      created_at: '2026-10-01T08:00:00Z'
    }
  ],
  categories: [
    { id: 'cat-1', name: 'Sampah Liar Jalanan', code: 'LIAR', description: 'Tumpukan sampah liar di bahu jalan atau lahan kosong', is_active: true },
    { id: 'cat-2', name: 'Sampah Organik', code: 'ORGANIK', description: 'Sisa makanan, dedaunan, ranting, dan limbah pasar basah', is_active: true },
    { id: 'cat-3', name: 'Sampah Anorganik / Plastik', code: 'PLASTIK', description: 'Kemasan plastik, botol kaca, kardus, dan kaleng logam', is_active: true },
    { id: 'cat-4', name: 'Limbah B3 & Medis', code: 'B3', description: 'Baterai bekas, lampu neon, elektronik, jarum/perban', is_active: true },
    { id: 'cat-5', name: 'Puing Bangunan & Residu', code: 'RESIDU', description: 'Pecahan semen, genteng, kayu sisa proyek konstruksi', is_active: true },
    { id: 'cat-6', name: 'Sampah Pasar / Komersial', code: 'PASAR', description: 'Limbah padat kegiatan perdagangan dan pertokoan', is_active: true }
  ],
  reports: [
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
      evidence_before: null,
      evidence_after: null,
      admin_note: null,
      officer_note: null,
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
      evidence_before: null,
      evidence_after: null,
      admin_note: 'Laporan valid, menunggu penugasan regu terdekat Sukarame.',
      officer_note: null,
      created_at: '2026-11-10T11:00:00Z',
      updated_at: '2026-11-10T11:45:00Z'
    }
  ],
  status_histories: [
    {
      id: 'sh-1',
      report_id: 'rep-089',
      changed_by: 'Dr. Erliyan Redy Susanto, M.Kom',
      old_status: 'Menunggu Verifikasi',
      new_status: 'Terverifikasi',
      note: 'Laporan diverifikasi akurat oleh Admin.',
      created_at: '2026-11-09T09:00:00Z'
    },
    {
      id: 'sh-2',
      report_id: 'rep-089',
      changed_by: 'Dr. Erliyan Redy Susanto, M.Kom',
      old_status: 'Terverifikasi',
      new_status: 'Ditugaskan',
      note: 'Ditugaskan ke Petugas Budi Santoso (Regu Rajabasa 01).',
      created_at: '2026-11-09T09:30:00Z'
    },
    {
      id: 'sh-3',
      report_id: 'rep-089',
      changed_by: 'Budi Santoso',
      old_status: 'Ditugaskan',
      new_status: 'Dalam Penanganan',
      note: 'Armada ARM-DLH-07 tiba di lokasi, mulai pengerjaan.',
      created_at: '2026-11-10T09:30:00Z'
    }
  ],
  notifications: [
    {
      id: 'notif-1',
      user_id: 'usr-001',
      title: 'Status Laporan Diperbarui',
      message: 'Laporan Anda LSW-2026-089 di Jl. Raden Intan saat ini sedang Dalam Penanganan oleh Budi Santoso.',
      read_at: null,
      created_at: '2026-11-10T09:30:00Z'
    },
    {
      id: 'notif-2',
      user_id: 'usr-002',
      title: 'Tugas Baru Ditetapkan',
      message: 'Anda mendapatkan tugas penanganan sampah baru di Jl. Raden Intan (LSW-2026-089).',
      read_at: '2026-11-09T10:00:00Z',
      created_at: '2026-11-09T09:30:00Z'
    },
    {
      id: 'notif-3',
      user_id: 'usr-004',
      title: 'Laporan Baru Masuk',
      message: 'Laporan baru LSW-2026-092 di Jl. Sultan Agung membutuhkan verifikasi.',
      read_at: null,
      created_at: '2026-11-10T14:10:00Z'
    }
  ]
};

// Fungsi pembacaan & penyimpanan basis data JSON
function loadData() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading database file:', err);
  }
  saveData(initialData);
  return initialData;
}

function saveData(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving database:', err);
  }
}

// Inisialisasi DB
let db = loadData();

// Helper Response JSON
function sendJSON(res, statusCode, body) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
  });
  res.end(JSON.stringify(body));
}

// Helper Parse Request Body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 10 * 1024 * 1024) { // 10MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        if (!body) return resolve({});
        resolve(JSON.parse(body));
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

// MIME Types untuk Static Files
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown; charset=utf-8'
};

// HTTP Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
    });
    return res.end();
  }

  // ==========================================
  // REST API ROUTING (/api/v1/...)
  // ==========================================

  // 1. Auth: Login
  if (pathname === '/api/v1/auth/login' && method === 'POST') {
    const { email, password } = await parseBody(req);
    const user = db.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase().trim());
    if (!user || user.password_hash !== password) {
      return sendJSON(res, 401, {
        error: { code: 'INVALID_CREDENTIALS', message: 'Email atau kata sandi tidak sesuai.' }
      });
    }
    const token = 'jwt_' + crypto.randomBytes(16).toString('hex');
    return sendJSON(res, 200, {
      data: {
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          points: user.points,
          level: user.level,
          fleet_id: user.fleet_id,
          fleet_name: user.fleet_name
        }
      }
    });
  }

  // 2. Auth: Register
  if (pathname === '/api/v1/auth/register' && method === 'POST') {
    const { full_name, email, password, phone } = await parseBody(req);
    if (!full_name || !email || !password) {
      return sendJSON(res, 422, {
        error: { code: 'VALIDATION_ERROR', message: 'Nama lengkap, email, dan kata sandi wajib diisi.' }
      });
    }
    const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (existing) {
      return sendJSON(res, 409, {
        error: { code: 'EMAIL_ALREADY_EXISTS', message: 'Email sudah terdaftar.' }
      });
    }
    const newUser = {
      id: 'usr-' + Date.now().toString(36),
      full_name,
      email: email.toLowerCase().trim(),
      phone: phone || '',
      password_hash: password,
      role: 'masyarakat',
      is_active: true,
      points: 100, // Bonus sambutan poin warga
      level: 'Warga Baru',
      created_at: new Date().toISOString()
    };
    db.users.push(newUser);
    saveData(db);
    return sendJSON(res, 201, {
      data: {
        message: 'Registrasi berhasil. Silakan masuk.',
        user: { id: newUser.id, full_name: newUser.full_name, email: newUser.email, role: newUser.role }
      }
    });
  }

  // 3. Auth: Current User Profile (/api/v1/me)
  if (pathname === '/api/v1/me' && method === 'GET') {
    const emailHeader = req.headers['x-user-email'];
    const user = db.users.find(u => u.email.toLowerCase() === (emailHeader || 'warga@lampung.go.id').toLowerCase());
    if (!user) {
      return sendJSON(res, 404, { error: { code: 'USER_NOT_FOUND', message: 'Pengguna tidak ditemukan' } });
    }
    return sendJSON(res, 200, { data: user });
  }

  // 4. Categories: List
  if (pathname === '/api/v1/categories' && method === 'GET') {
    return sendJSON(res, 200, { data: db.categories.filter(c => c.is_active) });
  }

  // 5. Reports: Create (/api/v1/reports)
  if (pathname === '/api/v1/reports' && method === 'POST') {
    const body = await parseBody(req);
    const { title, category_id, description, address, latitude, longitude, estimated_volume, photo_url, is_anonymous } = body;
    
    if (!description || !address) {
      return sendJSON(res, 422, {
        error: { code: 'VALIDATION_ERROR', message: 'Deskripsi dan alamat kejadian wajib diisi.' }
      });
    }

    const reporterEmail = req.headers['x-user-email'] || 'warga@lampung.go.id';
    const reporter = db.users.find(u => u.email.toLowerCase() === reporterEmail.toLowerCase()) || db.users[0];
    const category = db.categories.find(c => c.id === category_id) || db.categories[0];

    const ticketNumber = 'LSW-2026-' + (db.reports.length + 90).toString().padStart(3, '0');
    const newReport = {
      id: 'rep-' + Date.now().toString(36),
      ticket_number: ticketNumber,
      reporter_id: reporter.id,
      reporter_name: is_anonymous ? 'Warga Anonim' : reporter.full_name,
      category_id: category.id,
      category_name: category.name,
      title: title || `Laporan ${category.name}`,
      description,
      address,
      latitude: parseFloat(latitude) || -5.4292,
      longitude: parseFloat(longitude) || 105.2625,
      estimated_volume: estimated_volume || '± 1.0 m³',
      priority: 'Sedang',
      status: 'Menunggu Verifikasi',
      assigned_officer_id: null,
      assigned_officer_name: null,
      photo_url: photo_url || 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800&auto=format&fit=crop&q=60',
      evidence_before: photo_url || null,
      evidence_after: null,
      admin_note: null,
      officer_note: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    db.reports.unshift(newReport);

    // Tambah poin bagi warga
    if (reporter.points !== undefined) {
      reporter.points += 25;
    }

    // Catat notifikasi untuk Admin
    db.notifications.unshift({
      id: 'notif-' + Date.now(),
      user_id: 'usr-004',
      title: 'Laporan Baru Masuk',
      message: `Tiket baru ${newReport.ticket_number} masuk dari ${newReport.address}`,
      read_at: null,
      created_at: new Date().toISOString()
    });

    saveData(db);
    return sendJSON(res, 201, { data: newReport });
  }

  // 6. Reports: Mine (Masyarakat)
  if (pathname === '/api/v1/reports/mine' && method === 'GET') {
    const reporterEmail = req.headers['x-user-email'] || 'warga@lampung.go.id';
    const reporter = db.users.find(u => u.email.toLowerCase() === reporterEmail.toLowerCase()) || db.users[0];
    const myReports = db.reports.filter(r => r.reporter_id === reporter.id);
    return sendJSON(res, 200, { data: myReports });
  }

  // 7. Reports: All (Admin & Peta Publik)
  if (pathname === '/api/v1/admin/reports' && method === 'GET') {
    const statusFilter = parsedUrl.query.status;
    let list = db.reports;
    if (statusFilter && statusFilter !== 'Semua') {
      list = list.filter(r => r.status === statusFilter);
    }
    return sendJSON(res, 200, { data: list, total: list.length });
  }

  // 8. Officer Assignments (/api/v1/officer/assignments)
  if (pathname === '/api/v1/officer/assignments' && method === 'GET') {
    const officerEmail = req.headers['x-user-email'] || 'petugas@dlh.bandarlampungkota.go.id';
    const officer = db.users.find(u => u.email.toLowerCase() === officerEmail.toLowerCase()) || db.users[1];
    const assignments = db.reports.filter(r => r.assigned_officer_id === officer.id || r.status === 'Ditugaskan' || r.status === 'Dalam Penanganan');
    return sendJSON(res, 200, { data: assignments, officer });
  }

  // 9. Officer Status Update & Proof Upload (/api/v1/assignments/:id/status)
  const matchOfficerPatch = pathname.match(/^\/api\/v1\/assignments\/([^/]+)\/status$/);
  if (matchOfficerPatch && method === 'PATCH') {
    const reportId = matchOfficerPatch[1];
    const report = db.reports.find(r => r.id === reportId || r.ticket_number === reportId);
    if (!report) {
      return sendJSON(res, 404, { error: { code: 'REPORT_NOT_FOUND', message: 'Laporan tidak ditemukan' } });
    }
    const { status, officer_note, evidence_after } = await parseBody(req);
    const oldStatus = report.status;
    if (status) report.status = status;
    if (officer_note) report.officer_note = officer_note;
    if (evidence_after) report.evidence_after = evidence_after;
    report.updated_at = new Date().toISOString();

    db.status_histories.unshift({
      id: 'sh-' + Date.now(),
      report_id: report.id,
      changed_by: req.headers['x-user-name'] || 'Petugas Lapangan DLH',
      old_status: oldStatus,
      new_status: report.status,
      note: officer_note || `Pembaruan status ke ${report.status}`,
      created_at: new Date().toISOString()
    });

    // Kirim notifikasi ke pelapor
    db.notifications.unshift({
      id: 'notif-' + Date.now(),
      user_id: report.reporter_id,
      title: `Progres Laporan: ${report.ticket_number}`,
      message: `Status laporan Anda kini '${report.status}'. Petugas: ${report.assigned_officer_name || 'DLH'}`,
      read_at: null,
      created_at: new Date().toISOString()
    });

    saveData(db);
    return sendJSON(res, 200, { data: report });
  }

  // 10. Admin Review (/api/v1/admin/reports/:id/review)
  const matchAdminReview = pathname.match(/^\/api\/v1\/admin\/reports\/([^/]+)\/review$/);
  if (matchAdminReview && method === 'PATCH') {
    const reportId = matchAdminReview[1];
    const report = db.reports.find(r => r.id === reportId || r.ticket_number === reportId);
    if (!report) {
      return sendJSON(res, 404, { error: { code: 'REPORT_NOT_FOUND', message: 'Laporan tidak ditemukan' } });
    }
    const { action, admin_note, officer_id } = await parseBody(req);
    const oldStatus = report.status;

    if (action === 'VERIFIKASI') {
      report.status = 'Terverifikasi';
    } else if (action === 'TOLAK') {
      report.status = 'Ditolak';
    } else if (action === 'PERBAIKAN') {
      report.status = 'Perlu Perbaikan';
    } else if (action === 'TUTUP') {
      report.status = 'Ditutup';
    }

    if (admin_note) report.admin_note = admin_note;

    if (officer_id) {
      const officer = db.users.find(u => u.id === officer_id);
      if (officer) {
        report.assigned_officer_id = officer.id;
        report.assigned_officer_name = officer.full_name;
        report.status = 'Ditugaskan';
      }
    }

    report.updated_at = new Date().toISOString();

    db.status_histories.unshift({
      id: 'sh-' + Date.now(),
      report_id: report.id,
      changed_by: req.headers['x-user-name'] || 'Admin DLH Bandar Lampung',
      old_status: oldStatus,
      new_status: report.status,
      note: admin_note || `Verifikasi admin: ${report.status}`,
      created_at: new Date().toISOString()
    });

    saveData(db);
    return sendJSON(res, 200, { data: report });
  }

  // 11. Admin Assign Officer (/api/v1/admin/reports/:id/assignments)
  const matchAdminAssign = pathname.match(/^\/api\/v1\/admin\/reports\/([^/]+)\/assignments$/);
  if (matchAdminAssign && method === 'POST') {
    const reportId = matchAdminAssign[1];
    const report = db.reports.find(r => r.id === reportId || r.ticket_number === reportId);
    if (!report) {
      return sendJSON(res, 404, { error: { code: 'REPORT_NOT_FOUND', message: 'Laporan tidak ditemukan' } });
    }
    const { officer_id, notes } = await parseBody(req);
    const officer = db.users.find(u => u.id === officer_id);
    if (!officer) {
      return sendJSON(res, 404, { error: { code: 'OFFICER_NOT_FOUND', message: 'Petugas tidak ditemukan' } });
    }
    const oldStatus = report.status;
    report.assigned_officer_id = officer.id;
    report.assigned_officer_name = officer.full_name;
    report.status = 'Ditugaskan';
    if (notes) report.admin_note = notes;
    report.updated_at = new Date().toISOString();

    db.status_histories.unshift({
      id: 'sh-' + Date.now(),
      report_id: report.id,
      changed_by: 'Administrator DLH',
      old_status: oldStatus,
      new_status: 'Ditugaskan',
      note: `Ditugaskan kepada ${officer.full_name}. Catatan: ${notes || '-'}`,
      created_at: new Date().toISOString()
    });

    saveData(db);
    return sendJSON(res, 200, { data: report });
  }

  // 12. Admin Dashboard Summary (/api/v1/admin/dashboard/summary)
  if (pathname === '/api/v1/admin/dashboard/summary' && method === 'GET') {
    const total = db.reports.length;
    const menunggu = db.reports.filter(r => r.status === 'Menunggu Verifikasi').length;
    const proses = db.reports.filter(r => ['Terverifikasi', 'Ditugaskan', 'Dalam Penanganan'].includes(r.status)).length;
    const selesai = db.reports.filter(r => ['Selesai', 'Ditutup'].includes(r.status)).length;
    const ditolak = db.reports.filter(r => ['Ditolak', 'Perlu Perbaikan'].includes(r.status)).length;

    return sendJSON(res, 200, {
      data: {
        kpi: {
          total_reports: total,
          waiting_verification: menunggu,
          in_progress: proses,
          completed: selesai,
          rejected: ditolak,
          resolution_rate_percent: total > 0 ? Math.round((selesai / total) * 100) : 0,
          avg_response_hours: 1.4,
          active_fleets: 18
        },
        kecamatan_stats: [
          { name: 'Tj. Karang Pusat', count: 28 },
          { name: 'Kedaton', count: 22 },
          { name: 'Teluk Betung Sel.', count: 19 },
          { name: 'Sukarame', count: 16 },
          { name: 'Way Halim', count: 14 }
        ],
        monthly_trend: [
          { month: 'Jun', count: 42 },
          { month: 'Jul', count: 58 },
          { month: 'Agt', count: 74 },
          { month: 'Sep', count: 86 },
          { month: 'Okt', count: 105 },
          { month: 'Nov', count: 128 }
        ]
      }
    });
  }

  // 13. Admin Users (/api/v1/admin/users)
  if (pathname === '/api/v1/admin/users' && method === 'GET') {
    const usersWithoutPassword = db.users.map(({ password_hash, ...u }) => u);
    return sendJSON(res, 200, { data: usersWithoutPassword });
  }

  // 14. Notifications List & Read
  if (pathname === '/api/v1/notifications' && method === 'GET') {
    return sendJSON(res, 200, { data: db.notifications });
  }
  const matchNotifRead = pathname.match(/^\/api\/v1\/notifications\/([^/]+)\/read$/);
  if (matchNotifRead && method === 'PATCH') {
    const notif = db.notifications.find(n => n.id === matchNotifRead[1]);
    if (notif) notif.read_at = new Date().toISOString();
    saveData(db);
    return sendJSON(res, 200, { data: notif });
  }

  // 15. Base64 Upload Endpoint for Photos
  if (pathname === '/api/v1/upload' && method === 'POST') {
    const { imageBase64, filename } = await parseBody(req);
    if (!imageBase64) {
      return sendJSON(res, 400, { error: { code: 'EMPTY_FILE', message: 'Data gambar kosong.' } });
    }
    const ext = filename && filename.endsWith('.png') ? '.png' : '.jpg';
    const fname = 'upload_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex') + ext;
    const fpath = path.join(UPLOAD_DIR, fname);
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(fpath, Buffer.from(base64Data, 'base64'));
    return sendJSON(res, 200, {
      data: {
        file_path: '/uploads/' + fname,
        url: '/uploads/' + fname
      }
    });
  }

  // ==========================================
  // STATIC FILE SERVING
  // ==========================================
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = 'index.html';
  }

  const filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found: ' + pathname);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🌿 Lampung Smart Waste Server is running on port ${PORT}`);
  console.log(`📡 URL Master:    http://localhost:${PORT}`);
  console.log(`👥 Portal Warga:  http://localhost:${PORT}/customer.html`);
  console.log(`🔐 Admin Control: http://localhost:${PORT} (Switch to Admin)`);
  console.log(`=======================================================`);
});

