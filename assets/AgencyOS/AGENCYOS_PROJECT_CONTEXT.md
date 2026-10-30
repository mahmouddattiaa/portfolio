# Project Context: AgencyOS

## 1. What This Project Does
AgencyOS is a comprehensive, real-time operating system designed specifically for growth, marketing, and creative agencies. It serves as a unified command center that replaces fragmented tool stacks (like using separate tools for task management, client communication, and financial tracking). 

By bringing strategy, campaign execution, client collaboration, and financial control into one platform, AgencyOS eliminates recurring status meetings and reduces handoff friction. Teams can seamlessly move from campaign planning to delivery boards, while leadership gains immediate visibility into pipeline velocity, account health, and overall profitability.

## 2. Core Modules & Features
Based on the system's architecture, AgencyOS is divided into several key functional modules:

1. **Executive Performance Dashboard:** Provides agency leadership with a high-level view of pipeline velocity, overall account health, and ROI metrics.
2. **Plan Builder & Strategy:** A dedicated workspace to outline campaigns, milestones, and strategic deliverables before moving them to execution.
3. **Agency Kanban Board:** A real-time delivery board for the internal team to track tasks, orchestrate execution, and manage workloads.
4. **Client Workspace:** A dedicated, transparent portal (e.g., "BrandX Workspace") where clients can track campaign progress, participate in approval loops, and communicate without relying on scattered email threads.
5. **Notification & Automation Center:** A workflow engine that automatically handles routine tasks such as reminders, issue escalations, and status broadcasts.
6. **Financials & Expense Tracking:** A ledger system for tracking campaign spend, agency margins, and operational clarity to ensure profitability.

## 3. Anticipated Tech Stack
Given the project tags (`Next.js`, `Dashboard UX`, `Workflow Automation`, `Client Collaboration`) and the required complexity for a real-time OS, the optimal tech stack for developing this platform would be:

### Frontend
- **Framework:** Next.js (App Router) for hybrid Server-Side Rendering (SSR) and Client-Side logic, ensuring fast load times and excellent SEO.
- **Styling:** Tailwind CSS combined with a modern UI component library like Shadcn UI or Aceternity UI to achieve a premium, high-end dashboard aesthetic.
- **State Management:** Zustand for local client state (e.g., dragging items on the Kanban board) and TanStack Query (React Query) for asynchronous state synchronization.
- **Drag & Drop:** `@hello-pangea/dnd` or `dnd-kit` for the interactive Kanban boards and Plan Builders.

### Backend & Database
- **API Layer:** Next.js Server Actions and Route Handlers for seamless frontend-backend communication.
- **Database:** PostgreSQL as the primary relational database, as the domain model (Agencies, Clients, Users, Projects, Tasks, Transactions) is highly relational.
- **ORM:** Prisma or Drizzle ORM for type-safe database queries.
- **Authentication:** NextAuth.js (Auth.js) or Clerk to manage complex Role-Based Access Control (RBAC), ensuring strict separation between "Agency Admin", "Agency Employee", and "Client" roles.

### Real-time & Automation Infrastructure
- **Real-time Sync:** Pusher, Supabase Realtime, or Socket.io to ensure that when a task is moved on the Kanban board, it instantly updates on the Client's screen.
- **Background Jobs & Automation:** A queuing system like Inngest, Trigger.dev, or BullMQ + Redis to handle the "Notification & Automation Center" (e.g., scheduling weekly status broadcasts or triggering escalations when a deadline is missed).

## 4. Key Engineering Challenges
If you were to build or scale this, the main technical hurdles would include:
- **Complex Multi-Tenant Architecture:** Ensuring absolute data isolation between different agencies, while also handling sub-tenancy (an agency inviting their respective clients).
- **Real-time State Synchronization:** Keeping the Kanban board, Plan Builder, and Client Workspace perfectly in sync across multiple active browser sessions without overwhelming the database.
- **Granular Permissions (RBAC):** Ensuring a client can only see approved tasks in their workspace, while agency staff can see internal notes, drafts, and financial margins on the same underlying project entity.
