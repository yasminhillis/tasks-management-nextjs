import { getApiHeaders } from "@/lib/utils/getApiHeaders";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const projectId = req.nextUrl.searchParams.get('projectId'); 
    const status = req.nextUrl.searchParams.get('status');
    const title = req.nextUrl.searchParams.get('title')?.trim() || null;
    const offset = req.nextUrl.searchParams.get('offset') || 0;
    const limit = req.nextUrl.searchParams.get('limit') || 10;
    
    try {
        let url = `${process.env.SUPABASE_URL}/rest/v1/project_tasks?project_id=eq.${projectId}&limit=${limit}&offset=${offset}`

        if (status) {
            url += `&status=eq.${status}`
        }
        
        if (title) {
            url += `&title=ilike.%25${encodeURIComponent(title)}%25`
        }

        const resHeaders = await getApiHeaders();

        const res = await fetch(url, {
            headers: {...resHeaders, Prefer: 'count=exact'}
        });

        if (!res.ok) {
            const error = await res.json();
            return Response.json({success: false, message: 'fetching tasks failed', error}, {status: res.status})
        }

        const contentRange = res.headers.get('content-range');
        
        const totalCount = contentRange ? Number(contentRange.split('/')[1]) : 0
        
        const tasks =  await res.json(); 
        
        return Response.json({success: true, message: 'tasks fetched successfully', tasks, taskCount: totalCount},  {status: res.status})
    } catch (error) {
        return Response.json({ success: false, message: 'Network error. Please try again' }, {status: 503})
    }
}