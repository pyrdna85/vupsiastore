import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getSession } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VUPSIA - Ofertas e Achadinhos',
  description: 'Encontre os melhores produtos com preços especiais.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans`} suppressHydrationWarning>
        <Header initialSession={session} />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
