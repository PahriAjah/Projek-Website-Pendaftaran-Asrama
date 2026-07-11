import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { deleteGaleri } from '@/actions/admin';

const prisma = new PrismaClient();
export const revalidate = 0;

export default async function AdminGaleri() {
  const galeri = await prisma.galeri.findMany();

  return (
    <div>
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Kelola Galeri</h1>
        <Link href="/admin/galeri/tambah" className="btn btn-primary">Tambah Foto</Link>
      </div>
      <div className="admin-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Gambar</th>
              <th>Judul</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {galeri.map(g => (
              <tr key={g.id}>
                <td>
                  <img src={g.urlFoto} alt={g.caption || ''} style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                </td>
                <td>{g.caption}</td>
                <td>
                  <form action={async () => {
                    'use server';
                    await deleteGaleri(g.id);
                  }}>
                    <button type="submit" className="btn-sm" style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>Hapus</button>
                  </form>
                </td>
              </tr>
            ))}
            {galeri.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4">Belum ada foto di galeri.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
