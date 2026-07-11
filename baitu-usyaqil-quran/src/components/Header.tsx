import Link from 'next/link';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="logo">
          Baitu 'Usyaqil Qur'an
        </Link>
        <nav className="nav">
          <ul className="nav-list">
            <li><Link href="/">Beranda</Link></li>
            <li><Link href="/kamar">Info Kamar</Link></li>
            <li><Link href="/jadwal">Jadwal & Kegiatan</Link></li>
            <li><Link href="/galeri">Galeri</Link></li>
            <li><Link href="/pengumuman">Pengumuman</Link></li>
            <li><Link href="/kontak">Kontak</Link></li>
          </ul>
        </nav>
        <div className="header-actions">
          <Link href="/daftar" className="btn btn-primary">Daftar Sekarang</Link>
        </div>
      </div>
    </header>
  );
}
