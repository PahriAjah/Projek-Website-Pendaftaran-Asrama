import { PrismaClient } from '@prisma/client';
import DaftarForm from './DaftarForm';
import './daftar.css';

const prisma = new PrismaClient();

export const revalidate = 0; // Don't cache this page so available rooms are always fresh

export default async function DaftarPage() {
  const kamars = await prisma.kamar.findMany({
    where: { statusTersedia: true },
  });

  return (
    <div className="section bg-light">
      <div className="container">
        <div className="title-section">
          <h2>Form Pendaftaran Asrama</h2>
          <p>Silakan isi data diri Anda. Pembayaran dilakukan secara offline setelah konfirmasi.</p>
        </div>
        <div className="form-container">
          <DaftarForm kamars={kamars} />
        </div>
      </div>
    </div>
  );
}
