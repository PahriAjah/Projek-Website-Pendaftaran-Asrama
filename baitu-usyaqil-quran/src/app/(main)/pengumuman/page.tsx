import { PrismaClient } from '@prisma/client';
import ScrollReveal from '@/components/ScrollReveal';
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
        <ScrollReveal>
          <div className="title-section">
            <h2>Pengumuman & Info Terbaru</h2>
            <p>Informasi seputar pendaftaran dan kegiatan asrama.</p>
          </div>
        </ScrollReveal>

        <div className="pengumuman-list">
          {pengumumans.length > 0 ? pengumumans.map((p, index) => (
            <ScrollReveal key={p.id} delay={index * 0.1}>
              <div className={`pengumuman-card ${p.pinned ? 'pinned' : ''}`}>
              <div className="pengumuman-header">
                <span className="kategori">{p.kategori}</span>
                <span className="tanggal">{new Date(p.tanggalPublish).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <h3>{p.pinned && '📌 '}{p.judul}</h3>
              <p className="isi">{p.isi}</p>
            </div>
            </ScrollReveal>
          )) : (
            <p className="empty-state">Belum ada pengumuman.</p>
          )}
        </div>
      </div>
    </div>
  );
}
