import { BriefcaseBusiness, CheckCircle2, Clock3, XCircle } from "lucide-react";
import Sidebar from "@/components/sidebar";
import { prisma } from "@/lib/prisma";
import { connection } from "next/server";

export const instant = false;

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
  WISHLIST: "bg-slate-50 text-slate-700",
  APPLIED: "bg-blue-50 text-blue-700",
  INTERVIEW: "bg-amber-50 text-amber-700",
  OFFERED: "bg-emerald-50 text-emerald-700",
  REJECTED: "bg-red-50 text-red-700",
};

export default async function Home() {
  await connection();

  const applications = await prisma.jobApplication.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalApplications = applications.length;

  const interviews = applications.filter(
    (app) => app.status === "INTERVIEW",
  ).length;

  const offers = applications.filter((app) => app.status === "OFFERED").length;

  const rejected = applications.filter(
    (app) => app.status === "REJECTED",
  ).length;

  const monthlyActivity = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();

    date.setDate(1);
    date.setMonth(date.getMonth() - (5 - index));

    const month = date.getMonth();
    const year = date.getFullYear();

    const count = applications.filter((application) => {
      const appliedDate = new Date(application.appliedAt);

      return (
        appliedDate.getMonth() === month && appliedDate.getFullYear() === year
      );
    }).length;

    return {
      label: date.toLocaleString("en-US", { month: "short" }),
      count,
    };
  });

  const maxMonthlyCount = Math.max(
    ...monthlyActivity.map((item) => item.count),
    1,
  );

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
            {/* <StatCard
              title="Total Applications"
              value="24"
              description="All applications"
              icon={<BriefcaseBusiness size={20} />}
            /> */}
            <StatCard
              title="Total Applications"
              value={String(totalApplications)}
              description="All applications"
              icon={<BriefcaseBusiness size={20} />}
            />
            <StatCard
              title="Interviews"
              value={String(interviews)}
              description="Upcoming & completed"
              icon={<Clock3 size={20} />}
            />

            <StatCard
              title="Offers"
              value={String(offers)}
              description="Offers received"
              icon={<CheckCircle2 size={20} />}
            />

            <StatCard
              title="Rejected"
              value={String(rejected)}
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
                {/* {[35, 52, 42, 68, 55, 82].map((height, index) => (
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
                ))} */}

                {monthlyActivity.map((item) => {
                  const height = (item.count / maxMonthlyCount) * 100;

                  return (
                    <div
                      key={item.label}
                      className="flex flex-1 flex-col items-center justify-end gap-2"
                    >
                      <div
                        className="w-full max-w-12 rounded-t-md bg-blue-500 transition hover:bg-blue-600"
                        style={{ height: `${height}%` }}
                      />

                      <span className="text-xs text-slate-400">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900">
                Application Status
              </h3>

              {/* <div className="mt-6 space-y-5">
                <ProgressItem label="Applied" value={11} total={24} />
                <ProgressItem label="Interview" value={6} total={24} />
                <ProgressItem label="Offer" value={2} total={24} />
                <ProgressItem label="Rejected" value={5} total={24} />
              </div> */}

              <div className="mt-6 space-y-5">
                <ProgressItem
                  label="Applied"
                  value={
                    applications.filter((app) => app.status === "APPLIED")
                      .length
                  }
                  total={totalApplications}
                />

                <ProgressItem
                  label="Interview"
                  value={interviews}
                  total={totalApplications}
                />

                <ProgressItem
                  label="Offer"
                  value={offers}
                  total={totalApplications}
                />

                <ProgressItem
                  label="Rejected"
                  value={rejected}
                  total={totalApplications}
                />
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
                      {/* {application.company} · {application.date} */}
                      {application.company} ·{" "}
                      {new Date(application.appliedAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyles[application.status]
                    }`}
                  >
                    {/* {application.status} */}
                    {application.status.charAt(0) +
                      application.status.slice(1).toLowerCase()}
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
