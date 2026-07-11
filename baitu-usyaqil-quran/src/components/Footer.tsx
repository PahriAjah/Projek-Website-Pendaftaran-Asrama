import Link from 'next/link';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>Baitu 'Usyaqil Qur'an</h3>
          <p>Asrama Islami untuk Santri Putra. Tempat menimba ilmu dengan nilai-nilai Islami, mengaji, dan kajian kitab kuning.</p>
        </div>
        <div className="footer-section">
          <h3>Tautan Cepat</h3>
          <ul>
            <li><Link href="/kamar">Info Kamar</Link></li>
            <li><Link href="/jadwal">Jadwal & Kegiatan</Link></li>
            <li><Link href="/galeri">Galeri</Link></li>
            <li><Link href="/daftar">Pendaftaran</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Kontak Kami</h3>
          <p>WhatsApp: +62 812 3456 7890</p>
          <p>Email: info@baitusyaqilquran.com</p>
          <p>Alamat: Jl. Pesantren No.1, Kota Islami</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Asrama Baitu 'Usyaqil Qur'an. All rights reserved.</p>
      </div>
    </footer>
  );
}
