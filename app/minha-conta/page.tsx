import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import ProfileForm from './ProfileForm';

export default async function AccountPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
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
            <ProfileForm user={{ name: user.name, email: user.email }} />

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
