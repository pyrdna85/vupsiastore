
import prisma from '@/lib/prisma';
import CategoryClient from './CategoryClient';



export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <CategoryClient categories={categories} />;
}

export const dynamic = 'force-dynamic';
