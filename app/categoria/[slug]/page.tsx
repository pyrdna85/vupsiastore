import prisma from '@/lib/prisma';
import { ProductCard } from '@/components/products/ProductCard';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug }
  });

  if (!category) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: { active: true, categoryId: category.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex-1 bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-neutral-900 mb-2">{category.name}</h1>
        {category.description && <p className="text-neutral-600 mb-8">{category.description}</p>}
        
        <p className="text-neutral-500 mb-8 font-medium">
          {products.length} {products.length === 1 ? 'produto' : 'produtos'}
        </p>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200">
            <p className="text-neutral-500 text-lg">Nenhum produto nesta categoria ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
