// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert h-5 w-[100px]"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the{" "}
//             <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
//               page.tsx
//             </code>{" "}
//             file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert h-[14px] w-4"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={14}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

import { BriefcaseBusiness, CheckCircle2, Clock3, XCircle } from "lucide-react";
import Sidebar from "@/components/sidebar";

const applications = [
  {
    company: "Google",
    position: "Frontend Developer",
    date: "Oct 29, 2026",
    status: "Interview",
  },
  {
    company: "Microsoft",
    position: "Software Engineer",
    date: "Oct 27, 2026",
    status: "Applied",
  },
  {
    company: "Amazon",
    position: "Full Stack Developer",
    date: "Oct 24, 2026",
    status: "Rejected",
  },
  {
    company: "Stripe",
    position: "React Developer",
    date: "Oct 22, 2026",
    status: "Offer",
  },
];

const statusStyles: Record<string, string> = {
  Applied: "bg-blue-50 text-blue-700",
  Interview: "bg-amber-50 text-amber-700",
  Rejected: "bg-red-50 text-red-700",
  Offer: "bg-emerald-50 text-emerald-700",
};

export default function Home() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <header className="border-b border-slate-200 bg-white">
          <div className="flex h-20 items-center justify-between px-6 lg:px-8">
            <div>
              <p className="text-sm text-slate-500">
                Saturday, October 31, 2026
              </p>
              <h2 className="text-xl font-semibold text-slate-900">
                Welcome back!
              </h2>
            </div>

            <button className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
              + Add Application
            </button>
          </div>
        </header>

        <div className="p-6 lg:p-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900">
              Application Overview
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Keep track of your job search progress.
            </p>
          </div>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Applications"
              value="24"
              description="All applications"
              icon={<BriefcaseBusiness size={20} />}
            />

            <StatCard
              title="Interviews"
              value="6"
              description="Upcoming & completed"
              icon={<Clock3 size={20} />}
            />

            <StatCard
              title="Offers"
              value="2"
              description="Offers received"
              icon={<CheckCircle2 size={20} />}
            />

            <StatCard
              title="Rejected"
              value="5"
              description="Applications rejected"
              icon={<XCircle size={20} />}
            />
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900">
                  Application Activity
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Your applications over the last 6 months.
                </p>
              </div>

              <div className="flex h-64 items-end gap-4 border-b border-slate-100 px-2">
                {[35, 52, 42, 68, 55, 82].map((height, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div
                      className="w-full max-w-12 rounded-t-md bg-blue-500 transition hover:bg-blue-600"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-slate-400">
                      {["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900">
                Application Status
              </h3>

              <div className="mt-6 space-y-5">
                <ProgressItem label="Applied" value={11} total={24} />
                <ProgressItem label="Interview" value={6} total={24} />
                <ProgressItem label="Offer" value={2} total={24} />
                <ProgressItem label="Rejected" value={5} total={24} />
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Recent Applications
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Your latest job applications.
                </p>
              </div>

              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View all
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {applications.map((application) => (
                <div
                  key={`${application.company}-${application.position}`}
                  className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h4 className="font-medium text-slate-900">
                      {application.position}
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                      {application.company} · {application.date}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyles[application.status]
                    }`}
                  >
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className="rounded-lg bg-blue-50 p-2 text-blue-600">{icon}</div>
      </div>

      <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
}

function ProgressItem({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const percentage = Math.round((value / total) * 100);

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium text-slate-900">{value}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
