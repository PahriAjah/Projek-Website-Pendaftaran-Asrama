'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addPengumuman, updatePengumuman } from '@/actions/admin';
import { Pengumuman } from '@prisma/client';
import Link from 'next/link';

export default function PengumumanForm({ pengumuman }: { pengumuman?: Pengumuman }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      if (pengumuman) {
        await updatePengumuman(pengumuman.id, formData);
      } else {
        await addPengumuman(formData);
      }
      router.push('/admin/pengumuman');
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
          <label>Judul Pengumuman</label>
          <input type="text" name="judul" defaultValue={pengumuman?.judul} required />
        </div>
        <div className="form-group">
          <label>Isi Konten</label>
          <textarea name="isi" defaultValue={pengumuman?.isi} rows={6} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div className="form-group">
          <label>Kategori</label>
          <input type="text" name="kategori" defaultValue={pengumuman?.kategori || 'Umum'} required />
        </div>
        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input type="checkbox" name="pinned" id="pinned" defaultChecked={pengumuman?.pinned} />
          <label htmlFor="pinned" style={{ marginBottom: 0 }}>Sematkan Pengumuman (Pinned)</label>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          <Link href="/admin/pengumuman" className="btn btn-secondary">Batal</Link>
        </div>
      </form>
    </div>
  );
}
