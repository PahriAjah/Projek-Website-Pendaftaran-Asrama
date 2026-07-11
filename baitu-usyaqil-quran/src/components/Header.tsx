'use client';

import { useState } from 'react';
import Link from 'next/link';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="logo" onClick={closeMenu}>
          Baitu 'Usyaqil Qur'an
        </Link>
        
        {/* Hamburger Icon */}
        <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li><Link href="/" onClick={closeMenu}>Beranda</Link></li>
            <li><Link href="/kamar" onClick={closeMenu}>Info Kamar</Link></li>
            <li><Link href="/jadwal" onClick={closeMenu}>Jadwal & Kegiatan</Link></li>
            <li><Link href="/galeri" onClick={closeMenu}>Galeri</Link></li>
            <li><Link href="/pengumuman" onClick={closeMenu}>Pengumuman</Link></li>
            <li><Link href="/kontak" onClick={closeMenu}>Kontak</Link></li>
          </ul>
          <div className="header-actions-mobile">
            <Link href="/daftar" className="btn btn-primary" onClick={closeMenu}>Daftar Sekarang</Link>
          </div>
        </nav>
        
        <div className="header-actions-desktop">
          <Link href="/daftar" className="btn btn-primary">Daftar Sekarang</Link>
        </div>
      </div>
    </header>
  );
}
