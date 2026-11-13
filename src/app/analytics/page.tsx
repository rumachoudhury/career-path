import Link from "next/link";
import { connection } from "next/server";

import Sidebar from "@/components/sidebar";
import { prisma } from "@/lib/prisma";

export const instant = false;

const statusLabels = [
  { value: "WISHLIST", label: "Wishlist", color: "bg-slate-400" },
  { value: "APPLIED", label: "Applied", color: "bg-blue-500" },
  { value: "INTERVIEW", label: "Interview", color: "bg-amber-500" },
  { value: "OFFERED", label: "Offered", color: "bg-green-500" },
  { value: "REJECTED", label: "Rejected", color: "bg-red-500" },
] as const;

export default async function AnalyticsPage() {
  await connection();

  const applications = await prisma.jobApplication.findMany({
    select: {
      id: true,
      status: true,
      createdAt: true,
    },
  });

  const total = applications.length;

  const counts = statusLabels.map((status) => ({
    ...status,
    count: applications.filter(
      (application) => application.status === status.value,
    ).length,
  }));

  const interviewCount =
    counts.find((item) => item.value === "INTERVIEW")?.count ?? 0;

  const offeredCount =
    counts.find((item) => item.value === "OFFERED")?.count ?? 0;

  const appliedCount =
    counts.find((item) => item.value === "APPLIED")?.count ?? 0;

  const progress =
    total > 0 ? Math.round(((interviewCount + offeredCount) / total) * 100) : 0;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1 p-6 md:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
              <p className="mt-1 text-sm text-slate-500">
                Track your job search progress and application activity.
              </p>
            </div>

            <Link
              href="/applications"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              View Applications
            </Link>
          </div>

          {/* Summary Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Total Applications</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{total}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Applied</p>
              <p className="mt-2 text-3xl font-bold text-blue-600">
                {appliedCount}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Interviews</p>
              <p className="mt-2 text-3xl font-bold text-amber-600">
                {interviewCount}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Offers</p>
              <p className="mt-2 text-3xl font-bold text-green-600">
                {offeredCount}
              </p>
            </div>
          </div>

          {/* Application Status */}
          <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-6 font-semibold text-slate-900">
              Application Status Breakdown
            </h2>

            <div className="space-y-5">
              {counts.map((item) => {
                const percentage =
                  total > 0 ? Math.round((item.count / total) * 100) : 0;

                return (
                  <div key={item.value}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">
                        {item.label}
                      </span>
                      <span className="text-slate-500">
                        {item.count} ({percentage}%)
                      </span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="font-semibold text-slate-900">
              Job Search Progress
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Percentage of applications that have reached the interview or
              offer stage.
            </p>

            <div className="mt-5 flex items-center gap-4">
              <p className="text-4xl font-bold text-blue-600">{progress}%</p>
              <div className="flex-1">
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {total === 0 && (
            <p className="mt-6 text-center text-sm text-slate-500">
              Add your first application to start tracking your progress.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
