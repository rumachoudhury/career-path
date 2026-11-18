# CareerPath

A full-stack job application tracker built to help organize a job search in one place. Track applications, manage company information, record interview dates and times, and review job-search progress through a dashboard and analytics.

## Features

- **Dashboard** — overview of application activity, status counts, charts, and recent applications.
- **My Applications** — add, view, edit, and delete job applications.
- **Search and Filters** — find applications by company or job title and filter by application status.
- **Companies** — view tracked companies and the number of applications for each.
- **Interviews** — keep interview dates, times, locations, and related application details together.
- **Follow-up Reminders** — schedule, reschedule, or complete follow-ups and see overdue, today, and upcoming reminders on the dashboard.
- **Analytics** — review application totals, status breakdowns, and job-search progress.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Neon](https://neon.tech/) — serverless PostgreSQL database hosting
- [Lucide React](https://lucide.dev/) — icons

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rumachoudhury/career-path.git
cd career-path
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the Neon database

CareerPath uses a PostgreSQL database hosted on Neon.

1. Create a project in [Neon](https://neon.tech/).
2. Open your Neon project and get the database connection strings.
3. Create a `.env` file in the root of the project.
4. Add your connection strings:

```env
DATABASE_URL="your-neon-pooled-connection-string"
DIRECT_URL="your-neon-direct-connection-string"
```

Replace the example values with your actual Neon connection strings.

**Important:** Never commit your `.env` file or expose your database credentials on GitHub.

### 4. Generate the Prisma Client

```bash
npx prisma generate
```

### 5. Apply database migrations

For local development:

```bash
npx prisma migrate dev
```

For production deployment:

```bash
npx prisma migrate deploy
```

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database

CareerPath uses **Neon serverless PostgreSQL** for database hosting and **Prisma ORM** for database access.

- Database provider: Neon
- Database type: PostgreSQL
- ORM: Prisma
- Prisma schema: `prisma/schema.prisma`
- Migration history: `prisma/migrations/`

## Project Structure

```text
career-path/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── analytics/
│   │   ├── api/
│   │   ├── applications/
│   │   ├── companies/
│   │   ├── interviews/
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   └── generated/
├── package.json
└── README.md
```

## Live Demo

[CareerPath](https://career-path-one-gilt.vercel.app/)

## Author

**Ruma Choudhury**

- GitHub: [@rumachoudhury](https://github.com/rumachoudhury)
- Portfolio: [ruma-portfolio-site.vercel.app](https://ruma-portfolio-site.vercel.app/)

---

Built as a practical project to organize and manage a job search.
