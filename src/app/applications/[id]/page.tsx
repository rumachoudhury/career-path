// import Link from "next/link";
// import { notFound } from "next/navigation";
// import Sidebar from "@/components/sidebar";
// import { prisma } from "@/lib/prisma";
// import { connection } from "next/server";

// export const instant = false;

// type PageProps = {
//   params: Promise<{ id: string }>;
// };

// export default async function EditApplicationPage({ params }: PageProps) {
//   await connection();

//   const { id } = await params;

//   const application = await prisma.jobApplication.findUnique({
//     where: { id },
//   });

//   if (!application) {
//     notFound();
//   }

//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       <Sidebar />

//       <main className="min-w-0 flex-1">
//         <header className="border-b border-slate-200 bg-white">
//           <div className="px-6 py-6 lg:px-8">
//             <h1 className="text-xl font-semibold text-slate-900">
//               Edit Application
//             </h1>
//             <p className="mt-1 text-sm text-slate-500">
//               Update your job application details.
//             </p>
//           </div>
//         </header>

//         <div className="p-6 lg:p-8">
//           <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6">
//             <form
//               action={`/api/applications/${application.id}`}
//               method="POST"
//               className="space-y-5"
//             >
//               <div className="grid gap-5 sm:grid-cols-2">
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-slate-700">
//                     Company Name *
//                   </label>
//                   <input
//                     name="company"
//                     defaultValue={application.company}
//                     required
//                     className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-slate-700">
//                     Job Position *
//                   </label>
//                   <input
//                     name="position"
//                     defaultValue={application.position}
//                     required
//                     className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-slate-700">
//                     Location
//                   </label>
//                   <input
//                     name="location"
//                     defaultValue={application.location ?? ""}
//                     className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-slate-700">
//                     Job URL
//                   </label>
//                   <input
//                     name="jobUrl"
//                     type="url"
//                     defaultValue={application.jobUrl ?? ""}
//                     className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-slate-700">
//                     Salary
//                   </label>
//                   <input
//                     name="salary"
//                     defaultValue={application.salary ?? ""}
//                     className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-slate-700">
//                     Application Status
//                   </label>
//                   <select
//                     name="status"
//                     defaultValue={application.status}
//                     className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500"
//                   >
//                     <option value="WISHLIST">Wishlist</option>
//                     <option value="APPLIED">Applied</option>
//                     <option value="INTERVIEW">Interview</option>
//                     <option value="OFFERED">Offered</option>
//                     <option value="REJECTED">Rejected</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-slate-700">
//                   Notes
//                 </label>
//                 <textarea
//                   name="notes"
//                   defaultValue={application.notes ?? ""}
//                   rows={4}
//                   className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
//                 />
//               </div>

//               <div className="flex items-center gap-3">
//                 <button
//                   type="submit"
//                   className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
//                 >
//                   Save Changes
//                 </button>

//                 <Link
//                   href="/applications"
//                   className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
//                 >
//                   Cancel
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import Link from "next/link";
import { notFound } from "next/navigation";
import Sidebar from "@/components/sidebar";
import EditApplicationForm from "@/components/edit-application-form";
import { prisma } from "@/lib/prisma";
import { connection } from "next/server";

export const instant = false;

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditApplicationPage({ params }: PageProps) {
  await connection();

  const { id } = await params;

  //   const application = await prisma.jobApplication.findUnique({
  //     where: { id },
  //   });

  const application = await prisma.jobApplication.findUnique({
    where: { id },
    select: {
      id: true,
      company: true,
      position: true,
      location: true,
      jobUrl: true,
      salary: true,
      status: true,
      interviewDate: true,
      interviewTime: true,
      notes: true,
    },
  });

  if (!application) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <header className="border-b border-slate-200 bg-white">
          <div className="px-6 py-6 lg:px-8">
            <h1 className="text-xl font-semibold text-slate-900">
              Edit Application
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Update your job application details.
            </p>
          </div>
        </header>

        <div className="p-6 lg:p-8">
          <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6">
            <EditApplicationForm application={application} />
            <div className="mt-4">
              <Link
                href="/applications"
                className="text-sm text-slate-500 hover:text-blue-600"
              >
                Back to My Applications
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
