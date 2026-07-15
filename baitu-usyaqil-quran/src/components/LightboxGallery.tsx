'use client';
import { useState } from 'react';
import './LightboxGallery.css';

export default function LightboxGallery({ initialPhotos = [] }: { initialPhotos?: any[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const photos = initialPhotos.length > 0 ? initialPhotos : [
    { id: '1', urlFoto: '/images/galeri-1.jpg', kategori: 'Kegiatan', caption: 'Kajian Rutin & Diskusi' },
    { id: '2', urlFoto: '/images/galeri-2.jpg', kategori: 'Fasilitas', caption: 'Ruang Belajar Bersama' },
    { id: '3', urlFoto: '/images/galeri-3.jpg', kategori: 'Fasilitas', caption: 'Kenyamanan Kamar Santri' },
    { id: '4', urlFoto: '/images/galeri-4.jpg', kategori: 'Kegiatan', caption: 'Membaca Al-Qur\'an' },
    { id: '5', urlFoto: '/images/galeri-5.jpg', kategori: 'Bangunan', caption: 'Tampak Bangunan Asrama' },
    { id: '6', urlFoto: '/images/galeri-6.jpg', kategori: 'Kegiatan', caption: 'Diskusi Kelompok' },
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
