import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.id },
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex-1 bg-neutral-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-neutral-900 mb-8">Minha Conta</h1>
        
        <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-1">Nome completo</label>
              <p className="text-lg font-medium text-neutral-900">{user.name}</p>
            </div>
            
            <div className="border-t border-neutral-100 pt-6">
              <label className="block text-sm font-medium text-neutral-500 mb-1">Email</label>
              <p className="text-lg font-medium text-neutral-900">{user.email}</p>
            </div>

            <div className="border-t border-neutral-100 pt-6">
              <label className="block text-sm font-medium text-neutral-500 mb-1">Membro desde</label>
              <p className="text-lg font-medium text-neutral-900">
                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
