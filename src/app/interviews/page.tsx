import Link from "next/link";
import { connection } from "next/server";

import Sidebar from "@/components/sidebar";
import { prisma } from "@/lib/prisma";

export const instant = false;

export default async function InterviewsPage() {
  await connection();

  const interviews = await prisma.jobApplication.findMany({
    where: {
      status: "INTERVIEW",
    },
    orderBy: [{ interviewDate: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1 p-6 md:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Interviews</h1>
              <p className="mt-1 text-sm text-slate-500">
                Keep track of your upcoming and past interviews.
              </p>
            </div>

            <Link
              href="/applications"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              View Applications
            </Link>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Total Interviews</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {interviews.length}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-semibold text-slate-900">
                Interview Schedule
              </h2>
            </div>

            {interviews.length === 0 ? (
              <div className="p-10 text-center">
                <h3 className="font-semibold text-slate-900">
                  No interviews yet
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Applications with the Interview status will appear here.
                </p>
                <Link
                  href="/applications"
                  className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Go to My Applications
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-5 py-3 font-medium">Company</th>
                      <th className="px-5 py-3 font-medium">Position</th>
                      <th className="px-5 py-3 font-medium">Interview Date</th>
                      <th className="px-5 py-3 font-medium">Time</th>
                      <th className="px-5 py-3 font-medium">Location</th>
                      <th className="px-5 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {interviews.map((interview) => (
                      <tr key={interview.id} className="hover:bg-slate-50">
                        <td className="px-5 py-4 font-medium text-slate-900">
                          {interview.company}
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {interview.position}
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {interview.interviewDate
                            ? new Date(
                                interview.interviewDate,
                              ).toLocaleDateString()
                            : "Not scheduled"}
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {interview.interviewTime || "—"}
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {interview.location || "—"}
                        </td>
                        <td className="px-5 py-4">
                          <Link
                            href={`/applications/${interview.id}`}
                            className="font-medium text-blue-600 hover:text-blue-700"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
