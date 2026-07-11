'use client';
import { useState } from 'react';
import './LightboxGallery.css';

export default function LightboxGallery({ initialPhotos = [] }: { initialPhotos?: any[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const photos = initialPhotos.length > 0 ? initialPhotos : [
    { id: '1', urlFoto: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&q=80&w=800', kategori: 'Kegiatan', caption: 'Kajian Rutin & Diskusi' },
    { id: '2', urlFoto: 'https://images.unsplash.com/photo-1579373903781-4211e5dc5042?auto=format&fit=crop&q=80&w=800', kategori: 'Fasilitas', caption: 'Ruang Belajar Bersama' },
    { id: '3', urlFoto: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800', kategori: 'Fasilitas', caption: 'Kenyamanan Kamar Santri' },
    { id: '4', urlFoto: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=800', kategori: 'Kegiatan', caption: 'Membaca Al-Qur\'an' },
    { id: '5', urlFoto: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=800', kategori: 'Bangunan', caption: 'Tampak Bangunan Asrama' },
    { id: '6', urlFoto: 'https://images.unsplash.com/photo-1506869640319-baa1a337ab28?auto=format&fit=crop&q=80&w=800', kategori: 'Kegiatan', caption: 'Diskusi Kelompok' },
  ];

  return (
    <>
      <div className="gallery-masonry">
        {photos.map(p => (
          <div key={p.id} className="gallery-item-card" onClick={() => setSelectedPhoto(p.urlFoto)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.urlFoto} alt={p.caption || 'Galeri'} loading="lazy" />
            <div className="gallery-overlay">
              <span className="gallery-kategori">{p.kategori}</span>
              <p className="gallery-caption">{p.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Popup */}
      {selectedPhoto && (
        <div className="lightbox-overlay" onClick={() => setSelectedPhoto(null)}>
          <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>&times;</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={selectedPhoto} alt="Full Size" className="lightbox-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
