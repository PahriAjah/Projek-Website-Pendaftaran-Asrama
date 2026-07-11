import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { deleteJadwal } from '@/actions/admin';

const prisma = new PrismaClient();
export const revalidate = 0;

export default async function AdminJadwal() {
  const jadwals = await prisma.jadwalKegiatan.findMany({
    orderBy: { tanggalHari: 'asc' }
  });

  return (
    <div>
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Kelola Jadwal Kegiatan</h1>
        <Link href="/admin/jadwal/tambah" className="btn btn-primary">Tambah Jadwal</Link>
      </div>
      <div className="admin-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Hari</th>
              <th>Waktu</th>
              <th>Kegiatan</th>
              <th>Kitab / Materi</th>
              <th>Pembimbing</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jadwals.map(j => (
              <tr key={j.id}>
                <td>{j.tanggalHari}</td>
                <td>{j.jam}</td>
                <td>{j.judul} ({j.jenis})</td>
                <td>{j.kitab}</td>
                <td>{j.wajibOpsional}</td>
                <td>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <Link href={`/admin/jadwal/${j.id}`} className="btn-sm btn-secondary">Edit</Link>
                    <form action={async () => {
                      'use server';
                      await deleteJadwal(j.id);
                    }}>
                      <button type="submit" className="btn-sm" style={{ backgroundColor: '#dc3545', color: 'white' }}>Hapus</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {jadwals.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4">Belum ada jadwal.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
