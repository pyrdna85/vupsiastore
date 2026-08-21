import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.redirect(new URL('/404', request.url));
    }

    const cookieStore = await cookies();
    const clickCookieName = `clicked_${productId}`;
    const hasClickedRecently = cookieStore.get(clickCookieName);

    if (!hasClickedRecently) {
      const session = await getSession();
      
      await prisma.click.create({
        data: {
          productId: product.id,
          userId: session?.userId || null,
        }
      });
      
      cookieStore.set(clickCookieName, 'true', {
        maxAge: 60 * 60, // 1 hour cooldown for duplicates
        httpOnly: true,
      });
    }

    return NextResponse.redirect(product.affiliateUrl);
  } catch (error) {
    console.error('Error tracking click:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}
export const dynamic = 'force-dynamic';
