import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Trash2, Edit } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  async function toggleStatus(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const current = formData.get('current') === 'true';
    await prisma.product.update({ where: { id }, data: { active: !current } });
    revalidatePath('/admin/produtos');
  }

  async function deleteProduct(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.product.delete({ where: { id } });
    revalidatePath('/admin/produtos');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-900">Gerenciar Produtos</h1>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors flex items-center gap-2">
          <Plus size={16} /> Novo Produto
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wide">
                <th className="px-4 py-3">Produto</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3">Loja</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-white border border-slate-100 relative overflow-hidden shrink-0 flex items-center justify-center">
                       <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-1 mix-blend-multiply" />
                    </div>
                    <div className="font-bold text-slate-800 line-clamp-2 max-w-xs">{product.name}</div>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">
                    R$ {product.price.toFixed(2).replace('.',',')}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-2 py-1 rounded uppercase">
                      {product.store}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{product.category.name}</td>
                  <td className="px-4 py-3 text-center">
                    <form action={toggleStatus}>
                      <input type="hidden" name="id" value={product.id} />
                      <input type="hidden" name="current" value={product.active ? 'true' : 'false'} />
                      <button type="submit" className={`text-[9px] font-bold px-2 py-1 rounded uppercase transition-colors ${product.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                        {product.active ? 'Ativo' : 'Inativo'}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      <button className="text-slate-400 hover:text-orange-500 transition-colors p-1" title="Editar">
                        <Edit size={16}/>
                      </button>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={product.id} />
                        <button type="submit" className="text-slate-400 hover:text-red-500 transition-colors p-1" title="Excluir">
                          <Trash2 size={16}/>
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500 font-medium">
                    Nenhum produto cadastrado.
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
