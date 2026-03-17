import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const proto = request.headers.get('x-forwarded-proto');
  const host = request.headers.get('host') || '';

  // Redirect HTTP to HTTPS, except for local development
  if (proto === 'http' && !host.includes('localhost') && !host.includes('127.0.0.1')) {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.port = '';
    
    // 301 Permanent Redirect to help Google properly index ONLY HTTPS versions
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
