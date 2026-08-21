'use client';

import { useState } from 'react';
import { updateProfile } from './actions';

export default function ProfileForm({ user }: { user: { name: string; email: string } }) {
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await updateProfile({ name, password });
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
      setPassword('');
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Erro ao atualizar o perfil.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message.text && (
        <div className={`p-4 rounded-xl text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Nome completo</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Email (não pode ser alterado)</label>
        <input
          type="email"
          disabled
          value={user.email}
          className="w-full px-4 py-2 border border-neutral-200 bg-neutral-50 rounded-xl text-neutral-500 cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Nova Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Deixe em branco para não alterar"
          className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <p className="text-xs text-neutral-500 mt-1">Mínimo de 8 caracteres.</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-70"
      >
        {loading ? 'Salvando...' : 'Salvar Alterações'}
      </button>
    </form>
  );
}
