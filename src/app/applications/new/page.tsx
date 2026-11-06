import Sidebar from "@/components/sidebar";
import ApplicationForm from "@/components/application-form";

export default function NewApplicationPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <header className="border-b border-slate-200 bg-white">
          <div className="px-6 py-6 lg:px-8">
            <h1 className="text-xl font-semibold text-slate-900">
              Add Application
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Track a new job opportunity.
            </p>
          </div>
        </header>

        <div className="p-6 lg:p-8">
          <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6">
            <ApplicationForm />
          </div>
        </div>
      </main>
    </div>
  );
}
