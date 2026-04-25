import { cookies } from 'next/headers'
export async function GET() {
    const cookieStore = await cookies(); 
    const token = cookieStore.get('access_token'); 

    if (!token) {
        return Response.json({ authenticated: false }, { status: 401 })
    }

    return Response.json({ authenticated: true })
}