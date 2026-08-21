import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Users, ShoppingBag, MousePointerClick, Tags, Image as ImageIcon, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const session = await getSession();

  if (!session || session.role !== 'ADMIN') {
    redirect('/');
  }

  const [productsCount, activeProductsCount, usersCount, categoriesCount, clicksCount, bannersCount] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { active: true } }),
    prisma.user.count(),
    prisma.category.count(),
    prisma.click.count(),
    prisma.banner.count(),
  ]);

  return (
    <div className="flex-1 bg-neutral-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-neutral-900 mb-8">Dashboard Admin</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
            <div className="flex items-center gap-4 text-blue-600 mb-4">
              <ShoppingBag size={24} />
              <h3 className="text-sm font-semibold text-neutral-700 uppercase">Produtos</h3>
            </div>
            <p className="text-3xl font-black text-neutral-900">{productsCount}</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
            <div className="flex items-center gap-4 text-blue-500 mb-4">
              <TrendingUp size={24} />
              <h3 className="text-sm font-semibold text-neutral-700 uppercase">Ativos</h3>
            </div>
            <p className="text-3xl font-black text-neutral-900">{activeProductsCount}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
            <div className="flex items-center gap-4 text-green-600 mb-4">
              <Users size={24} />
              <h3 className="text-sm font-semibold text-neutral-700 uppercase">Usuários</h3>
            </div>
            <p className="text-3xl font-black text-neutral-900">{usersCount}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
            <div className="flex items-center gap-4 text-purple-600 mb-4">
              <Tags size={24} />
              <h3 className="text-sm font-semibold text-neutral-700 uppercase">Categorias</h3>
            </div>
            <p className="text-3xl font-black text-neutral-900">{categoriesCount}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
            <div className="flex items-center gap-4 text-orange-600 mb-4">
              <MousePointerClick size={24} />
              <h3 className="text-sm font-semibold text-neutral-700 uppercase">Cliques</h3>
            </div>
            <p className="text-3xl font-black text-neutral-900">{clicksCount}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
            <div className="flex items-center gap-4 text-pink-600 mb-4">
              <ImageIcon size={24} />
              <h3 className="text-sm font-semibold text-neutral-700 uppercase">Banners</h3>
            </div>
            <p className="text-3xl font-black text-neutral-900">{bannersCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Acesso Rápido</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/produtos" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-xl transition-colors">
              Gerenciar Produtos
            </Link>
            <Link href="/admin/categorias" className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium px-6 py-2 rounded-xl transition-colors">
              Gerenciar Categorias
            </Link>
            <Link href="/admin/banners" className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium px-6 py-2 rounded-xl transition-colors">
              Gerenciar Banners
            </Link>
            <Link href="/admin/usuarios" className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium px-6 py-2 rounded-xl transition-colors">
              Gerenciar Usuários
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
