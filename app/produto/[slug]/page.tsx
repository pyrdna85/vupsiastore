import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Truck, Zap, ExternalLink } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';

export const dynamic = 'force-dynamic';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    }
  });

  if (!product || !product.active) {
    notFound();
  }

  const relatedProducts = await prisma.product.findMany({
    where: { active: true, categoryId: product.categoryId, id: { not: product.id } },
    take: 4,
  });

  return (
    <div className="flex-1 bg-white">
      {/* Breadcrumb */}
      <div className="bg-neutral-50 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center text-sm text-neutral-500 gap-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">Início</Link>
          <ChevronRight size={16} />
          <Link href={`/categoria/${product.category.slug}`} className="hover:text-blue-600 transition-colors">{product.category.name}</Link>
          <ChevronRight size={16} />
          <span className="text-neutral-900 font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-2xl bg-neutral-50 border border-neutral-200 overflow-hidden flex items-center justify-center p-8">
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                fill
                className="object-contain mix-blend-multiply"
                priority
                referrerPolicy="no-referrer"
              />
              {product.discountPercentage && (
                <div className="absolute top-4 right-4 bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg z-10 text-sm">
                  🔥 {product.discountPercentage}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">{product.name}</h1>
            <p className="text-lg text-neutral-500 mb-6">{product.shortDescription}</p>

            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold bg-neutral-200 text-neutral-700 px-3 py-1 rounded-full">
                  Vendido por: {product.store}
                </span>
              </div>
              
              <div className="flex flex-col mb-6">
                {product.oldPrice && (
                  <span className="text-neutral-400 line-through text-lg">
                    De: R$ {product.oldPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
                <span className="text-4xl font-black text-neutral-900">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <div className="space-y-3 mb-8">
                {product.freeShipping && (
                  <div className="flex items-center gap-3 text-green-700 bg-green-50 px-4 py-3 rounded-xl border border-green-100">
                    <Truck size={20} />
                    <span className="font-medium">Frete Grátis disponível</span>
                  </div>
                )}
                {product.fastDelivery && (
                  <div className="flex items-center gap-3 text-blue-700 bg-blue-50 px-4 py-3 rounded-xl border border-blue-100">
                    <Zap size={20} />
                    <span className="font-medium">Entrega Rápida garantida</span>
                  </div>
                )}
              </div>

              <Link 
                href={`/go/${product.id}`}
                target="_blank"
                className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                Comprar Agora
                <ExternalLink size={20} />
              </Link>
              <p className="text-xs text-neutral-500 text-center mt-4">
                Ao clicar, você será redirecionado para a loja parceira de forma segura.
              </p>
            </div>

            <div className="prose prose-blue max-w-none text-neutral-600">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Sobre o produto</h3>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-bold text-neutral-900 mb-8">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
