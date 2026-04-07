import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const VALID_TOKENS = ['mock-token-admin', 'mock-token-cajero'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('puma-auth-token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/pos') || request.nextUrl.pathname.startsWith('/admin');

  const isValidToken = token && VALID_TOKENS.includes(token);

  // No valid token + trying to access secure routes → redirect to login
  if (!isValidToken && !isAuthPage && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Already logged in + trying to access login page → redirect to POS
  if (isValidToken && isAuthPage) {
    return NextResponse.redirect(new URL('/pos', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/pos/:path*', '/admin/:path*', '/login'],
};
