'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addKamar, updateKamar } from '@/actions/admin';
import { Kamar } from '@prisma/client';
import Link from 'next/link';

export default function KamarForm({ kamar }: { kamar?: Kamar }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      if (kamar) {
        await updateKamar(kamar.id, formData);
      } else {
        await addKamar(formData);
      }
      router.push('/admin/kamar');
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat menyimpan Kamar.');
      setLoading(false);
    }
  };

  return (
    <div className="admin-section">
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Nama Tipe Kamar</label>
          <input type="text" name="namaTipe" placeholder="Cth: Reguler" defaultValue={kamar?.namaTipe} required />
        </div>
        <div className="form-group">
          <label>Harga (Rp)</label>
          <input type="number" name="harga" placeholder="Cth: 400000" defaultValue={kamar?.harga} required />
        </div>
        <div className="form-group">
          <label>Fasilitas</label>
          <input type="text" name="fasilitas" placeholder="Cth: Kasur, Lemari, Kipas Angin (pisahkan dengan koma)" defaultValue={kamar?.fasilitas} required />
        </div>
        <div className="form-group">
          <label>Kapasitas (Orang)</label>
          <input type="number" name="kapasitas" placeholder="Cth: 4" defaultValue={kamar?.kapasitas} required />
        </div>
        <div className="form-group">
          <label>Sisa Slot (Kosong)</label>
          <input type="number" name="sisaSlot" placeholder="Cth: 2" defaultValue={kamar?.sisaSlot} required />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          <Link href="/admin/kamar" className="btn btn-secondary">Batal</Link>
        </div>
      </form>
    </div>
  );
}
