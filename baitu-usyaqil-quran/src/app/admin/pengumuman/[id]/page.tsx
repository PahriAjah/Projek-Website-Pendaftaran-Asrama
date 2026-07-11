import { PrismaClient } from '@prisma/client';
import PengumumanForm from '../form';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export default async function EditPengumuman({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pengumuman = await prisma.pengumuman.findUnique({
    where: { id }
  });

  if (!pengumuman) {
    notFound();
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Edit Pengumuman</h1>
      </div>
      <PengumumanForm pengumuman={pengumuman} />
    </div>
  );
}
