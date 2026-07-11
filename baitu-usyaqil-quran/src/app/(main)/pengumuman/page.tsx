import { PrismaClient } from '@prisma/client';
import './pengumuman.css';

const prisma = new PrismaClient();
export const revalidate = 60;

export default async function PengumumanPage() {
  const pengumumans = await prisma.pengumuman.findMany({
    orderBy: [
      { pinned: 'desc' },
      { tanggalPublish: 'desc' }
    ]
  });

  return (
    <div className="section">
      <div className="container">
        <div className="title-section">
          <h2>Pengumuman & Info Terbaru</h2>
          <p>Informasi seputar pendaftaran dan kegiatan asrama.</p>
        </div>

        <div className="pengumuman-list">
          {pengumumans.length > 0 ? pengumumans.map(p => (
            <div key={p.id} className={`pengumuman-card ${p.pinned ? 'pinned' : ''}`}>
              <div className="pengumuman-header">
                <span className="kategori">{p.kategori}</span>
                <span className="tanggal">{new Date(p.tanggalPublish).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <h3>{p.pinned && '📌 '}{p.judul}</h3>
              <p className="isi">{p.isi}</p>
            </div>
          )) : (
            <p className="empty-state">Belum ada pengumuman.</p>
          )}
        </div>
      </div>
    </div>
  );
}
