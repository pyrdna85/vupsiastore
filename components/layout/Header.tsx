'use client';

import Link from 'next/link';
import { Search, Heart, User, Menu, X, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function Header({ initialSession }: { initialSession: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const [session, setSession] = useState(initialSession);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/busca?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setSession(null);
    router.refresh();
  };

  return (
    <>
      <div className="bg-slate-900 text-white text-[11px] px-6 py-2 hidden md:flex justify-between items-center shrink-0">
        <div className="flex gap-4">
          <span className="opacity-70">Vupsia Oficial</span>
          <span className="opacity-70">Parceiros: Amazon, Shopee, Magalu</span>
        </div>
        <div className="flex gap-4">
          {session?.role === 'ADMIN' && (
            <Link href="/admin" className="hover:text-orange-400">Painel Admin</Link>
          )}
          <a href="#" className="hover:text-orange-400">Suporte</a>
        </div>
      </div>
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4 md:gap-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/" className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-orange-600 tracking-tight" style={{ color: '#FF4C24' }}>
                VUPSIA
              </span>
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-3xl">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="O que você está procurando hoje?"
                className="w-full bg-slate-100 border-none rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500">
                <Search size={18} />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {session ? (
              <>
                <Link href="/favoritos" className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-orange-500 transition-colors">
                  <Heart size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-tight hidden sm:block">Favoritos</span>
                </Link>
                
                <div className="flex items-center gap-3 bg-slate-100 rounded-full pl-1 pr-4 py-1 hover:bg-slate-200 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs uppercase">
                    {session.name.charAt(0)}
                  </div>
                  <div className="hidden sm:flex flex-col">
                    <span className="text-[10px] text-slate-500 leading-none mb-1">Bem-vindo</span>
                    <span className="text-[11px] font-bold leading-none">{session.name.split(' ')[0]}</span>
                  </div>
                  <button onClick={handleLogout} className="ml-2 text-slate-400 hover:text-red-500" title="Sair">
                    <LogOut size={16} />
                  </button>
                </div>
              </>
            ) : (
              <Link href="/login" className="flex flex-col sm:flex-row items-center gap-2 text-sm font-medium text-slate-700 hover:text-orange-500 transition-colors">
                <User size={20} />
                <span className="hidden sm:block text-[10px] font-bold uppercase tracking-tight">Entrar</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="O que você está procurando hoje?"
                className="w-full bg-slate-100 border-none rounded-lg py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={20} />
              </button>
            </form>
            <nav className="flex flex-col space-y-3">
              <Link href="/categoria/eletronicos" className="font-medium text-slate-700 py-2">Eletrônicos</Link>
              <Link href="/categoria/celulares" className="font-medium text-slate-700 py-2">Celulares</Link>
              <Link href="/categoria/casa-inteligente" className="font-medium text-slate-700 py-2">Casa Inteligente</Link>
              {session ? (
                <>
                  <Link href="/favoritos" className="font-medium text-slate-700 py-2">Meus Favoritos</Link>
                  {session.role === 'ADMIN' && <Link href="/admin" className="font-medium text-orange-600 py-2">Painel Admin</Link>}
                  <button onClick={handleLogout} className="text-left font-medium text-red-500 py-2">Sair da conta</button>
                </>
              ) : (
                <Link href="/login" className="font-medium text-orange-600 py-2">Entrar ou Cadastrar</Link>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
