import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import './admin.css';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>Admin BUQ</h2>
        </div>
        <nav className="admin-nav">
          <ul>
            <li><Link href="/admin">Dashboard</Link></li>
            <li><Link href="/admin/pendaftar">Pendaftar</Link></li>
            <li><Link href="/admin/kamar">Kamar</Link></li>
            <li><Link href="/admin/jadwal">Jadwal</Link></li>
            <li><Link href="/admin/pengumuman">Pengumuman</Link></li>
            <li><Link href="/admin/galeri">Galeri</Link></li>
          </ul>
        </nav>
        <div className="admin-footer">
          <Link href="/api/auth/signout" className="btn btn-secondary btn-block">Logout</Link>
        </div>
      </aside>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
