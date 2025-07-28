import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // Si el token no existe, redirige al login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Si el token existe, permite el acceso
  return NextResponse.next();
}

// Aplica el middleware solo a las rutas bajo /administra
export const config = {
  matcher: '/administra/:path*',
};
