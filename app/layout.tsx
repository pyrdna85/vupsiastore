import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getSession } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Vupsia - Achadinhos e Ofertas',
  description: 'Os melhores achadinhos e ofertas da internet.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-neutral-50 min-h-screen flex flex-col">
        <Header initialSession={session} />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
