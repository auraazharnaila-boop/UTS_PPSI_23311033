-- =============================================================================
-- LAMPUNG SMART WASTE - DATABASE SCHEMA (POSTGRESQL DDL)
-- Sesuai Bab 9 PRD: PostgreSQL dengan UUID, Check Constraints, Foreign Keys & Indeks
-- =============================================================================

-- 1. Ekstensi UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tipe Enum Peran dan Status
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('masyarakat', 'petugas', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE report_status AS ENUM (
        'Menunggu Verifikasi',
        'Perlu Perbaikan',
        'Ditolak',
        'Terverifikasi',
        'Ditugaskan',
        'Dalam Penanganan',
        'Selesai',
        'Ditutup'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Tabel Users
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(25),
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'masyarakat',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    points INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Tabel Kategori Sampah (waste_categories)
CREATE TABLE IF NOT EXISTS waste_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(30) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Tabel Laporan (reports)
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    category_id UUID NOT NULL REFERENCES waste_categories(id) ON DELETE RESTRICT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    estimated_volume VARCHAR(100),
    priority VARCHAR(20) DEFAULT 'Sedang',
    status report_status NOT NULL DEFAULT 'Menunggu Verifikasi',
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_lat CHECK (latitude BETWEEN -90 AND 90),
    CONSTRAINT chk_lng CHECK (longitude BETWEEN -180 AND 180)
);

-- 6. Tabel Lampiran Foto Bukti (report_attachments)
CREATE TABLE IF NOT EXISTS report_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    uploaded_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    file_path TEXT NOT NULL,
    mime_type VARCHAR(50) NOT NULL,
    file_size BIGINT,
    attachment_type VARCHAR(30) NOT NULL CHECK (attachment_type IN ('pelapor', 'bukti_sebelum', 'bukti_sesudah')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Tabel Penugasan Petugas (assignments)
CREATE TABLE IF NOT EXISTS assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    officer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    assigned_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    assignment_status VARCHAR(30) NOT NULL DEFAULT 'Aktif',
    notes TEXT,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Tabel Histori Perubahan Status (status_histories)
CREATE TABLE IF NOT EXISTS status_histories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    changed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    old_status report_status,
    new_status report_status NOT NULL,
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Tabel Notifikasi (notifications)
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Indeks Performa
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_reports_ticket ON reports(ticket_number);
CREATE INDEX IF NOT EXISTS idx_reports_status_created ON reports(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_reporter ON reports(reporter_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assignments_officer ON assignments(officer_id, assignment_status);
CREATE INDEX IF NOT EXISTS idx_status_histories_report ON status_histories(report_id, created_at ASC);

-- 11. Seed Data Awal
INSERT INTO waste_categories (name, code, description) VALUES
('Sampah Liar Jalanan', 'LIAR', 'Tumpukan sampah liar di bahu jalan atau lahan kosong'),
('Sampah Organik', 'ORGANIK', 'Sisa makanan, dedaunan, ranting, dan limbah sayur'),
('Sampah Anorganik / Plastik', 'PLASTIK', 'Kemasan plastik, botol kaca, kardus, dan kaleng logam'),
('Limbah B3 & Medis', 'B3', 'Baterai bekas, lampu neon, elektronik, jarum/perban'),
('Puing Bangunan & Residu', 'RESIDU', 'Pecahan semen, genteng, kayu sisa proyek konstruksi'),
('Sampah Pasar / Komersial', 'PASAR', 'Limbah padat kegiatan perdagangan dan pertokoan')
ON CONFLICT (code) DO NOTHING;

