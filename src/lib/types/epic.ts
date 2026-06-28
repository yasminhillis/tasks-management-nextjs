export type User = {
  name: string;
  email: string;
  department: string;
};

export type Epic = {
  assignee: User | null;
  created_at: string;
  created_by: User;
  deadline: string;
  description: string | null;
  epic_id: string;
  id: string;
  project_id: string;
  title: string;
};
