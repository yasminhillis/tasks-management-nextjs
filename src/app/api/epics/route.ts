import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get('projectId');
  const offset = req.nextUrl.searchParams.get('offset');
  const limit = req.nextUrl.searchParams.get('limit');
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  const order = req.nextUrl.searchParams.get('order') 
  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}&limit=${limit}&offset=${offset}&order=${order}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        apikey: process.env.SUPABASE_ANON_KEY!,
        Prefer: 'count=exact',
      },
    }
  );

  if (!res.ok) {
    const error = await res.json();
    console.log(error, 'error');
    
    return Response.json({ message: 'Fetching epics failed' }, { status: 404 });
  }

  const contentRange = res.headers.get('content-range');
  const totalCount = contentRange ? parseInt(contentRange.split('/')[1]) : 0;

  const epics = await res.json();

  return Response.json({ data: epics, totalCount }, { status: 200 });
}
