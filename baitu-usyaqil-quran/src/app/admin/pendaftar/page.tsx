import { PrismaClient } from '@prisma/client';
import { updatePendaftarStatus, deletePendaftar } from '@/actions/admin';

const prisma = new PrismaClient();
export const revalidate = 0;

export default async function AdminPendaftar() {
  const pendaftars = await prisma.pendaftar.findMany({
    orderBy: { tanggalDaftar: 'desc' },
    include: { kamarPilihan: true }
  });

  return (
    <div>
      <div className="admin-header">
        <h1>Kelola Pendaftar</h1>
      </div>
      <div className="admin-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>No HP</th>
              <th>Kamar</th>
              <th>Status</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pendaftars.map(p => (
              <tr key={p.id}>
                <td>{p.nama}</td>
                <td>{p.noHp}</td>
                <td>{p.kamarPilihan.namaTipe}</td>
                <td><span className={`badge ${p.status === 'Baru' ? 'bg-primary' : (p.status === 'Diterima' ? 'bg-success' : 'bg-danger')}`} style={{ padding: '4px 8px', borderRadius: '4px', color: 'white', backgroundColor: p.status === 'Baru' ? '#0d6efd' : (p.status === 'Diterima' ? '#198754' : '#dc3545') }}>{p.status}</span></td>
                <td>{new Date(p.tanggalDaftar).toLocaleDateString('id-ID')}</td>
                <td>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {p.status === 'Baru' && (
                      <>
                        <form action={async () => {
                          'use server';
                          await updatePendaftarStatus(p.id, 'Diterima', p.kamarPilihanId);
                        }}>
                          <button type="submit" className="btn-sm" style={{ backgroundColor: '#198754', color: 'white', border: 'none', cursor: 'pointer' }}>Terima</button>
                        </form>
                        <form action={async () => {
                          'use server';
                          await updatePendaftarStatus(p.id, 'Ditolak', p.kamarPilihanId);
                        }}>
                          <button type="submit" className="btn-sm" style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', cursor: 'pointer' }}>Tolak</button>
                        </form>
                      </>
                    )}
                    <form action={async () => {
                      'use server';
                      await deletePendaftar(p.id);
                    }}>
                      <button type="submit" className="btn-sm" style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>Hapus</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {pendaftars.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4">Belum ada pendaftar.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
