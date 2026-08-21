import prisma from '@/lib/prisma';
import { Plus, Trash2, Edit } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import * as LucideIcons from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminCategories() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { createdAt: 'desc' }
  });

  async function deleteCategory(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    try {
      await prisma.category.delete({ where: { id } });
      revalidatePath('/admin/categorias');
    } catch (e) {
      console.error("Failed to delete category:", e);
      // In a real app we'd display an error to the client
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-900">Gerenciar Categorias</h1>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors flex items-center gap-2">
          <Plus size={16} /> Nova Categoria
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wide">
                <th className="px-4 py-3">Ícone</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3 text-center">Produtos</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {categories.map(category => {
                const IconComponent = (LucideIcons as any)[category.icon || 'Tags'] || LucideIcons.Tags;
                return (
                  <tr key={category.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-8 h-8 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center">
                        <IconComponent size={16} />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-800">{category.name}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-[10px]">{category.slug}</td>
                    <td className="px-4 py-3 text-center font-medium text-slate-600">
                      {category._count.products}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-2">
                        <button className="text-slate-400 hover:text-orange-500 transition-colors p-1" title="Editar">
                          <Edit size={16}/>
                        </button>
                        <form action={deleteCategory}>
                          <input type="hidden" name="id" value={category.id} />
                          <button type="submit" className="text-slate-400 hover:text-red-500 transition-colors p-1" title="Excluir">
                            <Trash2 size={16}/>
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500 font-medium">
                    Nenhuma categoria cadastrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
