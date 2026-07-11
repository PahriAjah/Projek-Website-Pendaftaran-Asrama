import Link from 'next/link';
import './page.css';
import { PrismaClient } from '@prisma/client';
import LightboxGallery from '@/components/LightboxGallery';

const prisma = new PrismaClient();

export const revalidate = 60; // revalidate every 60 seconds

export default async function Home() {
  const kamars = await prisma.kamar.findMany({
    take: 3,
    where: { statusTersedia: true },
  });

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Selamat Datang di Asrama Islami<br/><span>Baitu 'Usyaqil Qur'an</span></h1>
          <p>Hunian nyaman, aman, dan barokah untuk santri putra. Dilengkapi dengan kegiatan mengaji dan kajian kitab untuk membentuk generasi Qur'ani.</p>
          <div className="hero-actions">
            <Link href="/daftar" className="btn btn-primary btn-lg">Daftar Sekarang</Link>
            <Link href="/kamar" className="btn btn-secondary btn-lg">Lihat Info Kamar</Link>
          </div>
        </div>
      </section>

      {/* Ringkasan Section */}
      <section className="section bg-light" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="floating-icon icon-1"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6v15c0 1.1.9 2 2 2h14v-2H6v-14.82A3.99 3.99 0 0 0 4 6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8zm0-3h8v2h-8z"/></svg></div>
        <div className="floating-icon icon-2"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.18-1.19V17h2V8.46L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg></div>
        <div className="floating-icon icon-3"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg></div>
        <div className="floating-icon icon-4"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="title-section">
            <h2>Tentang Kami</h2>
            <p>Mengenal lebih dekat Baitu 'Usyaqil Qur'an</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📖</div>
              <h3>Kajian Kitab</h3>
              <p>Fokus pada pembelajaran Al-Qur'an dan kitab kuning secara mendalam namun dengan jadwal yang fleksibel.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Lingkungan Islami</h3>
              <p>Membangun adab dan akhlakul karimah dalam pergaulan sehari-hari antar sesama santri.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Fasilitas Nyaman</h3>
              <p>Kamar yang bersih dan fasilitas asrama yang memadai untuk mendukung aktivitas belajar santri.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ketersediaan Kamar Terbatas */}
      <section className="section">
        <div className="container">
          <div className="title-section">
            <h2>Kamar Tersedia</h2>
            <p>Segera daftarkan diri Anda sebelum kuota penuh</p>
          </div>
          <div className="kamar-grid">
            {kamars.length > 0 ? (
              kamars.map(kamar => (
                <div key={kamar.id} className="kamar-card">
                  <div className="kamar-badge">Sisa {kamar.sisaSlot} slot</div>
                  <div className="kamar-content">
                    <h3>{kamar.namaTipe}</h3>
                    <p className="kamar-price">{kamar.harga}</p>
                    <p className="kamar-cap">Kapasitas: {kamar.kapasitas} orang</p>
                    <Link href={`/daftar?kamar=${kamar.id}`} className="btn btn-primary btn-block">Pilih Kamar</Link>
                  </div>
                </div>
              ))
            ) : (
              <p style={{textAlign: 'center', gridColumn: '1 / -1'}}>Belum ada data kamar tersedia.</p>
            )}
          </div>
        </div>
      </section>

      {/* Galeri Preview Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="title-section">
            <h2>Galeri Estetik</h2>
            <p>Mengintip suasana kehidupan santri di Baitu 'Usyaqil Qur'an</p>
          </div>
          
          <LightboxGallery />

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/galeri" className="btn btn-secondary">Lihat Semua Galeri</Link>
          </div>
        </div>
      </section>

    </>
  );
}
