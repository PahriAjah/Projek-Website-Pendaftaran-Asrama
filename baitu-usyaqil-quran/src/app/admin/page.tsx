import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const revalidate = 0; // Don't cache admin pages

export default async function AdminDashboard() {
  const [totalPendaftar, totalKamar, totalJadwal, totalPengumuman] = await Promise.all([
    prisma.pendaftar.count(),
    prisma.kamar.count(),
    prisma.jadwalKegiatan.count(),
    prisma.pengumuman.count(),
  ]);

  const pendaftarBaru = await prisma.pendaftar.findMany({
    where: { status: 'Baru' },
    orderBy: { tanggalDaftar: 'desc' },
    take: 5
  });

  return (
    <div>
      <div className="admin-header">
        <h1>Dashboard Ringkasan</h1>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Pendaftar</h3>
          <p className="stat-value">{totalPendaftar}</p>
        </div>
        <div className="stat-card">
          <h3>Tipe Kamar</h3>
          <p className="stat-value">{totalKamar}</p>
        </div>
        <div className="stat-card">
          <h3>Jadwal Kegiatan</h3>
          <p className="stat-value">{totalJadwal}</p>
        </div>
        <div className="stat-card">
          <h3>Pengumuman Aktif</h3>
          <p className="stat-value">{totalPengumuman}</p>
        </div>
      </div>

      <div className="admin-section mt-4">
        <h2>Pendaftar Baru</h2>
        {pendaftarBaru.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>No HP</th>
                <th>Kamar</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pendaftarBaru.map(p => (
                <tr key={p.id}>
                  <td>{p.nama}</td>
                  <td>{p.noHp}</td>
                  <td>{p.kamarPilihanId}</td>
                  <td>{new Date(p.tanggalDaftar).toLocaleDateString('id-ID')}</td>
                  <td>
                    <a href={`/admin/pendaftar/${p.id}`} className="btn-sm btn-primary">Detail</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted mt-2">Belum ada pendaftar baru.</p>
        )}
      </div>
    </div>
  );
}
