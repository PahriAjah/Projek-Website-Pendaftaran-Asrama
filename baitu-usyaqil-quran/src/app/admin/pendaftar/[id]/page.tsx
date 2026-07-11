import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { updatePendaftarStatus, deletePendaftar } from '@/actions/admin';

const prisma = new PrismaClient();
export const revalidate = 0;

export default async function PendaftarDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pendaftar = await prisma.pendaftar.findUnique({
    where: { id },
    include: { kamarPilihan: true }
  });

  if (!pendaftar) {
    notFound();
  }

  return (
    <div>
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Detail Pendaftar: {pendaftar.nama}</h1>
        <Link href="/admin/pendaftar" className="btn btn-secondary">Kembali</Link>
      </div>

      <div className="admin-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="detail-card" style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3>Data Diri</h3>
          <table className="admin-table mt-3" style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ width: '150px', fontWeight: 'bold' }}>Nama Lengkap</td>
                <td>{pendaftar.nama}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Tanggal Lahir</td>
                <td>{pendaftar.tanggalLahir}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Alamat Lengkap</td>
                <td>{pendaftar.alamat}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Pendidikan Sekarang</td>
                <td>{pendaftar.pendidikanSekarang}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="detail-card" style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3>Kontak & Status</h3>
          <table className="admin-table mt-3" style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ width: '150px', fontWeight: 'bold' }}>No HP Pribadi</td>
                <td>{pendaftar.noHp}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>No HP Wali/Orangtua</td>
                <td>{pendaftar.noHpWali}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Kamar Pilihan</td>
                <td>{pendaftar.kamarPilihan.namaTipe}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Status Pendaftaran</td>
                <td>
                  <span className={`badge ${pendaftar.status === 'Baru' ? 'bg-primary' : (pendaftar.status === 'Diterima' ? 'bg-success' : 'bg-danger')}`} style={{ padding: '4px 8px', borderRadius: '4px', color: 'white', backgroundColor: pendaftar.status === 'Baru' ? '#0d6efd' : (pendaftar.status === 'Diterima' ? '#198754' : '#dc3545') }}>
                    {pendaftar.status}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Tanggal Daftar</td>
                <td>{new Date(pendaftar.tanggalDaftar).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-section mt-4" style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3>Aksi Admin</h3>
        <p>Anda dapat memperbarui status pendaftar di bawah ini. Jika pendaftar diterima, slot kamar yang dipilih akan otomatis berkurang.</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          {pendaftar.status !== 'Diterima' && (
            <form action={async () => {
              'use server';
              await updatePendaftarStatus(pendaftar.id, 'Diterima', pendaftar.kamarPilihanId);
            }}>
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#198754', border: 'none' }}>Terima Pendaftar</button>
            </form>
          )}
          
          {pendaftar.status !== 'Ditolak' && (
            <form action={async () => {
              'use server';
              await updatePendaftarStatus(pendaftar.id, 'Ditolak', pendaftar.kamarPilihanId);
            }}>
              <button type="submit" className="btn btn-secondary">Tolak Pendaftar</button>
            </form>
          )}
          
          <form action={async () => {
            'use server';
            await deletePendaftar(pendaftar.id);
          }}>
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#dc3545', border: 'none' }}>Hapus Data Permanen</button>
          </form>
        </div>
      </div>
    </div>
  );
}
