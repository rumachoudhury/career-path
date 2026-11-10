import Link from "next/link";

import Sidebar from "@/components/sidebar";
import { prisma } from "@/lib/prisma";
import { connection } from "next/server";

export const instant = false;

export default async function CompaniesPage() {
  await connection();

  const companies = await prisma.jobApplication.groupBy({
    by: ["company"],
    _count: {
      _all: true,
    },
    orderBy: {
      company: "asc",
    },
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <header className="border-b border-slate-200 bg-white">
          <div className="px-6 py-6 lg:px-8">
            <h1 className="text-xl font-semibold text-slate-900">Companies</h1>
            <p className="mt-1 text-sm text-slate-500">
              View companies you have applied to.
            </p>
          </div>
        </header>

        <div className="p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              All Companies
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {companies.length} companies tracked
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            {companies.length === 0 ? (
              <div className="p-10 text-center">
                <h3 className="font-medium text-slate-900">No companies yet</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Add a job application to see companies here.
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Company Name</th>
                    <th className="px-6 py-4 font-medium">
                      Total Applications
                    </th>
                    <th className="px-6 py-4 font-medium">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {companies.map((company) => (
                    <tr key={company.company}>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {company.company}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {company._count._all}
                      </td>

                      <td className="px-6 py-4">
                        <Link
                          href={`/applications?q=${encodeURIComponent(company.company)}`}
                          className="font-medium text-blue-600 hover:text-blue-700"
                        >
                          View Applications
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
