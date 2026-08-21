import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isAdminRoute = path.startsWith('/admin') || path.startsWith('/api/admin');
  const isProtectedRoute = path.startsWith('/minha-conta') || path.startsWith('/favoritos');
  const isAuthRoute = path === '/login' || path === '/cadastro';

  const sessionCookie = req.cookies.get('session')?.value;
  let session = null;

  if (sessionCookie) {
    try {
      session = await decrypt(sessionCookie);
    } catch (e) {
      session = null;
    }
  }

  if (isAuthRoute && session) {
    if (session.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', req.nextUrl));
    }
    return NextResponse.redirect(new URL('/minha-conta', req.nextUrl));
  }

  if (isAdminRoute || isProtectedRoute) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    if (isAdminRoute && session.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/minha-conta', req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/minha-conta/:path*', '/favoritos/:path*', '/api/admin/:path*', '/login', '/cadastro'],
};
