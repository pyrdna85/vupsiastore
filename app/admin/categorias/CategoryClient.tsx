'use client';

import { useState } from 'react';
import { createCategory, updateCategory, deleteCategory } from '../actions';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function CategoryClient({ categories }: { categories: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '', icon: '', imageUrl: '', active: true });
  const [loading, setLoading] = useState(false);

  const handleOpen = (cat?: any) => {
    if (cat) {
      setEditingId(cat.id);
      setFormData({ name: cat.name, slug: cat.slug, icon: cat.icon || '', imageUrl: cat.imageUrl || '', active: cat.active });
    } else {
      setEditingId(null);
      setFormData({ name: '', slug: '', icon: '', imageUrl: '', active: true });
    }
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateCategory(editingId, formData);
      } else {
        await createCategory(formData);
      }
      setIsOpen(false);
    } catch (error) {
      alert('Erro ao salvar categoria');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir? Isso pode quebrar produtos associados.')) {
      setLoading(true);
      try {
        await deleteCategory(id);
      } catch (error) {
        alert('Erro ao excluir (verifique se existem produtos usando esta categoria)');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Categorias</h1>
        <button onClick={() => handleOpen()} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700">
          <Plus size={18} /> Nova Categoria
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 text-sm">
              <th className="p-4 font-medium">Nome</th>
              <th className="p-4 font-medium">Slug</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="p-4 font-medium text-neutral-900">{cat.name}</td>
                <td className="p-4 text-neutral-500">{cat.slug}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${cat.active ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
                    {cat.active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="p-4 flex justify-end gap-2">
                  <button onClick={() => handleOpen(cat)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-neutral-500">Nenhuma categoria encontrada</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-neutral-100">
              <h2 className="text-xl font-bold">{editingId ? 'Editar Categoria' : 'Nova Categoria'}</h2>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-neutral-700"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Nome</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-neutral-300 rounded-lg p-2.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Slug (URL)</label>
                <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border border-neutral-300 rounded-lg p-2.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Ícone (Nome Lucide)</label>
                <input type="text" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full border border-neutral-300 rounded-lg p-2.5" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="active" checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})} />
                <label htmlFor="active" className="text-sm font-medium text-neutral-700">Categoria Ativa</label>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-medium p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {loading ? 'Salvando...' : 'Salvar Categoria'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
