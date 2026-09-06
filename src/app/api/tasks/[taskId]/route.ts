import { getApiHeaders } from "@/lib/utils/getApiHeaders";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: {params: Promise<{ taskId: string }>}){
    const {taskId} = await params;
    const projectId = req.nextUrl.searchParams.get('projectId'); 

    try {
        const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/project_tasks?project_id=eq.${projectId}&id=eq.${taskId}`, {
            headers: await getApiHeaders()
        })

        if (!res.ok) {
            const error = await res.json();
            return Response.json({message: 'Something wrong happened', error} , {status: res.status})
        }

        const taskArr = await res.json(); 
        const task = taskArr[0]
        return Response.json({ message: 'Task details fetched successfully', task}, {status: 200})
    } catch (error) {
        return Response.json({ message: 'Network error. Please check your connection try again' }, { status: 500 })
    }
}