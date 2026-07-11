'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="container header-content">
        {/* Hamburger Icon */}
        <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <Link href="/" className="logo" onClick={closeMenu}>
          <Image 
            src="/images/logo.png" 
            alt="Logo BUQ" 
            width={60} 
            height={60} 
            className="logo-img"
          />
          <span className="logo-text">Baitu 'Usyaqil Qur'an</span>
        </Link>

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
