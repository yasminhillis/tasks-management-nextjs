export type MemberRole = "owner" | "admin" | "member" | "viewer";
export type Members = {
    member_id: string,
    name: string, 
    email: string, 
    role: MemberRole, 
}