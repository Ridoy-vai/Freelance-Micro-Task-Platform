# TaskNest

A freelance micro-task marketplace platform connecting **Clients**, **Freelancers**, and **Admins** in one role-based system. Clients post tasks, freelancers submit proposals, and the platform handles the full lifecycle — proposal, acceptance, payment, and review.

> ⚠️ **Note:** This README was drafted from project memory and conversation history, not a direct codebase audit. Sections marked with 🔍 should be verified against the actual repo before publishing.

---

## ✨ Features

### Authentication & Roles
- Role-based registration (Client / Freelancer) using **Better Auth**, with conditional form fields per role
- `additionalFields` configured with `input: true` (required — otherwise fields silently drop on signup)
- JWT-based auth via Better Auth's `jwt` plugin, verified server-side with **JWKS** (`jose` / `jose-cjs`)
- Server-side sign-out with proper Better Auth cookie handling
- Role-based route protection middleware (`requireRole`, `proxy.js`)

### Dashboards (Client / Freelancer / Admin)
- Next.js **App Router** layout-based routing, separate folders per role
- Server components fetch session via:
  ```js
  const session = await auth.api.getSession({ headers: await headers() });
  ```
- Pagination driven by `searchParams` on async server components
- Admin overview dashboard with **Recharts** (Line, Bar, Pie, Area charts), dual Y-axis support, custom color palettes
- **HeroUI** components for modals, pagination, and alerts

### Tasks & Proposals
- Task posting by clients with title, category, description, budget, deadline
- Freelancer proposal submission with proposed budget, estimated days, and message
- **Duplicate proposal blocking** — a freelancer can't submit more than one proposal per task
- **Already-applied check** — task detail page shows proposal form only if the freelancer hasn't already applied
- Auto-rejection of other pending proposals when a task's status updates (e.g., one proposal accepted → rest auto-rejected)
- Client verification badge — shown as "Verified" only if both `companyName` and `companyWebsite` are present 🔍

### Payments
- **Stripe** payment integration
- Post-payment automation: accepting the proposal, booking the task, and recording the payment record

### Reviews
- Freelancer rating/review system tied to completed tasks

### UI / Marketing Pages
- Dynamic **HeroBanner** — pulls real task data via `GetAllTasks`, skeleton loading states, `isMounted` guard to avoid hydration mismatch, role-based CTA buttons, scroll animation respecting `prefers-reduced-motion`
- Contact, Terms of Service, Privacy Policy pages, and site Footer

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router), Tailwind CSS |
| UI Components | HeroUI |
| Charts | Recharts |
| Forms | react-hook-form |
| Backend | Express.js |
| Database | MongoDB |
| Auth | Better Auth (JWT + JWKS via `jose`) |
| Payments | Stripe |
| Hosting | Vercel (frontend + serverless backend) |
| Language | Plain JavaScript (no TypeScript) |

---

## 🗄️ Database

**Database name:** `Freelance-Microtask-Platform`

**Collections:**
| Collection | Purpose |
|---|---|
| `Tasks` | Posted tasks/projects |
| `proposals` | Freelancer proposals against tasks |
| `Freelancers` | Freelancer profile data |
| `Clients` | Client profile data |
| `Reviews` | Ratings/reviews after task completion |
| `user` | Better Auth user records |
| `Payments` | Stripe payment records |

**Key design notes:**
- `proposals._id` and reference IDs (`taskId`, `FreelancerId`) are stored as **plain strings**, not `ObjectId` — queries against `proposals` should match on string, not `new ObjectId(...)` 🔍
- `getDB()` uses a singleton connection-caching pattern to stay compatible with Vercel's serverless cold starts

---

## 🔌 API Conventions

- All frontend API calls use `NEXT_PUBLIC_API_URL` as the base
- Paginated endpoints return a consistent shape:
  ```json
  { "data": [], "totalItems": 0, "totalPages": 0 }
  ```
- Example: `GET /tasksid/:id?freelancerId=...` returns the task plus an `alreadyApplied` boolean computed server-side by checking the `proposals` collection

---

## 🎨 Design System

A custom Tailwind token system used consistently across all UI:

| Token | Role |
|---|---|
| `ink` | Primary text/dark tone |
| `paper` | Background/light tone |
| `signal` | Accent/highlight color |
| `sage` | Secondary accent |

---

## 🐛 Notable Bugs Fixed

| Bug | Fix |
|---|---|
| `useState(initialProp)` not syncing after client-side navigation | Added `useEffect(() => setState(prop), [prop])` |
| `server.js` exported the `verifyToken` middleware instead of `app` | Broke Vercel deployment — corrected the export |
| Vercel cold starts causing slow initial data loads | Diagnosed as MongoDB connection pooling overhead; mitigated via `getDB()` singleton pattern |
| JWT auth flow failures | Traced to missing `Authorization` headers, ES module/CommonJS mixing, and duplicate `auth-client.js` instances; resolved by separating client-side `authClient.token()` from server-side session/JWT retrieval |

---

## 📁 Project Structure (high-level) 🔍

```
/app
  /(client)        → Client dashboard routes
  /(freelancer)     → Freelancer dashboard routes
  /(admin)          → Admin dashboard routes
  /task/[id]        → Task details + proposal page
/Components
  ProposalForm.js
  HeroBanner.js
  Footer.js
/ServerActions
  Task.js           → GetTasksById, GetAllTasks, etc.
/lib
  auth.js           → Better Auth config
```

> This structure is reconstructed from conversation context — confirm folder names against the actual repo.

---

## 🚀 Status

Actively in development. Current focus: task/proposal status logic, security middleware hardening, dashboard data visualization, and static pages (Contact/Terms/Privacy).

---

## 👤 Author

**Md. Shahriar Ridoy** — Full-stack developer (Bangladesh)
Built with Next.js, Express.js, MongoDB, and Better Auth.