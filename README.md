# CareerPath

A full-stack job application tracker built to help organize a job search
in one place. Track applications, manage company information, record
interview dates and times, and review job-search progress through a
dashboard and analytics.

## Features

- **Dashboard** --- overview of application activity, status counts,
  charts, and recent applications.
- **My Applications** --- add, view, edit, and delete job
  applications.
- **Search and filters** --- find applications by company or job title
  and filter by application status.
- **Companies** --- view tracked companies and the number of
  applications for each.
- **Interviews** --- keep interview dates, times, locations, and
  related application details together.
- **Analytics** --- review application totals, status breakdowns, and
  job-search progress.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Neon](https://neon.tech/) serverless PostgreSQL
- [Lucide React](https://lucide.dev/) icons

## Screenshots

Add screenshots of your running application to the `public/screenshots/`
folder, then replace the image paths below with the matching filenames.

---

Dashboard My Applications

---

`![Dashboard](public/screenshots/dashboard.png)` `![My Applications](public/screenshots/applications.png)`

---

---

Interviews Analytics

---

`![Interviews](public/screenshots/interviews.png)` `![Analytics](public/screenshots/analytics.png)`

---

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

### 3. Configure environment variables

Create a `.env` file in the project root. Add your own Neon database
connection strings:

```env
DATABASE_URL="your_neon_pooled_connection_string"
DIRECT_URL="your_neon_direct_connection_string"
```

Do not commit `.env` or share database credentials. Keep `.env` listed
in `.gitignore`.

### 4. Generate the Prisma Client

```bash
npx prisma generate
```

### 5. Apply database migrations

For a local development database that already has the project's
migrations:

```bash
npx prisma migrate dev
```

### 6. Start the development server

```bash
npm run dev
```

Open <http://localhost:3000> in your browser.

## Database

CareerPath uses PostgreSQL hosted on Neon and Prisma for database
access. The Prisma schema is located at `prisma/schema.prisma`, and
database migration history is stored in `prisma/migrations/`.

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
├── .env
├── package.json
└── README.md
```

## Future Improvements

- Add more detailed reporting and date-range analytics.
- Improve the mobile navigation and small-screen experience.
- Add deployment instructions and a live demo link when production
  deployment is configured.

## Author

**Ruma Choudhury**

- GitHub: [@rumachoudhury](https://github.com/rumachoudhury)
- Portfolio:
  [ruma-portfolio-site.vercel.app](https://ruma-portfolio-site.vercel.app)

---

Built as a practical project to organize and manage a job search.
