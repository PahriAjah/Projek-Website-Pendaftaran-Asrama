import { PrismaClient } from '@prisma/client';
import './galeri.css';

const prisma = new PrismaClient();
export const revalidate = 60;

export default async function GaleriPage() {
  const galeri = await prisma.galeri.findMany({
    orderBy: { id: 'desc' }
  });

  return (
    <div className="section bg-light">
      <div className="container">
        <div className="title-section">
          <h2>Galeri Asrama</h2>
          <p>Potret kegiatan dan fasilitas di Baitu 'Usyaqil Qur'an.</p>
        </div>

        <div className="galeri-grid">
          {galeri.length > 0 ? galeri.map(g => (
            <div key={g.id} className="galeri-item">
              <div className="img-wrapper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.urlFoto} alt={g.caption || 'Foto Asrama'} loading="lazy" />
              </div>
              <div className="galeri-info">
                <span className="kategori">{g.kategori}</span>
                {g.caption && <p>{g.caption}</p>}
              </div>
            </div>
          )) : (
            <p className="empty-state" style={{ gridColumn: '1/-1' }}>Belum ada foto di galeri.</p>
          )}
        </div>
      </div>
    </div>
  );
}
