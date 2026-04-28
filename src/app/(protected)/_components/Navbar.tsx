import { cookies } from "next/headers";

type UserMetaData = {
    name: string, 
    department: string
}

type UserData = {
    userMetaData: UserMetaData
}

function getInitials(name: string): string {
    let nameParts = name.split(' ')

  if (nameParts.length >= 2) {
    return nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase()
  }
  return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase()
}

export default async function Navbar(){
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
        headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            'Authorization': `Bearer ${token}`
        }
    })

    if (!res.ok) {
        const error = await res.json();
        console.log(error);
        return;
    }

    const data = await res.json(); 

    const name = data.user_metadata.name; 
    const department = data.user_metadata.department

    const userData: UserMetaData = {
        name,
        department
    }
    

    return <header className="font-sans flex items-center gap-4 justify-end px-6 py-3 border-b border-b-[#0000001A] bg-[#F9F9FF] w-full">
        <div className="flex flex-col items-end">
            <h1 className="text-slate-900 font-semibold text-sm">{userData.name}</h1>
            <h2 className="text-[#003D9B] uppercase font-bold text-[10px] tracking-[1px]">{userData.department}</h2>
        </div>
        <div className="bg-primary-container w-[40px] h-[40px] flex items-center justify-center shadow-sm text-white rounded-md font-bold text-[16px]">{getInitials(userData.name)}</div>
    </header>
}