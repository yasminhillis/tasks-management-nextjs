import type { NextRequest } from "next/server";

export async function PUT(req: NextRequest){
    
    const {password, token} = await req.json()
    const res = await fetch(
        `${process.env.SUPABASE_URL}/auth/v1/user`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            apikey: process.env.SUPABASE_ANON_KEY!,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({password: password}),
        }
    );

    if (!res.ok) {
        return Response.json({ message: 'Password reset was not successfull' }, { status: 400 })
    }

    return Response.json({ message: "Password rest successfully" }, { status: 200 })
}