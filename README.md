# 🚀 Social Network App – Tech Stack Overview

## 🧰 Core Technologies

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + Shadcn
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Clerk
- **File Uploads**: UploadThing

---

## 🧩 App Structure

### 1. Frontend

- Built with **Next.js Client Components**
- Styled using **TailwindCSS** and **Shadcn UI**
- Includes pages like:
  - Feed
  - Profile
  - Post Details
- Special files used:
  - `loading.tsx`
  - `error.tsx`
  - `not-found.tsx`

### 2. API & Backend Logic

- **Route Handlers** in `app/api/*` for API endpoints
- **Server Actions** used in forms to perform DB mutations
- Implements **optimistic updates** for better UX
- Handles integration with third-party services

### 3. Authentication & Authorization

- Handled using **Clerk**
- Middleware used to protect private routes
- Supports session management and role-based access

### 4. Database Layer

- **Prisma ORM** maps models to PostgreSQL
- Models include:
  - Users
  - Posts
  - Comments
  - Likes
  - Follows
- Fully relational schema

---

## ✅ Key Features

- **Server Components**: For improved performance and SEO
- **Dynamic & Static Routes**: Pages for users, posts, etc.
- **Data Fetching**: Uses caching and revalidation
- **Optimistic UI**: Instant feedback for user actions
- **File Uploads**: Integrated using UploadThing

---

## 🛠 Recommended Folder Structure (Simplified)
