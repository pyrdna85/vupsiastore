
import prisma from '@/lib/prisma';
import ProductClient from './ProductClient';



export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { clicks: true }
      }
    }
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  return <ProductClient products={products} categories={categories} />;
}

export const dynamic = 'force-dynamic';
