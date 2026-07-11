import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { deleteKamar } from '@/actions/admin';

const prisma = new PrismaClient();
export const revalidate = 0;

export default async function AdminKamar() {
  const kamars = await prisma.kamar.findMany();

  return (
    <div>
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Kelola Kamar</h1>
        <Link href="/admin/kamar/tambah" className="btn btn-primary">Tambah Kamar</Link>
      </div>
      <div className="admin-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tipe Kamar</th>
              <th>Harga</th>
              <th>Kapasitas</th>
              <th>Sisa Slot</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kamars.map(k => (
              <tr key={k.id}>
                <td>{k.namaTipe}</td>
                <td>Rp {k.harga}</td>
                <td>{k.kapasitas}</td>
                <td>{k.sisaSlot}</td>
                <td>{k.statusTersedia ? 'Tersedia' : 'Penuh'}</td>
                <td>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <Link href={`/admin/kamar/${k.id}`} className="btn-sm btn-secondary">Edit</Link>
                    <form action={async () => {
                      'use server';
                      await deleteKamar(k.id);
                    }}>
                      <button type="submit" className="btn-sm" style={{ backgroundColor: '#dc3545', color: 'white' }}>Hapus</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {kamars.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4">Belum ada data kamar.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
