import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { deletePengumuman } from '@/actions/admin';

const prisma = new PrismaClient();
export const revalidate = 0;

export default async function AdminPengumuman() {
  const pengumuman = await prisma.pengumuman.findMany({
    orderBy: { tanggalPublish: 'desc' }
  });

  return (
    <div>
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Kelola Pengumuman</h1>
        <Link href="/admin/pengumuman/tambah" className="btn btn-primary">Tambah Pengumuman</Link>
      </div>
      <div className="admin-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Tanggal</th>
              <th>Status Pin</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pengumuman.map(p => (
              <tr key={p.id}>
                <td>{p.judul}</td>
                <td>{new Date(p.tanggalPublish).toLocaleDateString('id-ID')}</td>
                <td>{p.pinned ? '📌 Pinned' : 'Biasa'}</td>
                <td>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <Link href={`/admin/pengumuman/${p.id}`} className="btn-sm btn-secondary">Edit</Link>
                    <form action={async () => {
                      'use server';
                      await deletePengumuman(p.id);
                    }}>
                      <button type="submit" className="btn-sm" style={{ backgroundColor: '#dc3545', color: 'white' }}>Hapus</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {pengumuman.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4">Belum ada pengumuman.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
