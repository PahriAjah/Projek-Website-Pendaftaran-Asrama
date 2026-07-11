import { PrismaClient } from '@prisma/client';
import KamarForm from '../form';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export default async function EditKamar({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const kamar = await prisma.kamar.findUnique({
    where: { id }
  });

  if (!kamar) {
    notFound();
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Edit Kamar</h1>
      </div>
      <KamarForm kamar={kamar} />
    </div>
  );
}
