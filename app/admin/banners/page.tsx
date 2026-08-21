import prisma from '@/lib/prisma';
import Image from 'next/image';
import { Plus, Trash2, Edit } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function AdminBanners() {
  const banners = await prisma.banner.findMany({
    orderBy: { createdAt: 'desc' }
  });

  async function toggleStatus(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const current = formData.get('current') === 'true';
    await prisma.banner.update({ where: { id }, data: { active: !current } });
    revalidatePath('/admin/banners');
  }

  async function deleteBanner(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.banner.delete({ where: { id } });
    revalidatePath('/admin/banners');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-900">Gerenciar Banners</h1>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors flex items-center gap-2">
          <Plus size={16} /> Novo Banner
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wide">
                <th className="px-4 py-3">Banner</th>
                <th className="px-4 py-3">Link Destino</th>
                <th className="px-4 py-3 text-center">Posição</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {banners.map(banner => (
                <tr key={banner.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <div className="w-24 h-12 rounded bg-slate-100 border border-slate-200 relative overflow-hidden shrink-0">
                       <Image src={banner.imageUrl} alt={banner.title || 'Banner'} fill className="object-cover" />
                    </div>
                    <div className="font-bold text-slate-800">{banner.title || 'Sem título'}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-blue-500 truncate max-w-xs block">{banner.linkUrl || '-'}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-2 py-1 rounded uppercase">
                      {banner.position}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <form action={toggleStatus}>
                      <input type="hidden" name="id" value={banner.id} />
                      <input type="hidden" name="current" value={banner.active ? 'true' : 'false'} />
                      <button type="submit" className={`text-[9px] font-bold px-2 py-1 rounded uppercase transition-colors ${banner.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                        {banner.active ? 'Ativo' : 'Inativo'}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      <button className="text-slate-400 hover:text-orange-500 transition-colors p-1" title="Editar">
                        <Edit size={16}/>
                      </button>
                      <form action={deleteBanner}>
                        <input type="hidden" name="id" value={banner.id} />
                        <button type="submit" className="text-slate-400 hover:text-red-500 transition-colors p-1" title="Excluir">
                          <Trash2 size={16}/>
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {banners.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500 font-medium">
                    Nenhum banner cadastrado.
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
