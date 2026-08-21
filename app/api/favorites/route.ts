import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const existing = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId: session.id,
          productId,
        }
      }
    });

    if (existing) {
      // Remove
      await prisma.favorite.delete({
        where: { id: existing.id }
      });
      return NextResponse.json({ success: true, isFavorite: false });
    } else {
      // Add
      await prisma.favorite.create({
        data: {
          userId: session.id,
          productId,
        }
      });
      return NextResponse.json({ success: true, isFavorite: true });
    }
  } catch (error) {
    console.error('Favorites API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
