-- CreateTable
CREATE TABLE "Kamar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "namaTipe" TEXT NOT NULL,
    "kapasitas" INTEGER NOT NULL,
    "harga" TEXT NOT NULL,
    "fasilitas" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "statusTersedia" BOOLEAN NOT NULL DEFAULT true,
    "sisaSlot" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Pendaftar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "tanggalLahir" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "noHp" TEXT NOT NULL,
    "noHpWali" TEXT NOT NULL,
    "pendidikanSekarang" TEXT NOT NULL,
    "kamarPilihanId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Baru',
    "catatanAdmin" TEXT,
    "tanggalDaftar" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Pendaftar_kamarPilihanId_fkey" FOREIGN KEY ("kamarPilihanId") REFERENCES "Kamar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "JadwalKegiatan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "judul" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "kitab" TEXT,
    "tanggalHari" TEXT NOT NULL,
    "jam" TEXT NOT NULL,
    "wajibOpsional" TEXT NOT NULL DEFAULT 'Wajib'
);

-- CreateTable
CREATE TABLE "Pengumuman" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "judul" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "tanggalPublish" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Galeri" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "urlFoto" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "caption" TEXT
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");
