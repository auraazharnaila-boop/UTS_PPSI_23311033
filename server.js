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

try {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
} catch (e) {
  // Ignore in read-only environments like Vercel
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
  ],
  notifications: [
    {
      id: 'notif-1',
      user_id: 'usr-001',
      title: 'Status Laporan Diperbarui',
      message: 'Laporan Anda LSW-2026-089 di Jl. Raden Intan saat ini sedang Dalam Penanganan oleh Budi Santoso.',
      read_at: null,
      created_at: '2026-11-10T09:30:00Z'
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
  } catch (err) {}
  saveData(initialData);
  return initialData;
}

function saveData(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    // Fail gracefully on read-only cloud/serverless environments
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
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, x-user-email, x-user-name'
  });
  res.end(JSON.stringify(body));
}

// Helper Parse Request Body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 10 * 1024 * 1024) reject(new Error('Payload too large'));
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

const requestHandler = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, x-user-email, x-user-name'
    });
    return res.end();
  }

  // REST API
  if (pathname === '/api/v1/auth/login' && method === 'POST') {
    const { email, password } = await parseBody(req);
    const user = db.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase().trim());
    if (!user || user.password_hash !== password) {
      return sendJSON(res, 401, { error: { code: 'INVALID_CREDENTIALS', message: 'Email atau kata sandi tidak sesuai.' } });
    }
    return sendJSON(res, 200, { data: { token: 'jwt_' + crypto.randomBytes(16).toString('hex'), user } });
  }

  if (pathname === '/api/v1/categories' && method === 'GET') {
    return sendJSON(res, 200, { data: db.categories.filter(c => c.is_active) });
  }

  if (pathname === '/api/v1/reports' && method === 'POST') {
    const body = await parseBody(req);
    const category = db.categories.find(c => c.id === body.category_id) || db.categories[0];
    const newReport = {
      id: 'rep-' + Date.now().toString(36),
      ticket_number: 'LSW-2026-' + (db.reports.length + 90).toString().padStart(3, '0'),
      reporter_id: 'usr-001',
      reporter_name: body.is_anonymous ? 'Warga Anonim' : 'Aura Azhar Naila',
      category_id: category.id,
      category_name: category.name,
      title: body.title || `Laporan ${category.name}`,
      description: body.description || '',
      address: body.address || 'Kota Bandar Lampung',
      latitude: parseFloat(body.latitude) || -5.4292,
      longitude: parseFloat(body.longitude) || 105.2625,
      estimated_volume: body.estimated_volume || '± 1.0 m³',
      priority: 'Sedang',
      status: 'Menunggu Verifikasi',
      photo_url: body.photo_url || 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    db.reports.unshift(newReport);
    saveData(db);
    return sendJSON(res, 201, { data: newReport });
  }

  if (pathname === '/api/v1/admin/reports' && method === 'GET') {
    return sendJSON(res, 200, { data: db.reports, total: db.reports.length });
  }

  if (pathname === '/api/v1/notifications' && method === 'GET') {
    return sendJSON(res, 200, { data: db.notifications });
  }

  // Static File Serving
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') safePath = 'index.html';

  const filePath = path.join(__dirname, safePath);
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found: ' + pathname);
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
};

const server = http.createServer(requestHandler);

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🌿 Lampung Smart Waste Server is running on port ${PORT}`);
    console.log(`📡 URL Master:    http://localhost:${PORT}`);
    console.log(`👥 Portal Warga:  http://localhost:${PORT}/customer.html`);
    console.log(`=======================================================`);
  });
}

module.exports = server;
