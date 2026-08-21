import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function NovaCategoria() {
  async function createCategory(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const icon = formData.get('icon') as string;
    
    await prisma.category.create({
      data: {
        name,
        slug,
        description,
        icon: icon || 'Tags'
      }
    });
    
    redirect('/admin/categorias');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-900">Nova Categoria</h1>
        <Link href="/admin/categorias" className="text-slate-500 hover:text-slate-800 text-sm font-medium">
          Voltar
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form action={createCategory} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nome</label>
              <input type="text" name="name" required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Ex: Casa e Cozinha" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Slug (URL)</label>
              <input type="text" name="slug" required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Ex: casa-e-cozinha" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Descrição</label>
              <textarea name="description" rows={3} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Descrição da categoria..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Ícone (Nome Lucide)</label>
              <input type="text" name="icon" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Ex: Sofa, Tv, Smartphone" />
              <p className="text-[10px] text-slate-500 mt-1">Veja os nomes em lucide.dev/icons</p>
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2 rounded-lg transition-colors">
              Salvar Categoria
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
