import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Admin sayfalarını kontrol et
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Login sayfasına erişimi kontrol etme
    if (request.nextUrl.pathname === '/admin/login') {
      // Eğer zaten giriş yapmışsa admin paneline yönlendir
      const isLoggedIn = request.cookies.get('adminToken');
      if (isLoggedIn) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Admin oturum kontrolü
    const isLoggedIn = request.cookies.get('adminToken');
    if (!isLoggedIn) {
      // Login sayfasına yönlendir ve mevcut URL'i kaydet
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Middleware'in çalışacağı path'leri belirt
export const config = {
  matcher: '/admin/:path*'
} 