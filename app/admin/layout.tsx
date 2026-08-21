import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Tags, Users, Image as ImageIcon } from 'lucide-react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  
  if (!session || session.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 w-full overflow-hidden">
      <div className="bg-slate-900 border-b border-slate-800 shrink-0 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-2 overflow-x-auto py-3 no-scrollbar text-[11px] font-bold uppercase tracking-wide">
            <Link href="/admin" className="flex items-center gap-1.5 px-3 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md whitespace-nowrap transition-colors">
              <LayoutDashboard size={14}/> Dashboard
            </Link>
            <Link href="/admin/produtos" className="flex items-center gap-1.5 px-3 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md whitespace-nowrap transition-colors">
              <ShoppingBag size={14}/> Produtos
            </Link>
            <Link href="/admin/categorias" className="flex items-center gap-1.5 px-3 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md whitespace-nowrap transition-colors">
              <Tags size={14}/> Categorias
            </Link>
            <Link href="/admin/banners" className="flex items-center gap-1.5 px-3 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md whitespace-nowrap transition-colors">
              <ImageIcon size={14}/> Banners
            </Link>
            <Link href="/admin/usuarios" className="flex items-center gap-1.5 px-3 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md whitespace-nowrap transition-colors">
              <Users size={14}/> Usuários
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
