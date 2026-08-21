
import prisma from '@/lib/prisma';
import BannerClient from './BannerClient';



export default async function AdminBannersPage() {
  const banners = await prisma.banner.findMany({
    orderBy: { position: 'asc' }
  });

  return <BannerClient banners={banners} />;
}

export const dynamic = 'force-dynamic';
