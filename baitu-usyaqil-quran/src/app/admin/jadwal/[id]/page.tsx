import { PrismaClient } from '@prisma/client';
import JadwalForm from '../form';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export default async function EditJadwal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const jadwal = await prisma.jadwalKegiatan.findUnique({
    where: { id }
  });

  if (!jadwal) {
    notFound();
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Edit Jadwal</h1>
      </div>
      <JadwalForm jadwal={jadwal} />
    </div>
  );
}
