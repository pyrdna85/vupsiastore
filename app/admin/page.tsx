import prisma from '@/lib/prisma';
import { Users, ShoppingBag, MousePointerClick, Tags } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [productsCount, usersCount, categoriesCount, clicksCount] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
    prisma.category.count(),
    prisma.click.count(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-xl font-bold text-slate-900 mb-6">Visão Geral do Sistema</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase">Produtos</h3>
            <ShoppingBag size={16} className="text-orange-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{productsCount}</p>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase">Usuários</h3>
            <Users size={16} className="text-blue-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{usersCount}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase">Categorias</h3>
            <Tags size={16} className="text-green-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{categoriesCount}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase">Cliques (Afiliados)</h3>
            <MousePointerClick size={16} className="text-purple-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{clicksCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-sm font-bold text-slate-900 mb-2">Atalhos de Gerenciamento</h2>
        <p className="text-xs text-slate-500 mb-6">Utilize os atalhos abaixo ou o menu superior para administrar as tabelas do sistema.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/produtos" className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-lg transition-colors">
            Gerenciar Produtos
          </Link>
          <Link href="/admin/categorias" className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase px-5 py-2.5 rounded-lg transition-colors">
            Gerenciar Categorias
          </Link>
          <Link href="/admin/usuarios" className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase px-5 py-2.5 rounded-lg transition-colors">
            Gerenciar Usuários
          </Link>
          <Link href="/admin/banners" className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase px-5 py-2.5 rounded-lg transition-colors">
            Gerenciar Banners
          </Link>
        </div>
      </div>
    </div>
  );
}
