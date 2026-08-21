import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { ProductCard } from '@/components/products/ProductCard';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function FavoritesPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.id },
    include: {
      product: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex-1 bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-neutral-900 mb-2">Meus Favoritos</h1>
        <p className="text-neutral-600 mb-8">
          Você tem {favorites.length} {favorites.length === 1 ? 'produto salvo' : 'produtos salvos'}.
        </p>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map(fav => (
              <ProductCard key={fav.product.id} product={fav.product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200">
            <p className="text-neutral-500 text-lg">Você ainda não possui produtos favoritos.</p>
          </div>
        )}
      </div>
    </div>
  );
}
