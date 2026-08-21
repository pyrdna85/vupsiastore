
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { ProductCard } from '@/components/products/ProductCard';
import { LayoutGrid } from 'lucide-react';


export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const [categories, featuredProducts, popularProducts, banners] = await Promise.all([
    prisma.category.findMany({ where: { active: true }, take: 12 }),
    prisma.product.findMany({ 
      where: { active: true, featured: true }, 
      take: 8,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.product.findMany({ 
      where: { active: true }, 
      take: 4,
      orderBy: { clicks: { _count: 'desc' } }
    }),
    prisma.banner.findMany({
      where: { active: true },
      orderBy: { position: 'asc' },
      take: 3
    })
  ]);

  const mainBanner = banners.length > 0 ? banners[0] : null;

  return (
    <div className="flex flex-col w-full">
      {/* Categories Navigation */}
      <nav className="bg-white border-b border-slate-100 px-4 sm:px-6 py-2 flex gap-6 shrink-0 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-6 w-full">
          <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-md text-xs font-bold whitespace-nowrap shrink-0">
            <LayoutGrid size={14} />
            Categorias
          </div>
          <div className="flex items-center gap-5 text-xs font-medium text-slate-600 whitespace-nowrap overflow-x-auto no-scrollbar">
            {categories.map(category => (
              <Link key={category.id} href={`/categoria/${category.slug}`} className="hover:text-orange-500 transition-colors">
                {category.name}
              </Link>
            ))}
            <Link href="/busca?destaques=true" className="text-orange-500 font-bold hover:underline">
              Queima de Estoque
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center relative overflow-hidden shrink-0 min-h-[140px]">
            <div className="relative z-10 flex-1">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Ofertas do Dia</span>
              <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mt-1">
                ACHADINHOS DA SEMANA<br/>
                <span className="text-orange-200 uppercase">Até 70% de Desconto</span>
              </h1>
              <div className="mt-4 flex gap-2 relative z-10">
                <Link href="/busca" className="bg-white text-orange-600 px-6 py-2 rounded-lg font-bold text-sm shadow-lg inline-block hover:bg-slate-50 transition-colors">
                  Ver Todas Ofertas
                </Link>
              </div>
            </div>
            {mainBanner && (
              <div className="flex-1 w-full relative aspect-video md:aspect-[3/1] rounded-xl overflow-hidden border-2 border-white/10 hidden md:block max-w-sm ml-4 z-10">
                <Link href={mainBanner.linkUrl || '/busca'}>
                  <Image 
                    src={mainBanner.imageUrl} 
                    alt={mainBanner.title || 'Banner principal'} 
                    fill 
                    className="object-cover"
                    priority
                    referrerPolicy="no-referrer"
                  />
                </Link>
              </div>
            )}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute right-20 -top-10 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="px-4 sm:px-6 pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-lg font-bold text-slate-800">Destaques que você não pode perder</h2>
              <Link href="/busca?destaques=true" className="text-xs font-bold text-orange-600 hover:underline uppercase tracking-wide">
                Ver mais
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Products */}
      {popularProducts.length > 0 && (
        <section className="px-4 sm:px-6 pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-lg font-bold text-slate-800">Mais Acessados</h2>
              <Link href="/busca" className="text-xs font-bold text-orange-600 hover:underline uppercase tracking-wide">
                Ver mais
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {popularProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Store Section */}
      <section className="px-4 sm:px-6 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-2xl p-6 text-white text-center">
            <h2 className="text-lg font-bold mb-2">Encontre ofertas das maiores lojas</h2>
            <p className="text-slate-400 text-xs mb-6 max-w-2xl mx-auto">Reunimos os melhores produtos da Amazon, Shopee, Magazine Luiza, Shein e muito mais em um só lugar.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Amazon', 'Shopee', 'Mercado Livre', 'Magalu', 'Shein'].map(store => (
                <span key={store} className="bg-white/10 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide">
                  {store}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const dynamic = 'force-dynamic';
