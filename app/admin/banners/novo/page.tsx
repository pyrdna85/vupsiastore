import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function NovoBanner() {
  async function createBanner(formData: FormData) {
    'use server';
    
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const linkUrl = formData.get('linkUrl') as string;
    const position = parseInt(formData.get('position') as string) || 0;
    const active = formData.get('active') === 'on';
    
    await prisma.banner.create({
      data: {
        title, subtitle, imageUrl, linkUrl, position, active
      }
    });
    
    redirect('/admin/banners');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-900">Novo Banner</h1>
        <Link href="/admin/banners" className="text-slate-500 hover:text-slate-800 text-sm font-medium">
          Voltar
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form action={createBanner} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Título (Opcional)</label>
              <input type="text" name="title" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Subtítulo (Opcional)</label>
              <input type="text" name="subtitle" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">URL da Imagem</label>
              <input type="url" name="imageUrl" required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="https://..." />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Link de Destino (Opcional)</label>
              <input type="url" name="linkUrl" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="https://..." />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Posição (Ordem)</label>
              <input type="number" name="position" defaultValue="0" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="active" defaultChecked className="w-5 h-5 text-orange-600 rounded" />
                <span className="text-sm font-medium text-slate-700">Banner Ativo</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2 rounded-lg transition-colors">
              Salvar Banner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
