export async function GET(){
    const res = await fetch(`${process.env.SUPABASE_URL}/auth/v1/health`, {
        headers: {
            apikey: process.env.SUPABASE_ANON_KEY!
        }
    })    

    return Response.json({
        status: res.ok ? 'Alive' : 'Error'
    })
} 