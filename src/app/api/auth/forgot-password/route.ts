import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(`${process.env.SUPABASE_URL}/auth/v1/recover`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.SUPABASE_ANON_KEY!,
    },
    body: JSON.stringify({
      email: body.email,
    }),
  });

  if (!res.ok) {
    return Response.json(
      { message: 'Something went wrong. Please try again' },
      { status: 400 }
    );
  }
  return Response.json({ message: 'Email sent successfully' }, { status: 200 });
}
