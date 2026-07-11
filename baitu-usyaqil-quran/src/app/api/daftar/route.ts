import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validasi kamar
    const kamar = await prisma.kamar.findUnique({
      where: { id: data.kamarPilihanId }
    });

    if (!kamar || !kamar.statusTersedia || kamar.sisaSlot < 1) {
      return NextResponse.json({ error: 'Kamar tidak tersedia atau penuh.' }, { status: 400 });
    }

    // Simpan pendaftar
    const pendaftar = await prisma.pendaftar.create({
      data: {
        nama: data.nama,
        tanggalLahir: data.tanggalLahir,
        alamat: data.alamat,
        noHp: data.noHp,
        noHpWali: data.noHpWali,
        pendidikanSekarang: data.pendidikanSekarang,
        kamarPilihanId: data.kamarPilihanId,
      }
    });

    return NextResponse.json(pendaftar, { status: 201 });
  } catch (error) {
    console.error('Error creating registration:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
