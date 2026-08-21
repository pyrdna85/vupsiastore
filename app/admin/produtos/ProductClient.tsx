'use client';

import { useState } from 'react';
import { createProduct, updateProduct, deleteProduct } from '../actions';
import { Plus, Edit2, Trash2, X, ExternalLink } from 'lucide-react';

export default function ProductClient({ products, categories }: { products: any[], categories: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const initialForm = {
    name: '', slug: '', description: '', shortDescription: '', price: 0, oldPrice: '', discountPercentage: '',
    imageUrl: '', store: '', affiliateUrl: '', categoryId: categories[0]?.id || '', active: true, featured: false,
    freeShipping: false, fastDelivery: false
  };
  
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const handleOpen = (prod?: any) => {
    if (prod) {
      setEditingId(prod.id);
      setFormData({
        ...prod,
        oldPrice: prod.oldPrice || '',
        discountPercentage: prod.discountPercentage || '',
      });
    } else {
      setEditingId(null);
      setFormData(initialForm);
    }
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSave = {
        ...formData,
        price: Number(formData.price),
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
        discountPercentage: formData.discountPercentage ? Number(formData.discountPercentage) : null,
      };

      if (editingId) {
        await updateProduct(editingId, dataToSave);
      } else {
        await createProduct(dataToSave);
      }
      setIsOpen(false);
    } catch (error) {
      alert('Erro ao salvar produto');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir?')) {
      setLoading(true);
      try {
        await deleteProduct(id);
      } catch (error) {
        alert('Erro ao excluir produto');
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Produtos</h1>
        <button onClick={() => handleOpen()} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700">
          <Plus size={18} /> Novo Produto
        </button>
      </div>

      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Buscar produtos..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-md border border-neutral-300 rounded-lg p-2.5"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 text-sm">
                <th className="p-4 font-medium">Nome</th>
                <th className="p-4 font-medium">Preço</th>
                <th className="p-4 font-medium">Loja</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Cliques</th>
                <th className="p-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(prod => (
                <tr key={prod.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="p-4 font-medium text-neutral-900">
                    <div className="flex items-center gap-3">
                      <img src={prod.imageUrl} alt="" className="w-10 h-10 rounded object-cover border border-neutral-200" />
                      <div>
                        {prod.name}
                        {prod.featured && <span className="ml-2 text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">DESTAQUE</span>}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-neutral-600">R$ {prod.price.toFixed(2)}</td>
                  <td className="p-4 text-neutral-600">{prod.store}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${prod.active ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
                      {prod.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-600 font-medium">{prod._count?.clicks || 0}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <a href={prod.affiliateUrl} target="_blank" rel="noreferrer" className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <ExternalLink size={16} />
                    </a>
                    <button onClick={() => handleOpen(prod)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(prod.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden my-8">
            <div className="flex justify-between items-center p-6 border-b border-neutral-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold">{editingId ? 'Editar Produto' : 'Novo Produto'}</h2>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-neutral-700"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Nome do Produto</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-neutral-300 rounded-lg p-2.5" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Slug (URL)</label>
                  <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border border-neutral-300 rounded-lg p-2.5" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Categoria</label>
                  <select required value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full border border-neutral-300 rounded-lg p-2.5">
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Preço Atual (R$)</label>
                  <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})} className="w-full border border-neutral-300 rounded-lg p-2.5" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Preço Antigo (R$)</label>
                  <input type="number" step="0.01" value={formData.oldPrice} onChange={e => setFormData({...formData, oldPrice: e.target.value})} className="w-full border border-neutral-300 rounded-lg p-2.5" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Desconto (%)</label>
                  <input type="number" value={formData.discountPercentage} onChange={e => setFormData({...formData, discountPercentage: e.target.value})} className="w-full border border-neutral-300 rounded-lg p-2.5" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Loja (Ex: Amazon, Shopee)</label>
                  <input required type="text" value={formData.store} onChange={e => setFormData({...formData, store: e.target.value})} className="w-full border border-neutral-300 rounded-lg p-2.5" />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">URL da Imagem</label>
                  <input required type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full border border-neutral-300 rounded-lg p-2.5" />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Link de Afiliado</label>
                  <input required type="url" value={formData.affiliateUrl} onChange={e => setFormData({...formData, affiliateUrl: e.target.value})} className="w-full border border-neutral-300 rounded-lg p-2.5" />
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Descrição Curta</label>
                  <input required type="text" value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} className="w-full border border-neutral-300 rounded-lg p-2.5" />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Descrição Completa (HTML)</label>
                  <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-neutral-300 rounded-lg p-2.5"></textarea>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 pt-4 border-t border-neutral-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})} className="w-4 h-4" />
                  <span className="text-sm font-medium text-neutral-700">Ativo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4" />
                  <span className="text-sm font-medium text-neutral-700">Destaque</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.freeShipping} onChange={e => setFormData({...formData, freeShipping: e.target.checked})} className="w-4 h-4" />
                  <span className="text-sm font-medium text-neutral-700">Frete Grátis</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.fastDelivery} onChange={e => setFormData({...formData, fastDelivery: e.target.checked})} className="w-4 h-4" />
                  <span className="text-sm font-medium text-neutral-700">Entrega Rápida</span>
                </label>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-medium p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  {loading ? 'Salvando...' : 'Salvar Produto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
