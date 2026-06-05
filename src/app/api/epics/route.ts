import { cookies } from "next/headers"
import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
    const projectId = req.nextUrl.searchParams.get('projectId')
    console.log(projectId, 'projectId');
    
    // console.log(req.nextUrl, 'req.nextUrl');
    
    const cookieStore = await cookies(); 
    const token = cookieStore.get('access_token')?.value; 

    const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', 
            apikey: process.env.SUPABASE_ANON_KEY!
        }
    })

    if (!res.ok) {
        const error = await res.json()
        console.log(error, 'kk');
        
        return Response.json({ message: 'Fetching epics failed'}, { status: 404 })
    }

    const epics = await res.json();
    // console.log(epics, 'epics');
    
    return Response.json({data: epics}, {status: 200})
}