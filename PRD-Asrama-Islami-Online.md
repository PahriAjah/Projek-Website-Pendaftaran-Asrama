# Product Requirements Document (PRD)
# Website Asrama Islami Online

**Versi:** 1.0
**Tanggal:** 11 Juli 2026
**Status:** Perencanaan

---

## 1. Ringkasan Produk

Website informasi & pendaftaran online untuk Asrama Islami — hunian berbasis nilai Islami (ada kegiatan mengaji dan kajian kitab) namun dengan aturan yang lebih fleksibel dibanding pondok pesantren pada umumnya. Target penghuni adalah **santri putra**.

Website ini berfungsi sebagai etalase informasi (kamar, harga, fasilitas, kegiatan) sekaligus kanal pendaftaran, dilengkapi dashboard admin agar pengurus dapat mengelola data secara mandiri tanpa bergantung pada developer.

## 2. Latar Belakang & Masalah yang Diselesaikan

- Calon santri/wali santri kesulitan mendapat informasi kamar, harga, dan jadwal kegiatan secara cepat dan terpercaya.
- Proses pendaftaran & tanya-jawab saat ini kemungkinan masih manual (WhatsApp/datang langsung), sehingga rawan miskomunikasi dan sulit dilacak.
- Pengurus butuh cara mudah memperbarui info kamar, pengumuman, dan melihat data pendaftar tanpa harus minta bantuan teknis setiap saat.

## 3. Tujuan Produk

1. Memberikan informasi asrama yang lengkap, jelas, dan mudah diakses kapan saja.
2. Mempermudah proses pendaftaran calon santri secara online (form digital, tanpa pembayaran online — pembayaran dilakukan offline/langsung setelah dikonfirmasi pengurus).
3. Memberi pengurus kendali penuh atas konten (kamar, harga, jadwal, pengumuman, data pendaftar) lewat dashboard admin.
4. Membangun kepercayaan calon wali santri lewat transparansi (foto, jadwal kegiatan, kontak pengurus yang jelas).

## 4. Target Pengguna

| Persona | Deskripsi | Kebutuhan Utama |
|---|---|---|
| **Calon Santri / Wali Santri** | Orang tua atau calon santri yang mencari asrama untuk anak/dirinya | Info kamar & harga jelas, jadwal kegiatan, foto asli, cara daftar mudah, kontak cepat direspon |
| **Pengurus Asrama (Admin)** | Pengelola harian asrama | Kelola data kamar, verifikasi pendaftar, publish pengumuman, pantau jadwal kegiatan |
| **Pengunjung Umum** | Orang yang sekadar ingin tahu / membandingkan asrama | Info umum tanpa perlu daftar |

## 5. Ruang Lingkup (Scope)

### Fase 1 — MVP (Publik + Pendaftaran)
- Beranda
- Info Kamar & Harga
- Jadwal Kegiatan & Mengaji
- Galeri Foto Asrama
- Pendaftaran (form online, tanpa pembayaran online)
- Kontak Pengurus
- Pengumuman & Aktivitas
- **Dashboard Admin** (dipindah ke Fase 1 karena pengurus butuh kelola mandiri sejak awal)

### Fase 2 — Pengembangan Lanjutan (di luar cakupan awal, dicatat sebagai referensi ke depan)
- Pembayaran online (transfer otomatis/QRIS) — *saat ini sengaja tidak dipakai, pembayaran dilakukan manual/offline*
- Akun login untuk santri aktif (lihat tagihan, jadwal pribadi, absensi mengaji)
- Notifikasi WhatsApp/email otomatis
- Sistem absensi kegiatan mengaji digital
- Multi-cabang asrama (jika ekspansi)

---

## 6. Rincian Fitur

### 6.1 Beranda Asrama
**Tujuan:** Kesan pertama yang meyakinkan + jalan pintas menuju pendaftaran.

| Sub Fitur | Detail |
|---|---|
| Ringkasan Asrama | Deskripsi singkat asrama: nilai Islami yang diusung, lokasi, keunggulan (tidak seketat pondok, tetap ada mengaji & kajian kitab) |
| Galeri Unggulan | 4–6 foto pilihan (bangunan, suasana mengaji, kamar) diambil otomatis dari Galeri Foto |
| Tombol Daftar | CTA menonjol menuju form Pendaftaran |
| **[Tambahan]** Info Singkat Kuota | Badge status kamar: "Tersedia" / "Terbatas" / "Penuh" agar calon santri tahu urgensi |
| **[Tambahan]** Testimoni Singkat | 2–3 kutipan singkat dari santri/wali santri (opsional, meningkatkan kepercayaan) |

### 6.2 Info Kamar & Harga
| Sub Fitur | Detail |
|---|---|
| Daftar Tipe Kamar | Misal: Kamar Reguler (isi 4), Kamar VIP (isi 2), dll. Tampilkan kapasitas & sisa slot |
| Detail Harga & Fasilitas | Harga per bulan/tahun, apa saja yang termasuk (listrik, air, wifi, laundry, makan/tidak) |
| Foto Kamar | Minimal 2–3 foto per tipe kamar |
| **[Tambahan]** Status Ketersediaan Real-time | Terhubung ke data admin — otomatis update saat kamar terisi/kosong |
| **[Tambahan]** Perbandingan Tipe Kamar | Tabel bandingkan antar tipe kamar agar mudah memilih |

### 6.3 Jadwal Kegiatan & Mengaji
| Sub Fitur | Detail |
|---|---|
| Jadwal Harian Mengaji | Waktu mengaji, kitab yang dikaji, nama ustadz/pengajar (jika ada) |
| Kegiatan Khusus | Kajian mingguan, kegiatan sosial, olahraga bersama, dll |
| Kalender Bulanan | Tampilan kalender berisi agenda satu bulan |
| **[Tambahan]** Daftar Kitab yang Diajarkan | Karena ada unsur kitab kuning/klasik, tampilkan daftar kitab & tingkat (dasar/menengah) agar calon santri tahu materi yang dipelajari |
| **[Tambahan]** Filter Kegiatan | Filter berdasarkan jenis (wajib/opsional) agar terlihat fleksibilitas asrama (sesuai konsep "tidak seketat pondok") |

### 6.4 Galeri Foto Asrama
| Sub Fitur | Detail |
|---|---|
| Foto Bangunan & Fasilitas | Kamar mandi, dapur, musala/aula mengaji, area belajar, dll |
| Foto Kegiatan | Momen mengaji, kajian, kegiatan santai/olahraga |
| Foto Pemilik/Pengurus Asrama | Membangun kepercayaan & keterbukaan |
| **[Tambahan]** Kategori Filter Galeri | Tab: Semua / Bangunan / Kegiatan / Pengurus |

### 6.5 Pendaftaran
**Catatan:** Tanpa pembayaran online — pembayaran/DP dilakukan langsung ke pengurus setelah data diverifikasi.

| Sub Fitur | Detail |
|---|---|
| Formulir Data Diri | Nama lengkap, tanggal lahir, alamat, nomor HP aktif, nomor HP orang tua/wali, sekolah/pekerjaan, kontak darurat |
| Pilih Kamar | Pilih tipe kamar sesuai ketersediaan (terhubung ke data admin) |
| Konfirmasi Pendaftaran | Ringkasan data sebelum submit + info bahwa pembayaran dilakukan offline setelah dihubungi pengurus |
| **[Tambahan]** Upload Dokumen | Upload foto/scan KTP/KK atau kartu pelajar (opsional, tergantung kebutuhan verifikasi) |
| **[Tambahan]** Status Pendaftaran | Setelah submit, calon santri dapat nomor pendaftaran untuk ditanyakan statusnya (Diterima/Diproses/Ditolak) via halaman cek status atau WhatsApp |
| **[Tambahan]** Notifikasi ke Admin | Setiap pendaftaran baru masuk ke dashboard admin secara real-time |

### 6.6 Kontak Pengurus
| Sub Fitur | Detail |
|---|---|
| Informasi Kontak | Nomor WhatsApp, alamat lengkap, peta lokasi (Google Maps embed), jam operasional |
| Formulir Pesan Singkat | Form tanya-jawab cepat tanpa harus mendaftar dulu |
| **[Tambahan]** Tombol WhatsApp Langsung | Link `wa.me` agar calon santri bisa langsung chat pengurus |

### 6.7 Pengumuman & Aktivitas
| Sub Fitur | Detail |
|---|---|
| Daftar Pengumuman Terbaru | List pengumuman terbaru (misal: pendaftaran dibuka, libur kegiatan, dll) |
| Pengumuman Penting | Pengumuman yang di-pin/highlight di atas |
| Aktivitas Terakhir | Update kegiatan yang baru berlangsung (semacam mini blog/log kegiatan) |
| **[Tambahan]** Kategori Pengumuman | Tag: Pendaftaran / Kegiatan / Umum agar mudah disaring |

### 6.8 Dashboard Admin *(Baru — Fase 1)*
Karena pengurus perlu kelola data sendiri, berikut modul yang dibutuhkan:

| Modul | Fungsi |
|---|---|
| Login Admin | Autentikasi aman (username/password, idealnya dengan role: Super Admin & Pengurus biasa) |
| Kelola Kamar | Tambah/edit/hapus tipe kamar, update harga, update status ketersediaan, upload foto kamar |
| Kelola Pendaftar | Lihat daftar calon santri yang mendaftar, ubah status (Baru → Diproses → Diterima/Ditolak), catatan internal, kontak cepat via WhatsApp |
| Kelola Jadwal & Kegiatan | Tambah/edit jadwal mengaji, kitab, kegiatan khusus, kalender |
| Kelola Galeri | Upload/hapus foto, atur kategori |
| Kelola Pengumuman | Tulis, edit, hapus, pin pengumuman |
| Kelola Kontak | Update nomor WhatsApp, alamat, jam operasional |
| Dashboard Ringkasan | Statistik singkat: jumlah pendaftar baru, kamar tersisa, pengumuman aktif |

---

## 7. Alur Pengguna Utama (User Flow)

**Alur Calon Santri:**
1. Buka Beranda → lihat ringkasan & galeri unggulan
2. Cek Info Kamar & Harga → pilih tipe yang cocok
3. Lihat Jadwal Kegiatan & Kitab yang diajarkan (menilai kecocokan)
4. (Opsional) Lihat Galeri Foto untuk memastikan kondisi asrama
5. Isi Formulir Pendaftaran → pilih kamar → submit
6. Dapat nomor pendaftaran / notifikasi konfirmasi
7. Dihubungi pengurus via WhatsApp untuk proses lanjut & pembayaran offline

**Alur Pengurus (Admin):**
1. Login ke dashboard
2. Cek notifikasi pendaftar baru
3. Verifikasi data → hubungi calon santri → update status
4. Update ketersediaan kamar jika ada yang diterima
5. Kelola pengumuman/jadwal sesuai kebutuhan

---

## 8. Struktur Data (Gambaran Awal)

- **Kamar**: id, nama_tipe, kapasitas, harga, fasilitas[], foto[], status_tersedia, sisa_slot
- **Pendaftar**: id, nama, tanggal_lahir, alamat, no_hp, no_hp_wali, sekolah/pekerjaan, kamar_pilihan_id, dokumen_upload, status (baru/diproses/diterima/ditolak), catatan_admin, tanggal_daftar
- **Jadwal Kegiatan**: id, judul, jenis (mengaji/kajian/khusus), kitab (jika ada), tanggal/hari, jam, wajib/opsional
- **Pengumuman**: id, judul, isi, kategori, pinned (boolean), tanggal_publish
- **Galeri**: id, url_foto, kategori (bangunan/kegiatan/pengurus), caption
- **Admin User**: id, username, password_hash, role

---

## 9. Kebutuhan Non-Fungsional

- **Responsif**: Wajib mobile-friendly (mayoritas calon wali santri akan akses via HP).
- **Kecepatan**: Halaman utama & galeri harus ringan (kompresi gambar).
- **Keamanan**: Data pribadi pendaftar (KTP, KK) harus disimpan aman, akses dashboard admin wajib pakai autentikasi.
- **Kemudahan Kelola**: Admin non-teknis harus bisa update kamar/pengumuman tanpa bantuan developer.
- **Bahasa**: Bahasa Indonesia, nuansa Islami namun tetap ramah/tidak kaku.

## 10. Metrik Keberhasilan (KPI)

- Jumlah pendaftar online per bulan
- Tingkat konversi: pengunjung → isi form pendaftaran
- Waktu rata-rata pengurus merespons pendaftar baru
- Jumlah kamar yang berhasil terisi lewat jalur online

## 11. Pertanyaan Terbuka / Perlu Diputuskan Selanjutnya

- Apakah perlu verifikasi dokumen (KTP/KK/kartu pelajar) saat pendaftaran, atau cukup data manual dulu?
- Apakah ada batas usia/kriteria khusus calon santri yang perlu divalidasi di form?
- Apakah dashboard admin perlu multi-role (misal: pengurus kamar vs pengurus pendaftaran) atau cukup satu akun admin untuk semua?
- Nama domain & branding (logo, warna khas asrama) untuk desain visual website?

---

*Dokumen ini adalah revisi dari mind map awal, dengan penyesuaian: target santri putra, tanpa pembayaran online (pembayaran offline setelah verifikasi), dan Dashboard Admin dimasukkan ke Fase 1.*
