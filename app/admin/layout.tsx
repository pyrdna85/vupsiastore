import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Tags, Image as ImageIcon, Users } from 'lucide-react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    redirect('/');
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Produtos', href: '/admin/produtos', icon: ShoppingBag },
    { label: 'Categorias', href: '/admin/categorias', icon: Tags },
    { label: 'Banners', href: '/admin/banners', icon: ImageIcon },
    { label: 'Usuários', href: '/admin/usuarios', icon: Users },
  ];

  return (
    <div className="flex-1 flex flex-col bg-neutral-50 min-h-screen">
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-6 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 py-4 px-2 text-sm font-semibold text-neutral-600 hover:text-blue-600 whitespace-nowrap transition-colors"
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
