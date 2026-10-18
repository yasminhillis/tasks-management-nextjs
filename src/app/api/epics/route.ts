import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get('projectId');
  let title = req.nextUrl.searchParams.get('title');
  const offset = req.nextUrl.searchParams.get('offset');
  const limit = req.nextUrl.searchParams.get('limit');
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  const order = req.nextUrl.searchParams.get('order');
  title = title ? encodeURIComponent(title?.trim()) : '';
  console.log(title, 'title');
  console.log(typeof title, 'typeof title');
  console.log(title?.length, 'title length');

  // const url = `${process.env.SUPABASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}&limit=${limit}&offset=${offset}&order=${order}&title=ilike.%25${title}%25`;
  // console.log(url, 'url');
  const url = title
    ? `${process.env.SUPABASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}&limit=${limit}&offset=${offset}&order=${order}&title=ilike.%25${title}%25`
    : `${process.env.SUPABASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}&limit=${limit}&offset=${offset}&order=${order}`;
  console.log(url, 'url 222ddd');

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      apikey: process.env.SUPABASE_ANON_KEY!,
      Prefer: 'count=exact',
    },
  });

  if (!res.ok) {
    const error = await res.json();
    if (error.code === 'PGRST103') {
      return Response.json(
        { message: 'page is out of range', error },
        { status: res.status }
      );
    }
    return Response.json(
      { message: 'Fetching epics failed', error },
      { status: res.status }
    );
  }

  const contentRange = res.headers.get('content-range');
  const totalCount = contentRange ? parseInt(contentRange.split('/')[1]) : 0;

  const epics = await res.json();
  // console.log(epics);
  return Response.json({ data: epics, totalCount }, { status: res.status });
}
