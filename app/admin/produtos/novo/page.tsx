import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function NovoProduto() {
  const categories = await prisma.category.findMany();

  async function createProduct(formData: FormData) {
    'use server';
    
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const price = parseFloat(formData.get('price') as string);
    const oldPrice = formData.get('oldPrice') ? parseFloat(formData.get('oldPrice') as string) : null;
    const discountPercentage = formData.get('discountPercentage') ? parseInt(formData.get('discountPercentage') as string) : null;
    const imageUrl = formData.get('imageUrl') as string;
    const store = formData.get('store') as string;
    const affiliateUrl = formData.get('affiliateUrl') as string;
    const categoryId = formData.get('categoryId') as string;
    
    const featured = formData.get('featured') === 'on';
    const freeShipping = formData.get('freeShipping') === 'on';
    const fastDelivery = formData.get('fastDelivery') === 'on';
    const active = formData.get('active') === 'on';
    
    await prisma.product.create({
      data: {
        name, slug, description, shortDescription, price, oldPrice,
        discountPercentage, imageUrl, store, affiliateUrl, categoryId,
        featured, freeShipping, fastDelivery, active
      }
    });
    
    redirect('/admin/produtos');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-900">Novo Produto</h1>
        <Link href="/admin/produtos" className="text-slate-500 hover:text-slate-800 text-sm font-medium">
          Voltar
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form action={createProduct} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nome do Produto</label>
              <input type="text" name="name" required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Slug (URL)</label>
              <input type="text" name="slug" required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Preço (R$)</label>
              <input type="number" step="0.01" name="price" required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Preço Antigo</label>
                <input type="number" step="0.01" name="oldPrice" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Desconto (%)</label>
                <input type="number" name="discountPercentage" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Loja (Ex: Amazon)</label>
              <input type="text" name="store" required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Categoria</label>
              <select name="categoryId" required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">Selecione...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">URL da Imagem</label>
              <input type="url" name="imageUrl" required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Link de Afiliado</label>
              <input type="url" name="affiliateUrl" required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Descrição Curta</label>
              <textarea name="shortDescription" required rows={2} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Descrição Completa</label>
              <textarea name="description" required rows={4} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
            </div>

            <div className="md:col-span-2 flex flex-wrap gap-6 bg-slate-50 p-4 rounded-lg">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="active" defaultChecked className="w-4 h-4 text-orange-600 rounded" />
                <span className="text-sm font-medium text-slate-700">Ativo</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="featured" className="w-4 h-4 text-orange-600 rounded" />
                <span className="text-sm font-medium text-slate-700">Destaque</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="freeShipping" className="w-4 h-4 text-orange-600 rounded" />
                <span className="text-sm font-medium text-slate-700">Frete Grátis</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="fastDelivery" className="w-4 h-4 text-orange-600 rounded" />
                <span className="text-sm font-medium text-slate-700">Entrega Rápida</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2 rounded-lg transition-colors">
              Salvar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
