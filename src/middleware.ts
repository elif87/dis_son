import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Admin sayfalarını kontrol et
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Login sayfasına erişimi kontrol etme
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Admin oturum kontrolü
    const isLoggedIn = request.cookies.get('adminToken');
    if (!isLoggedIn) {
      // Login sayfasına yönlendir
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// Middleware'in çalışacağı path'leri belirt
export const config = {
  matcher: '/admin/:path*'
} 