
import prisma from '@/lib/prisma';
import { ProductCard } from '@/components/products/ProductCard';



export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string; store?: string }>
}) {
  const { q, categoria, store } = await searchParams;

  const where: any = { active: true };

  if (q) {
    where.OR = [
      { name: { contains: q } },
      { description: { contains: q } },
    ];
  }

  if (categoria) {
    where.category = { slug: categoria };
  }

  if (store) {
    where.store = store;
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex-1 bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-neutral-900 mb-2">Resultados da Busca</h1>
        <p className="text-neutral-600 mb-8">
          {products.length} {products.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          {q && <span> para &quot;{q}&quot;</span>}
        </p>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200">
            <p className="text-neutral-500 text-lg">Nenhum produto encontrado com os filtros atuais.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
