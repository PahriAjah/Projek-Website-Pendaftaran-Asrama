'use client';

import { useState } from 'react';

export default function DaftarForm({ kamars }: { kamars: any[] }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/daftar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Gagal mengirim pendaftaran');
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <h3>Pendaftaran Berhasil! 🎉</h3>
        <p>Terima kasih telah mendaftar di Baitu 'Usyaqil Qur'an. Pengurus kami akan segera menghubungi Anda melalui nomor WhatsApp yang terdaftar untuk proses selanjutnya.</p>
        <button onClick={() => window.location.href='/'} className="btn btn-primary mt-4">Kembali ke Beranda</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="daftar-form">
      {error && <div className="error-alert">{error}</div>}
      
      <div className="form-group">
        <label>Nama Lengkap</label>
        <input type="text" name="nama" required placeholder="Masukkan nama lengkap" />
      </div>

      <div className="form-group">
        <label>Tanggal Lahir</label>
        <input type="date" name="tanggalLahir" required />
      </div>

      <div className="form-group">
        <label>Alamat Lengkap</label>
        <textarea name="alamat" rows={3} required placeholder="Masukkan alamat lengkap sesuai KTP"></textarea>
      </div>

      <div className="form-group">
        <label>Nomor HP (WhatsApp aktif)</label>
        <input type="tel" name="noHp" required placeholder="Contoh: 08123456789" />
      </div>

      <div className="form-group">
        <label>Nomor HP Orang Tua/Wali</label>
        <input type="tel" name="noHpWali" required placeholder="Contoh: 08123456789" />
      </div>

      <div className="form-group">
        <label>Pendidikan Sekarang</label>
        <input type="text" name="pendidikanSekarang" required placeholder="Contoh: Mahasiswa UIN / SMA Negeri 1" />
      </div>

      <div className="form-group">
        <label>Pilihan Kamar</label>
        <select name="kamarPilihanId" required>
          <option value="">-- Pilih Kamar --</option>
          {kamars.map(k => (
            <option key={k.id} value={k.id}>{k.namaTipe} - {k.harga} (Sisa {k.sisaSlot} slot)</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary btn-block mt-4" disabled={loading}>
        {loading ? 'Mengirim Data...' : 'Kirim Pendaftaran'}
      </button>
    </form>
  );
}
