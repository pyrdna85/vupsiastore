import prisma from '@/lib/prisma';
import { Trash2 } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function AdminUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  async function toggleRole(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const current = formData.get('current') as string;
    const newRole = current === 'ADMIN' ? 'USER' : 'ADMIN';
    await prisma.user.update({ where: { id }, data: { role: newRole } });
    revalidatePath('/admin/usuarios');
  }

  async function deleteUser(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.user.delete({ where: { id } });
    revalidatePath('/admin/usuarios');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-900">Gerenciar Usuários</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wide">
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3 text-center">Permissão</th>
                <th className="px-4 py-3 text-center">Cadastro</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs uppercase">
                      {user.name.charAt(0)}
                    </div>
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{user.email}</td>
                  <td className="px-4 py-3 text-center">
                    <form action={toggleRole}>
                      <input type="hidden" name="id" value={user.id} />
                      <input type="hidden" name="current" value={user.role} />
                      <button type="submit" className={`text-[9px] font-bold px-2 py-1 rounded uppercase transition-colors ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                        {user.role}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-center text-slate-500">
                    {user.createdAt.toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      <form action={deleteUser}>
                        <input type="hidden" name="id" value={user.id} />
                        <button type="submit" className="text-slate-400 hover:text-red-500 transition-colors p-1" title="Excluir">
                          <Trash2 size={16}/>
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
