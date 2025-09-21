# Student Course Portal

## Features

- Student and Admin roles
- Course CRUD (admin)
- Enroll/Unenroll (student)
- Zod validation
- JWT auth (optional)

## Tech

- Next.js (App Router)
- Tailwind CSS
- MySQL (optional)
- Zod

## Setup (local)

1. `git clone <repo>`
2. `npm install`
3. Create `.env.local` with:DATABASE_URL=...
JWT_SECRET=your-secret
4. `npm run dev`

## API Endpoints

- `GET /api/courses`
- `POST /api/courses`
- `PUT /api/courses/:id`
- `DELETE /api/courses/:id`
- `POST /api/enroll`
- `GET /api/enrollments?studentId=...`
- `DELETE /api/enroll`

## Live Demo

`https://your-app.vercel.app`

## Notes

Add screenshots and a short walkthrough video if possible.
