import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function NovoUsuario() {
  async function createUser(formData: FormData) {
    'use server';
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const passwordHash = formData.get('passwordHash') as string;
    const role = formData.get('role') as 'USER' | 'ADMIN';
    const active = formData.get('active') === 'on';
    
    await prisma.user.create({
      data: {
        name, email, passwordHash, role, active
      }
    });
    
    redirect('/admin/usuarios');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-900">Novo Usuário</h1>
        <Link href="/admin/usuarios" className="text-slate-500 hover:text-slate-800 text-sm font-medium">
          Voltar
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form action={createUser} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nome</label>
              <input type="text" name="name" required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input type="email" name="email" required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Senha Hash (Provisório)</label>
              <input type="text" name="passwordHash" required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Para testes, insira qualquer string" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nível de Acesso (Role)</label>
              <select name="role" required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="USER">Usuário (USER)</option>
                <option value="ADMIN">Administrador (ADMIN)</option>
              </select>
            </div>
            
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="active" defaultChecked className="w-5 h-5 text-orange-600 rounded" />
                <span className="text-sm font-medium text-slate-700">Conta Ativa</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2 rounded-lg transition-colors">
              Salvar Usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
