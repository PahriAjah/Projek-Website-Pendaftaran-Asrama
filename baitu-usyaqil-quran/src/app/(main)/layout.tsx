import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main style={{ minHeight: 'calc(100vh - 80px - 250px)' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
