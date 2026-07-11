'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addGaleri } from '@/actions/admin';
import Link from 'next/link';

export default function TambahGaleri() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const fileInput = form.elements.namedItem('file') as HTMLInputElement;
    const file = fileInput?.files?.[0];
    const judul = (form.elements.namedItem('judul') as HTMLInputElement).value;

    if (!file) {
      alert('Pilih gambar terlebih dahulu');
      setLoading(false);
      return;
    }

    try {
      // 1. Upload file
      const uploadData = new FormData();
      uploadData.append('file', file);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Gagal upload gambar');
      }

      // 2. Save to database
      const dbData = new FormData();
      dbData.append('caption', judul);
      dbData.append('urlFoto', data.url);

      await addGaleri(dbData);
      router.push('/admin/galeri');
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Terjadi kesalahan');
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Tambah Foto Galeri</h1>
      </div>
      <div className="admin-section">
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Judul Foto / Keterangan</label>
            <input type="text" name="judul" required />
          </div>
          <div className="form-group">
            <label>Pilih Gambar (JPG/PNG)</label>
            <input type="file" name="file" accept="image/*" required />
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Mengunggah...' : 'Upload & Simpan'}
            </button>
            <Link href="/admin/galeri" className="btn btn-secondary">Batal</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
