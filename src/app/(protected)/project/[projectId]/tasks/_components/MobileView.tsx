import { useEffect } from "react";
import MobileTaskCard from "./MobileTaskCard";

const tasks = [
  {
    id: "1",
    project_id: "ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea",
    epic_id: "epic-1",
    title: "Implement user authentication",
    description: "Add login and signup functionality with form validation.",
    status: "TO DO",
    created_at: "2026-08-10T09:30:00+00:00",
    due_date: "2026-08-18T21:00:00+00:00",
    task_id: "TASK-101",
    epic: {
      id: "epic-1",
      title: "Authentication",
      epic_id: "EPIC-1",
    },
    created_by: {
      id: "user-1",
      name: "Yasmin Ayman",
      email: "yasmin@example.com",
      department: "Frontend",
    },
    assignee: {
      id: "user-2",
      name: "Nour Hassan",
      email: "nour@example.com",
      department: "Backend",
    },
  },

  {
    id: "2",
    project_id: "ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea",
    epic_id: "epic-2",
    title: "Design dashboard layout",
    description: "Create the main dashboard structure based on the approved Figma design.",
    status: "IN PROGRESS",
    created_at: "2026-08-08T11:00:00+00:00",
    due_date: "2026-08-16T21:00:00+00:00",
    task_id: "TASK-102",
    epic: {
      id: "epic-2",
      title: "Dashboard",
      epic_id: "EPIC-2",
    },
    created_by: {
      id: "user-3",
      name: "Maya Ali",
      email: "maya@example.com",
      department: "Product",
    },
    assignee: {
      id: "user-1",
      name: "Yasmin Ayman",
      email: "yasmin@example.com",
      department: "Frontend",
    },
  },

  {
    id: "3",
    project_id: "ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea",
    epic_id: "epic-2",
    title: "Fix dashboard API integration",
    description: "Resolve incorrect task counts returned by the dashboard endpoint.",
    status: "BLOCKED",
    created_at: "2026-08-07T14:20:00+00:00",
    due_date: "2026-08-17T21:00:00+00:00",
    task_id: "TASK-103",
    epic: {
      id: "epic-2",
      title: "Dashboard",
      epic_id: "EPIC-2",
    },
    created_by: {
      id: "user-1",
      name: "Yasmin Ayman",
      email: "yasmin@example.com",
      department: "Frontend",
    },
    assignee: {
      id: "user-2",
      name: "Nour Hassan",
      email: "nour@example.com",
      department: "Backend",
    },
  },

  {
    id: "4",
    project_id: "ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea",
    epic_id: "epic-3",
    title: "Add task filtering",
    description: "Allow users to filter tasks by status, assignee, and due date.",
    status: "IN REVIEW",
    created_at: "2026-08-05T10:15:00+00:00",
    due_date: "2026-08-15T21:00:00+00:00",
    task_id: "TASK-104",
    epic: {
      id: "epic-3",
      title: "Task Management",
      epic_id: "EPIC-3",
    },
    created_by: {
      id: "user-3",
      name: "Maya Ali",
      email: "maya@example.com",
      department: "Product",
    },
    assignee: {
      id: "user-1",
      name: "Yasmin Ayman",
      email: "yasmin@example.com",
      department: "Frontend",
    },
  },

  {
    id: "5",
    project_id: "ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea",
    epic_id: "epic-3",
    title: "Improve task card accessibility",
    description: "Add keyboard navigation, accessible labels, and improved focus states.",
    status: "READY FOR QA",
    created_at: "2026-08-04T13:45:00+00:00",
    due_date: "2026-08-19T21:00:00+00:00",
    task_id: "TASK-105",
    epic: {
      id: "epic-3",
      title: "Task Management",
      epic_id: "EPIC-3",
    },
    created_by: {
      id: "user-1",
      name: "Yasmin Ayman",
      email: "yasmin@example.com",
      department: "Frontend",
    },
    assignee: {
      id: "user-4",
      name: "Sara Ahmed",
      email: "sara@example.com",
      department: "QA",
    },
  },

  {
    id: "6",
    project_id: "ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea",
    epic_id: null,
    title: "Update project documentation",
    description: "Document the new task workflow and API endpoints.",
    status: "REOPENED",
    created_at: "2026-08-03T16:30:00+00:00",
    due_date: "2026-08-20T21:00:00+00:00",
    task_id: "TASK-106",
    epic: {
      id: null,
      title: null,
      epic_id: null,
    },
    created_by: {
      id: "user-2",
      name: "Nour Hassan",
      email: "nour@example.com",
      department: "Backend",
    },
    assignee: {
      id: "user-1",
      name: "Yasmin Ayman",
      email: "yasmin@example.com",
      department: "Frontend",
    },
  },

  {
    id: "7",
    project_id: "ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea",
    epic_id: "epic-1",
    title: "Add password reset flow",
    description: "Implement forgot password and reset password screens.",
    status: "READY FOR PRODUCTION",
    created_at: "2026-07-30T09:00:00+00:00",
    due_date: "2026-08-14T21:00:00+00:00",
    task_id: "TASK-107",
    epic: {
      id: "epic-1",
      title: "Authentication",
      epic_id: "EPIC-1",
    },
    created_by: {
      id: "user-1",
      name: "Yasmin Ayman",
      email: "yasmin@example.com",
      department: "Frontend",
    },
    assignee: {
      id: "user-2",
      name: "Nour Hassan",
      email: "nour@example.com",
      department: "Backend",
    },
  },

  {
    id: "8",
    project_id: "ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea",
    epic_id: "epic-4",
    title: "Set up production monitoring",
    description: "Configure error tracking and basic application performance monitoring.",
    status: "DONE",
    created_at: "2026-07-25T12:00:00+00:00",
    due_date: "2026-08-05T21:00:00+00:00",
    task_id: "TASK-108",
    epic: {
      id: "epic-4",
      title: "Infrastructure",
      epic_id: "EPIC-4",
    },
    created_by: {
      id: "user-2",
      name: "Nour Hassan",
      email: "nour@example.com",
      department: "Backend",
    },
    assignee: {
      id: "user-2",
      name: "Nour Hassan",
      email: "nour@example.com",
      department: "Backend",
    },
  },

  {
    id: "9",
    project_id: "ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea",
    epic_id: "epic-3",
    title: "Add pagination to task list",
    description: "Implement pagination to improve performance for projects with many tasks.",
    status: "TO DO",
    created_at: "2026-08-11T08:30:00+00:00",
    due_date: "2026-08-22T21:00:00+00:00",
    task_id: "TASK-109",
    epic: {
      id: "epic-3",
      title: "Task Management",
      epic_id: "EPIC-3",
    },
    created_by: {
      id: "user-1",
      name: "Yasmin Ayman",
      email: "yasmin@example.com",
      department: "Frontend",
    },
    assignee: null,
  },

  {
    id: "10",
    project_id: "ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea",
    epic_id: "epic-2",
    title: "Optimize dashboard loading performance",
    description: "Reduce initial load time by optimizing API requests and lazy-loading heavy components.",
    status: "IN PROGRESS",
    created_at: "2026-08-09T15:10:00+00:00",
    due_date: "2026-08-21T21:00:00+00:00",
    task_id: "TASK-110",
    epic: {
      id: "epic-2",
      title: "Dashboard",
      epic_id: "EPIC-2",
    },
    created_by: {
      id: "user-3",
      name: "Maya Ali",
      email: "maya@example.com",
      department: "Product",
    },
    assignee: {
      id: "user-1",
      name: "Yasmin Ayman",
      email: "yasmin@example.com",
      department: "Frontend",
    },
  },
];

export default function MobileView({ projectId }: {projectId: string}){
    return <ul className="flex flex-col gap-3">
        {
          tasks.map(task => <MobileTaskCard taskId={task.task_id} title={task.title} assigneeName={task.assignee?.name ?? 'Unassigned'} dueDate={task.due_date} status={task.status}/>)
        }
    </ul>
}