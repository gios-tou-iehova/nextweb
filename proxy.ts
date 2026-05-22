import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that are always public (no auth needed)
const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/register',
];

// Routes that are always public regardless of auth
const ALWAYS_PUBLIC_PREFIXES = [
  '/_next',
  '/api',
  '/favicon',
  '/apple-touch',
  '/android-chrome',
  '/favicon-',
  '/site.webmanifest',
  '/browserconfig.xml',
  '/sw.js',
  '/offline.html',
  '/images',
  '/public',
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow static files and Next.js internals
  if (ALWAYS_PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Always allow public auth routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for auth token in cookies (set by client after login)
  const token = request.cookies.get('auth_token')?.value;

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    // Preserve the original URL so we can redirect back after login
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except static files
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)).*)',
  ],
};
