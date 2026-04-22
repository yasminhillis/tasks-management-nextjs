import { cookies } from "next/headers";
export async function POST(req: Request){
    const cookieStore = await cookies()
    const body = await req.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json", 
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        }, 
        body: JSON.stringify(body)
    })
    const data = await res.json();
    if (!res.ok) {
        return Response.json({ message: 'Invalid email or password'}, {status: 400 })
    }

    cookieStore.set('access_token', data.access_token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        path: '/'
    })

    cookieStore.set('refresh_token', data.refresh_token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        path: '/'
    })

    return Response.json({user: data.user})
}