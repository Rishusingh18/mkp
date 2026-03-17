import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const proto = request.headers.get('x-forwarded-proto');
  const host = request.headers.get('host') || '';

  // Redirect HTTP to HTTPS, except for local development
  const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');
  
  if (!isLocalhost && (proto === 'http' || !host.startsWith('www.'))) {
    // Only redirect if it's the main domain (don't redirect vercel subdomains)
    if (host.includes('mkppackersmovers.com')) {
      const url = request.nextUrl.clone();
      url.protocol = 'https:';
      url.host = 'www.mkppackersmovers.com';
      url.port = '';
      
      // 301 Permanent Redirect to help Google properly index ONLY HTTPS www version
      return NextResponse.redirect(url, 301);
    }
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
