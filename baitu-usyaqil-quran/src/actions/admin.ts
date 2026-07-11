'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  }
}

// ==========================================
// KAMAR ACTIONS
// ==========================================
export async function addKamar(data: FormData) {
  await checkAdmin();
  const namaTipe = data.get('namaTipe') as string;
  const harga = data.get('harga') as string;
  const fasilitas = data.get('fasilitas') as string;
  const kapasitas = parseInt(data.get('kapasitas') as string);
  const sisaSlot = parseInt(data.get('sisaSlot') as string);
  
  await prisma.kamar.create({
    data: {
      namaTipe,
      harga,
      fasilitas,
      kapasitas,
      sisaSlot,
      statusTersedia: sisaSlot > 0,
      foto: 'https://via.placeholder.com/300' // Default placeholder
    }
  });
  
  revalidatePath('/admin/kamar');
  revalidatePath('/kamar');
  revalidatePath('/daftar');
}

export async function updateKamar(id: string, data: FormData) {
  await checkAdmin();
  const namaTipe = data.get('namaTipe') as string;
  const harga = data.get('harga') as string;
  const fasilitas = data.get('fasilitas') as string;
  const kapasitas = parseInt(data.get('kapasitas') as string);
  const sisaSlot = parseInt(data.get('sisaSlot') as string);
  
  await prisma.kamar.update({
    where: { id },
    data: {
      namaTipe,
      harga,
      fasilitas,
      kapasitas,
      sisaSlot,
      statusTersedia: sisaSlot > 0
    }
  });
  
  revalidatePath('/admin/kamar');
  revalidatePath('/kamar');
  revalidatePath('/daftar');
}

export async function deleteKamar(id: string) {
  await checkAdmin();
  await prisma.kamar.delete({ where: { id } });
  revalidatePath('/admin/kamar');
  revalidatePath('/kamar');
  revalidatePath('/daftar');
}

// ==========================================
// JADWAL ACTIONS
// ==========================================
export async function addJadwal(data: FormData) {
  await checkAdmin();
  await prisma.jadwalKegiatan.create({
    data: {
      judul: data.get('judul') as string,
      jenis: data.get('jenis') as string,
      kitab: data.get('kitab') as string,
      tanggalHari: data.get('tanggalHari') as string,
      jam: data.get('jam') as string,
      wajibOpsional: data.get('wajibOpsional') as string,
    }
  });
  revalidatePath('/admin/jadwal');
  revalidatePath('/jadwal');
}

export async function updateJadwal(id: string, data: FormData) {
  await checkAdmin();
  await prisma.jadwalKegiatan.update({
    where: { id },
    data: {
      judul: data.get('judul') as string,
      jenis: data.get('jenis') as string,
      kitab: data.get('kitab') as string,
      tanggalHari: data.get('tanggalHari') as string,
      jam: data.get('jam') as string,
      wajibOpsional: data.get('wajibOpsional') as string,
    }
  });
  revalidatePath('/admin/jadwal');
  revalidatePath('/jadwal');
}

export async function deleteJadwal(id: string) {
  await checkAdmin();
  await prisma.jadwalKegiatan.delete({ where: { id } });
  revalidatePath('/admin/jadwal');
  revalidatePath('/jadwal');
}

// ==========================================
// PENGUMUMAN ACTIONS
// ==========================================
export async function addPengumuman(data: FormData) {
  await checkAdmin();
  await prisma.pengumuman.create({
    data: {
      judul: data.get('judul') as string,
      isi: data.get('isi') as string,
      kategori: data.get('kategori') as string || 'Umum',
      pinned: data.get('pinned') === 'on',
    }
  });
  revalidatePath('/admin/pengumuman');
  revalidatePath('/pengumuman');
}

export async function updatePengumuman(id: string, data: FormData) {
  await checkAdmin();
  await prisma.pengumuman.update({
    where: { id },
    data: {
      judul: data.get('judul') as string,
      isi: data.get('isi') as string,
      kategori: data.get('kategori') as string || 'Umum',
      pinned: data.get('pinned') === 'on',
    }
  });
  revalidatePath('/admin/pengumuman');
  revalidatePath('/pengumuman');
}

export async function deletePengumuman(id: string) {
  await checkAdmin();
  await prisma.pengumuman.delete({ where: { id } });
  revalidatePath('/admin/pengumuman');
  revalidatePath('/pengumuman');
}

// ==========================================
// PENDAFTAR ACTIONS
// ==========================================
export async function updatePendaftarStatus(id: string, status: string, kamarId: string) {
  await checkAdmin();
  
  const currentPendaftar = await prisma.pendaftar.findUnique({ where: { id } });
  if (!currentPendaftar) return;

  if (currentPendaftar.status !== 'Diterima' && status === 'Diterima') {
    const kamar = await prisma.kamar.findUnique({ where: { id: kamarId } });
    if (kamar && kamar.sisaSlot > 0) {
      await prisma.kamar.update({
        where: { id: kamarId },
        data: { 
          sisaSlot: kamar.sisaSlot - 1,
          statusTersedia: (kamar.sisaSlot - 1) > 0
        }
      });
    }
  } else if (currentPendaftar.status === 'Diterima' && status !== 'Diterima') {
    const kamar = await prisma.kamar.findUnique({ where: { id: kamarId } });
    if (kamar) {
      await prisma.kamar.update({
        where: { id: kamarId },
        data: { 
          sisaSlot: kamar.sisaSlot + 1,
          statusTersedia: true
        }
      });
    }
  }

  await prisma.pendaftar.update({
    where: { id },
    data: { status }
  });
  
  revalidatePath('/admin/pendaftar');
  revalidatePath('/kamar');
}

export async function deletePendaftar(id: string) {
  await checkAdmin();
  await prisma.pendaftar.delete({ where: { id } });
  revalidatePath('/admin/pendaftar');
}

// ==========================================
// GALERI ACTIONS
// ==========================================
export async function addGaleri(data: FormData) {
  await checkAdmin();
  await prisma.galeri.create({
    data: {
      caption: data.get('caption') as string,
      urlFoto: data.get('urlFoto') as string,
      kategori: 'Kegiatan',
    }
  });
  revalidatePath('/admin/galeri');
  revalidatePath('/galeri');
}

export async function deleteGaleri(id: string) {
  await checkAdmin();
  await prisma.galeri.delete({ where: { id } });
  revalidatePath('/admin/galeri');
  revalidatePath('/galeri');
}
