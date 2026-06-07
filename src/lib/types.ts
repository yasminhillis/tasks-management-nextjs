export type MemberRole = 'owner' | 'admin' | 'member' | 'viewer' | '' | string;

export type Members = {
  member_id: string;
  name: string;
  email: string;
  role: MemberRole;
};

type MembersMetaData = {
  sub: string;
  name: string;
  email: string;
  department?: string;
  email_verified: boolean;
};

export type MemberData = {
  email: string;
  member_id: string;
  metadata: MembersMetaData;
  project_id: string;
  role: MemberRole;
  user_id: string;
};

export type User = {
  name: string;
  email: string;
  department: string;
};

export type Epic = {
  assignee: User;
  created_at: string;
  created_by: User;
  deadline: string;
  description: string;
  epic_id: string;
  id: string;
  project_id: string;
  title: string;
}; 
