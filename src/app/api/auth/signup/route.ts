import { NextRequest } from "next/server";
import { cookies } from 'next/headers'
export async function POST(req: NextRequest){
    const cookieStore = await cookies()

    const body = await req.json();

    const res = await fetch(
        `${process.env.SUPABASE_URL}/auth/v1/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: process.env.SUPABASE_ANON_KEY!,
          },
          
          body: JSON.stringify({
            email: body.email, 
            password: body.password, 
            data: {
                name: body.name, 
                department: body.jobTitle
            }
          }),
        }
    );

    if (!res.ok) {
        return Response.json({
            message: 'Signup failed. Please try again'
        }, { status: 400 })
    }

    const data = await res.json();

    cookieStore.set('access_token', data.access_token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        path: '/', 
        maxAge: data.expires_in
    })

    cookieStore.set('refresh_token', data.refresh_token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: undefined
    })

    return Response.json({ user: data.user })
}