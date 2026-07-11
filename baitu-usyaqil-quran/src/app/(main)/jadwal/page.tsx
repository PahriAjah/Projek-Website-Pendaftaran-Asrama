import { PrismaClient } from '@prisma/client';
import './jadwal.css';

const prisma = new PrismaClient();
export const revalidate = 60;

export default async function JadwalPage() {
  const jadwal = await prisma.jadwalKegiatan.findMany({
    orderBy: { tanggalHari: 'asc' }
  });

  return (
    <div className="section bg-light">
      <div className="container">
        <div className="title-section">
          <h2>Jadwal & Kegiatan</h2>
          <p>Kegiatan rutin dan kajian kitab di Baitu 'Usyaqil Qur'an</p>
        </div>

        <div className="jadwal-grid">
          {jadwal.length > 0 ? jadwal.map(j => (
            <div key={j.id} className="jadwal-card">
              <div className="jadwal-time">
                <span className="day">{j.tanggalHari}</span>
                <span className="time">{j.jam}</span>
              </div>
              <div className="jadwal-info">
                <h3>{j.judul}</h3>
                {j.kitab && <p className="kitab">Kitab: {j.kitab}</p>}
                <div className="tags">
                  <span className="tag type">{j.jenis}</span>
                  <span className={`tag wajib ${j.wajibOpsional.toLowerCase()}`}>{j.wajibOpsional}</span>
                </div>
              </div>
            </div>
          )) : (
            <p className="empty-state">Belum ada jadwal kegiatan.</p>
          )}
        </div>
      </div>
    </div>
  );
}
