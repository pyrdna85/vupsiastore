'use client';

import { useState } from 'react';
import { createBanner, updateBanner, deleteBanner } from '../actions';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function BannerClient({ banners }: { banners: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const initialForm = { title: '', subtitle: '', imageUrl: '', linkUrl: '', position: 0, active: true };
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleOpen = (banner?: any) => {
    if (banner) {
      setEditingId(banner.id);
      setFormData({
        title: banner.title || '',
        subtitle: banner.subtitle || '',
        imageUrl: banner.imageUrl || '',
        linkUrl: banner.linkUrl || '',
        position: banner.position || 0,
        active: banner.active
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
        position: Number(formData.position)
      };

      if (editingId) {
        await updateBanner(editingId, dataToSave);
      } else {
        await createBanner(dataToSave);
      }
      setIsOpen(false);
    } catch (error) {
      alert('Erro ao salvar banner');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este banner?')) {
      setLoading(true);
      try {
        await deleteBanner(id);
      } catch (error) {
        alert('Erro ao excluir banner');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Banners</h1>
        <button onClick={() => handleOpen()} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700">
          <Plus size={18} /> Novo Banner
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 text-sm">
                <th className="p-4 font-medium">Preview</th>
                <th className="p-4 font-medium">Informações</th>
                <th className="p-4 font-medium">Posição</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {banners.map(banner => (
                <tr key={banner.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="p-4">
                    <img src={banner.imageUrl} alt={banner.title || 'Banner'} className="w-32 h-16 object-cover rounded-lg border border-neutral-200" />
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-neutral-900">{banner.title || '(Sem título)'}</div>
                    <div className="text-xs text-neutral-500">{banner.linkUrl}</div>
                  </td>
                  <td className="p-4 text-neutral-600">{banner.position}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${banner.active ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
                      {banner.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-2 items-center h-full pt-6">
                    <button onClick={() => handleOpen(banner)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(banner.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {banners.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-neutral-500">Nenhum banner cadastrado</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden my-8">
            <div className="flex justify-between items-center p-6 border-b border-neutral-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold">{editingId ? 'Editar Banner' : 'Novo Banner'}</h2>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-neutral-700"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Título (Opcional)</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-neutral-300 rounded-lg p-2.5" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Subtítulo (Opcional)</label>
                <input type="text" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full border border-neutral-300 rounded-lg p-2.5" />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">URL da Imagem</label>
                <input required type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full border border-neutral-300 rounded-lg p-2.5" />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Link de Destino (URL)</label>
                <input type="text" value={formData.linkUrl} onChange={e => setFormData({...formData, linkUrl: e.target.value})} className="w-full border border-neutral-300 rounded-lg p-2.5" />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Posição (Ordem de exibição)</label>
                <input required type="number" value={formData.position} onChange={e => setFormData({...formData, position: parseInt(e.target.value) || 0})} className="w-full border border-neutral-300 rounded-lg p-2.5" />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="bannerActive" checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})} className="w-4 h-4" />
                <label htmlFor="bannerActive" className="text-sm font-medium text-neutral-700">Banner Ativo</label>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-medium p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  {loading ? 'Salvando...' : 'Salvar Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
