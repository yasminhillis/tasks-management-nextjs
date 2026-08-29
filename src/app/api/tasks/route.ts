import { getApiHeaders } from "@/lib/utils/getApiHeaders";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const projectId = req.nextUrl.searchParams.get('projectId'); 
    const status = req.nextUrl.searchParams.get('status');

    try {
        let url = `${process.env.SUPABASE_URL}/rest/v1/project_tasks?project_id=eq.${projectId}`

        if (status) {
            url += `&status=eq.${status}`
        }

        const res = await fetch(url, {
            headers: await getApiHeaders()
        });

        if (!res.ok) {
            const error = await res.json();
            console.error(error, 'error fetching tasks by statuss');  
            return Response.json({success: false, message: 'fetching tasks failed', error}, {status: res.status})
        }
        
        const tasks =  await res.json(); 

        return Response.json({success: true, message: 'tasks fetched successfully', tasks, taskCount: tasks.length},  {status: 200})
    } catch (error) {
        return Response.json({ success: false, message: 'Network error. Please try again' }, {status: 503})
    }
}