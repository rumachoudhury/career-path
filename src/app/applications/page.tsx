import Link from "next/link";

import Sidebar from "@/components/sidebar";
import { prisma } from "@/lib/prisma";
import { connection } from "next/server";
import DeleteApplicationButton from "@/components/delete-application-button";

export const instant = false;

const statusStyles: Record<string, string> = {
  WISHLIST: "bg-slate-100 text-slate-700",
  APPLIED: "bg-blue-50 text-blue-700",
  INTERVIEW: "bg-amber-50 text-amber-700",
  OFFERED: "bg-emerald-50 text-emerald-700",
  REJECTED: "bg-red-50 text-red-700",
};

type ApplicationsPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function ApplicationsPage({
  searchParams,
}: ApplicationsPageProps) {
  await connection();

  const { q } = await searchParams;
  const query = q?.trim() || "";

  const applications = await prisma.jobApplication.findMany({
    where: query
      ? {
          OR: [
            { company: { contains: query, mode: "insensitive" } },
            { position: { contains: query, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <header className="border-b border-slate-200 bg-white">
          <div className="px-6 py-6 lg:px-8">
            <h1 className="text-xl font-semibold text-slate-900">
              My Applications
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage and track all your job applications.
            </p>
          </div>
        </header>

        <div className="p-6 lg:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                All Applications
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {applications.length} total applications
              </p>
            </div>

            <form action="/applications" method="GET" className="flex gap-2">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search company or position..."
                className="w-64 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                Search
              </button>
            </form>

            {/* <a
              href="/applications/new"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              + Add Application
            </a> */}

            <Link
              href="/applications/new"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              + Add Application
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            {applications.length === 0 ? (
              <div className="p-10 text-center">
                <h3 className="font-medium text-slate-900">
                  No applications yet
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Add your first job application to get started.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-medium">Company</th>
                      <th className="px-6 py-4 font-medium">Position</th>
                      <th className="px-6 py-4 font-medium">Location</th>
                      <th className="px-6 py-4 font-medium">Date Applied</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 text-left font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {applications.map((application) => (
                      <tr key={application.id}>
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {application.company}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {application.position}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {application.location || "—"}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {application.appliedAt.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              statusStyles[application.status] ||
                              "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {application.status.charAt(0) +
                              application.status.slice(1).toLowerCase()}
                          </span>
                        </td>

                        {/* <td className="px-6 py-4">
                          <Link
                            href={`/applications/${application.id}`}
                            className="font-medium text-blue-600 hover:text-blue-700"
                          >
                            Edit
                          </Link>
                        </td> */}

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <Link
                              href={`/applications/${application.id}`}
                              className="font-medium text-blue-600 hover:text-blue-700"
                            >
                              Edit
                            </Link>

                            <DeleteApplicationButton
                              applicationId={application.id}
                            />
                          </div>
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
