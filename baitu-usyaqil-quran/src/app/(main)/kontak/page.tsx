import ScrollReveal from '@/components/ScrollReveal';
import './kontak.css';

export default function KontakPage() {
  return (
    <div className="section">
      <div className="container">
        <ScrollReveal>
          <div className="title-section">
            <h2>Kontak Kami</h2>
            <p>Hubungi pengurus Baitu 'Usyaqil Qur'an untuk informasi lebih lanjut.</p>
          </div>
        </ScrollReveal>

        <div className="kontak-wrapper">
          <ScrollReveal delay={0.1}>
            <div className="kontak-info-card">
            <h3>Informasi Kontak</h3>
            <div className="info-item">
              <span className="icon">📍</span>
              <div>
                <h4>Alamat Lengkap</h4>
                <p>Jl. Pesantren No.1, Kota Islami, Provinsi Damai</p>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">📱</span>
              <div>
                <h4>WhatsApp</h4>
                <p><a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">+62 812 3456 7890</a></p>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">🕒</span>
              <div>
                <h4>Jam Operasional</h4>
                <p>Senin - Minggu: 08.00 - 20.00 WIB</p>
              </div>
            </div>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="btn btn-primary btn-block mt-4" style={{ textAlign: 'center' }}>
              Chat via WhatsApp
            </a>
          </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="map-card">
              {/* Dummy Map Embed for MVP */}
              <div className="map-placeholder">
                <p>Peta Lokasi Google Maps</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
