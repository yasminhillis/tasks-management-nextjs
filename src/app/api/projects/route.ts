import { cookies } from 'next/headers'; 

export async function POST(request: Request){
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value; 

    if (!token) {
        return Response.json({message: 'Unauthorized'}, { status: 401 })
    }

    const body = await request.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/projects`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`,
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        },
        body: JSON.stringify(body)
    })

    if (!res.ok) {
        return Response.json({message: 'Adding a new project failed. Please try again'}, { status: 400 })
    }

    return Response.json({message: 'Added successfully'}, { status: 200 })
}

export async function GET(){
    const cookieStore = await cookies();
    // console.log(cookieStore, 'cookieStore');
    const token = cookieStore.get('access_token')?.value;
    console.log(token, 'token mm');
    if (!token) {
        return Response.json({message: 'Unauthorized'}, { status: 401 })
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/get_projects`, {
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`,
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        }, 
        method: 'POST'
    })

    if (!res.ok) {
        return Response.json({ message: 'Fetching projects failed. Please try again' }, { status: 400 })
    }

    const data = await res.json()

    return Response.json(data, { status: 200 })
}