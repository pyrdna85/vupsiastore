import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EditarBanner({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const banner = await prisma.banner.findUnique({ where: { id } });
  
  if (!banner) {
    redirect('/admin/banners');
  }

  async function updateBanner(formData: FormData) {
    'use server';
    
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const linkUrl = formData.get('linkUrl') as string;
    const position = parseInt(formData.get('position') as string) || 0;
    const active = formData.get('active') === 'on';
    
    await prisma.banner.update({
      where: { id },
      data: {
        title, subtitle, imageUrl, linkUrl, position, active
      }
    });
    
    redirect('/admin/banners');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-900">Editar Banner</h1>
        <Link href="/admin/banners" className="text-slate-500 hover:text-slate-800 text-sm font-medium">
          Voltar
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form action={updateBanner} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Título (Opcional)</label>
              <input type="text" name="title" defaultValue={banner.title || ''} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Subtítulo (Opcional)</label>
              <input type="text" name="subtitle" defaultValue={banner.subtitle || ''} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">URL da Imagem</label>
              <input type="url" name="imageUrl" defaultValue={banner.imageUrl} required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Link de Destino (Opcional)</label>
              <input type="url" name="linkUrl" defaultValue={banner.linkUrl || ''} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Posição (Ordem)</label>
              <input type="number" name="position" defaultValue={banner.position} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="active" defaultChecked={banner.active} className="w-5 h-5 text-orange-600 rounded" />
                <span className="text-sm font-medium text-slate-700">Banner Ativo</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2 rounded-lg transition-colors">
              Atualizar Banner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
