import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import './kamar.css';

const prisma = new PrismaClient();

export const revalidate = 60;

export default async function KamarPage() {
  const kamars = await prisma.kamar.findMany();

  return (
    <div className="section">
      <div className="container">
        <ScrollReveal>
          <div className="title-section">
            <h2>Informasi Kamar & Harga</h2>
            <p>Pilih kamar yang sesuai dengan kebutuhan Anda. Kuota terbatas.</p>
          </div>
        </ScrollReveal>

        <div className="kamar-list">
          {kamars.length > 0 ? kamars.map((kamar, index) => (
            <ScrollReveal key={kamar.id} delay={index * 0.1}>
              <div className="kamar-detail-card">
              <div className="kamar-header">
                <h3>{kamar.namaTipe}</h3>
                <div className={`status-badge ${kamar.statusTersedia ? 'tersedia' : 'penuh'}`}>
                  {kamar.statusTersedia ? `Sisa ${kamar.sisaSlot} Slot` : 'Penuh'}
                </div>
              </div>
              
              <div className="kamar-body">
                <div className="kamar-info">
                  <div className="info-group">
                    <span className="info-label">Harga</span>
                    <span className="info-value price">{kamar.harga}</span>
                  </div>
                  <div className="info-group">
                    <span className="info-label">Kapasitas</span>
                    <span className="info-value">{kamar.kapasitas} Orang / Kamar</span>
                  </div>
                  <div className="info-group">
                    <span className="info-label">Fasilitas</span>
                    <span className="info-value">{kamar.fasilitas}</span>
                  </div>
                </div>
                
                <div className="kamar-action">
                  {kamar.statusTersedia ? (
                    <Link href={`/daftar?kamar=${kamar.id}`} className="btn btn-primary">Daftar Kamar Ini</Link>
                  ) : (
                    <button className="btn btn-secondary" disabled>Kamar Penuh</button>
                  )}
                </div>
              </div>
            </div>
            </ScrollReveal>
          )) : (
            <p className="empty-state">Belum ada informasi kamar.</p>
          )}
        </div>
      </div>
    </div>
  );
}
