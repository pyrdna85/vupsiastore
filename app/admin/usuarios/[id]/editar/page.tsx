import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EditarUsuario({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id } });
  
  if (!user) {
    redirect('/admin/usuarios');
  }

  async function updateUser(formData: FormData) {
    'use server';
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as 'USER' | 'ADMIN';
    const active = formData.get('active') === 'on';
    
    // In a real app we wouldn't update password like this without hashing, but for this demo:
    const newPasswordHash = formData.get('passwordHash') as string;
    
    const updateData: any = { name, email, role, active };
    if (newPasswordHash) {
      updateData.passwordHash = newPasswordHash;
    }
    
    await prisma.user.update({
      where: { id },
      data: updateData
    });
    
    redirect('/admin/usuarios');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-900">Editar Usuário</h1>
        <Link href="/admin/usuarios" className="text-slate-500 hover:text-slate-800 text-sm font-medium">
          Voltar
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form action={updateUser} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nome</label>
              <input type="text" name="name" defaultValue={user.name} required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input type="email" name="email" defaultValue={user.email} required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nova Senha Hash (Opcional)</label>
              <input type="text" name="passwordHash" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Deixe em branco para não alterar" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nível de Acesso (Role)</label>
              <select name="role" defaultValue={user.role} required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="USER">Usuário (USER)</option>
                <option value="ADMIN">Administrador (ADMIN)</option>
              </select>
            </div>
            
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="active" defaultChecked={user.active} className="w-5 h-5 text-orange-600 rounded" />
                <span className="text-sm font-medium text-slate-700">Conta Ativa</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2 rounded-lg transition-colors">
              Atualizar Usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
