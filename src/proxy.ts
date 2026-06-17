import { NextRequest, NextResponse } from 'next/server';

function isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;  
  const { pathname } = req.nextUrl;

  const refreshToken = req.cookies.get('refresh_token')?.value;
  const rememberMe = req.cookies.get('remember_me')?.value === 'true';

  if (pathname === '/') {
    return NextResponse.redirect(
      new URL(accessToken ? '/project' : '/login', req.url)
    );
  }

  if (pathname === '/reset-password') {
    if (refreshToken) {
      return NextResponse.redirect(new URL('/project', req.url));
    }

    return NextResponse.next();
  }

  const alwaysPublicRoutes = ['/auth/callback'];

  if (alwaysPublicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const authRoutes = ['/login', '/signup'];
  if (authRoutes.includes(pathname)) {
    if (refreshToken) {
      return NextResponse.redirect(new URL('/project', req.url));
    }
    return NextResponse.next();
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (accessToken && !isTokenExpired(accessToken)) {
    return NextResponse.next();
  }

  const res = await fetch(
    `${process.env.SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.SUPABASE_ANON_KEY!,
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    }
  );

  if (!res.ok) {
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    response.cookies.delete('remember_me');
    return response;
  }

  const data = await res.json();
  const response = NextResponse.next();

  response.cookies.set('access_token', data.access_token, {
    httpOnly: true,
    path: '/',
    maxAge: data.expires_in,
  });
  response.cookies.set('refresh_token', data.refresh_token, {
    httpOnly: true,
    path: '/',
    maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined,
  });

  return response;
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/project/:path*',
    '/dashboard/:path*',
    '/reset-password',
  ],
};
