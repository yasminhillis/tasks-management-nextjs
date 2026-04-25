import { NextRequest, NextResponse } from 'next/server'; 

function isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1])); 
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now
}

export async function middleware(req: NextRequest){
    const accessToken = req.cookies.get('access_token')?.value; 
    const refreshToken = req.cookies.get('refresh_token')?.value; 

    if (!accessToken || !refreshToken) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (!isTokenExpired(accessToken)) {
        return NextResponse.next()
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
            'apikey':  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        },
        body: JSON.stringify({ refresh_token: refreshToken })
    })

    if (!res.ok) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    const data = await res.json(); 
    const response = NextResponse.next(); 

    response.cookies.set('access_token', data.access_token, { httpOnly: true, path: '/' })
    response.cookies.set('refresh_token', data.refresh_token, { httpOnly: true, path: '/' })

    return response 
}

export const config = {
    matcher: ['/projects/:path*', '/dashboard/:path*']
}