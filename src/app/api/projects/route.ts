import { cookies } from 'next/headers';
export async function POST(request: Request) {  
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/projects`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        apikey: process.env.SUPABASE_ANON_KEY!,
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    return Response.json(
      { message: 'Adding a new project failed. Please try again' },
      { status: 400 }
    );
  }

  return Response.json({ message: 'Added successfully' }, { status: 200 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // console.log(searchParams, 'searchParams1');
  // console.log('params:', Object.fromEntries(searchParams));
  
  const limit = searchParams.get('limit') ?? '5';
  const offset = searchParams.get('offset') ?? '0';
  
  // console.log('limit', limit, 'offset', offset); //
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  if (!token) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  // /rest/v1/rpc/get_projects?limit=3&offset=1
  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/rpc/get_projects?limit=${limit}&offset=${offset}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        apikey: process.env.SUPABASE_ANON_KEY!,
        Prefer: 'count=exact'
      },
      method: 'POST',
    }
  );

  if (!res.ok) {
    return Response.json(
      { message: 'Fetching projects failed. Please try again' },
      { status: 400 }
    );
  }

  const data = await res.json();
  const contentRange = await res.headers.get('content-range');
  const totalCount = contentRange ? parseInt(contentRange.split('/')[1]) : 0;
  // console.log(totalCount, 'totalCount');
  // console.log(typeof totalCount, 'totalCount');
  
  return Response.json({data, totalCount}, { status: 200 });
}
