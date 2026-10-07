# Taskly - Task Management

A modern, scalable Project Management System built to help teams organize work, track progress, and collaborate efficiently.

Designed around a clear workflow:

**Projects → Epics → Tasks**

---

## 📌 Overview

Managing team workflows across multiple projects can become messy fast. This platform solves that by giving teams a clean and structured space to plan, assign, and deliver work.

Whether you're managing a startup team, internal operations, or software development sprints, this system provides the tools needed to stay organized and move faster.

---

## 🎯 Key Goals

- Manage multiple projects in one workspace
- Break large goals into epics and tasks
- Assign responsibilities clearly
- Track progress visually using boards
- Improve collaboration between members
- Build a scalable foundation for future growth
---

## ✨ Features

## 🔐 Authentication

Secure access system with full user account flows:

- User Sign Up
- User Login
- Protected sessions
- Forgot Password
- Reset Password

---

## 📁 Project Management

Create and manage multiple projects.

Each project includes:

- Title
- Description
- Members
- Related epics
- Related tasks

Users can update project details and manage team access.

---

## 👥 Team Collaboration

Invite members directly through email using a token-based invitation flow.

### Includes:

- Email invitations
- Secure invite token
- Accept invite and auto-join project
- Extensible role system

Examples:

- Owner
- Admin
- Member
- Viewer

---

## 🧱 Epics Management

Organize large bodies of work into epics.

### Epic capabilities:

- Create epics inside projects
- Assign users
- Add deadlines
- Track related tasks
- Manage progress clearly

---

## ✅ Task Management

Tasks can be created:

- Inside epics
- Directly under projects

### Task features:

- Title & description
- Assign users
- Due dates
- Status updates
- Edit & delete
- Searchable IDs

---

## 🔄 Task Workflow

Tasks move through a professional status pipeline:

- `TO_DO`
- `IN_PROGRESS`
- `BLOCKED`
- `IN_REVIEW`
- `READY_FOR_QA`
- `REOPENED`
- `READY_FOR_PRODUCTION`
- `DONE`

---

## 📊 Board View

Kanban-style board for visual task management.

### Includes:

- Tasks grouped by status
- Drag & drop movement
- Quick task creation in columns
- Fast progress tracking

---

## 🔍 Search & Filters

Quickly find tasks using:

- Task title
- Task ID

Filter by:

- Project
- Status

---

## 📄 Detailed Views

Dedicated pages and modals for deeper management:

- Task creation & editing pages
- Epic details popup
- Project members page
- Project overview screens

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **State:** Redux Toolkit
- **Forms & validation:** React Hook Form, Zod
- **UI:** react-select, react-datepicker
---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.9 or later
- A Supabase project

### Setup

```bash
git clone https://github.com/yasminhillis/tasks-management-nextjs.git
cd project-management-system
pnpm install
```
create a `.env.local` with your Supabase URL and anon key, then:

```bash
pnpm run dev
```
Open:

```bash
http://localhost:3000
```

## 💡 Why This Project Matters

This project demonstrates real-world engineering skills:

- Authentication systems
- Complex CRUD flows
- Drag & drop UI interactions
- Scalable architecture
- Production-level workflows

## 🔮 Future Improvements

- [ ] **Notifications**: alerts for assignments, mentions, and status changes
- [ ] **Task comments**: discussion threads on each task
- [ ] **File attachments**: upload documents and images to tasks
- [ ] **Activity logs**: a history of who changed what, and when
- [ ] **Time tracking**: log time spent on tasks
- [ ] **Analytics dashboard**: progress and workload insights per project
- [ ] **Team permissions matrix**: fine-grained control over what each role can do
- [ ] **Dark mode**: a theme toggle for the whole app
- [ ] **Mobile app**: a companion app for on-the-go task management

## 👤 Author

[Yasmin Ayman](https://github.com/yasminhillis)
