'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addJadwal, updateJadwal } from '@/actions/admin';
import { JadwalKegiatan } from '@prisma/client';
import Link from 'next/link';

export default function JadwalForm({ jadwal }: { jadwal?: JadwalKegiatan }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      if (jadwal) {
        await updateJadwal(jadwal.id, formData);
      } else {
        await addJadwal(formData);
      }
      router.push('/admin/jadwal');
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan');
      setLoading(false);
    }
  };

  return (
    <div className="admin-section">
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Judul Kegiatan</label>
          <input type="text" name="judul" defaultValue={jadwal?.judul} required />
        </div>
        <div className="form-group">
          <label>Jenis Kegiatan (mengaji, kajian, khusus)</label>
          <input type="text" name="jenis" defaultValue={jadwal?.jenis} required />
        </div>
        <div className="form-group">
          <label>Kitab / Materi (Opsional)</label>
          <input type="text" name="kitab" defaultValue={jadwal?.kitab || ''} />
        </div>
        <div className="form-group">
          <label>Hari</label>
          <input type="text" name="tanggalHari" defaultValue={jadwal?.tanggalHari} placeholder="Contoh: Senin-Jumat" required />
        </div>
        <div className="form-group">
          <label>Waktu (Jam)</label>
          <input type="text" name="jam" defaultValue={jadwal?.jam} placeholder="Contoh: 18:00 - 19:30" required />
        </div>
        <div className="form-group">
          <label>Sifat (Wajib / Opsional)</label>
          <select name="wajibOpsional" defaultValue={jadwal?.wajibOpsional || 'Wajib'}>
            <option value="Wajib">Wajib</option>
            <option value="Opsional">Opsional</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          <Link href="/admin/jadwal" className="btn btn-secondary">Batal</Link>
        </div>
      </form>
    </div>
  );
}
