'use client';

import { useState } from 'react';
import { updateUserRole, toggleUserStatus } from '../actions';
import { Shield, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

export default function UserClient({ users }: { users: any[] }) {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const handleRoleChange = async (id: string, currentRole: string) => {
    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    if (confirm(`Deseja alterar este usuário para ${newRole}?`)) {
      setLoading(true);
      try {
        await updateUserRole(id, newRole);
      } catch (error) {
        alert('Erro ao alterar permissão');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleStatusChange = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    if (confirm(`Deseja ${newStatus ? 'ativar' : 'desativar'} este usuário?`)) {
      setLoading(true);
      try {
        await toggleUserStatus(id, newStatus);
      } catch (error) {
        alert('Erro ao alterar status');
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Usuários</h1>
      </div>

      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Buscar por nome ou email..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-md border border-neutral-300 rounded-lg p-2.5"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 text-sm">
                <th className="p-4 font-medium">Nome</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Cadastro</th>
                <th className="p-4 font-medium">Nível de Acesso</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="p-4 font-medium text-neutral-900">{user.name}</td>
                  <td className="p-4 text-neutral-600">{user.email}</td>
                  <td className="p-4 text-neutral-500 text-sm">
                    {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleRoleChange(user.id, user.role)}
                      disabled={loading}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        user.role === 'ADMIN' 
                        ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                      title="Clique para alterar o nível de acesso"
                    >
                      {user.role === 'ADMIN' ? <ShieldAlert size={14} /> : <Shield size={14} />}
                      {user.role === 'ADMIN' ? 'ADMINISTRADOR' : 'USUÁRIO'}
                    </button>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleStatusChange(user.id, user.active)}
                      disabled={loading}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        user.active 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                      title="Clique para ativar/desativar"
                    >
                      {user.active ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {user.active ? 'ATIVO' : 'INATIVO'}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-neutral-500">Nenhum usuário encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
