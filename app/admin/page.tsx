import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Users, ShoppingBag, MousePointerClick, Tags } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await getSession();

  if (!session || session.role !== 'ADMIN') {
    redirect('/');
  }

  const [productsCount, usersCount, categoriesCount, clicksCount] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
    prisma.category.count(),
    prisma.click.count(),
  ]);

  return (
    <div className="flex-1 bg-neutral-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-neutral-900 mb-8">Dashboard Admin</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
            <div className="flex items-center gap-4 text-blue-600 mb-4">
              <ShoppingBag size={28} />
              <h3 className="text-lg font-semibold text-neutral-700">Produtos</h3>
            </div>
            <p className="text-4xl font-black text-neutral-900">{productsCount}</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
            <div className="flex items-center gap-4 text-green-600 mb-4">
              <Users size={28} />
              <h3 className="text-lg font-semibold text-neutral-700">Usuários</h3>
            </div>
            <p className="text-4xl font-black text-neutral-900">{usersCount}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
            <div className="flex items-center gap-4 text-purple-600 mb-4">
              <Tags size={28} />
              <h3 className="text-lg font-semibold text-neutral-700">Categorias</h3>
            </div>
            <p className="text-4xl font-black text-neutral-900">{categoriesCount}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
            <div className="flex items-center gap-4 text-orange-600 mb-4">
              <MousePointerClick size={28} />
              <h3 className="text-lg font-semibold text-neutral-700">Cliques</h3>
            </div>
            <p className="text-4xl font-black text-neutral-900">{clicksCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Acesso Rápido</h2>
          <p className="text-neutral-500 mb-6">Em uma versão completa, aqui existiriam os atalhos para os formulários de CRUD e gráficos detalhados. As funcionalidades de CRUD completas requerem painéis extensos que poderiam ser implementados nesta área.</p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-xl transition-colors">
              Gerenciar Produtos
            </button>
            <button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium px-6 py-2 rounded-xl transition-colors">
              Gerenciar Categorias
            </button>
            <button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium px-6 py-2 rounded-xl transition-colors">
              Gerenciar Usuários
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
