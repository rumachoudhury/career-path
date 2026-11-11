"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

type EditApplicationFormProps = {
  application: {
    id: string;
    company: string;
    position: string;
    location: string | null;
    jobUrl: string | null;
    salary: string | null;
    // status: string;
    // notes: string | null;
    status: string;
    interviewDate: Date | null;
    interviewTime: string | null;
    notes: string | null;
  };
};

export default function EditApplicationForm({
  application,
}: EditApplicationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    const data = {
      company: formData.get("company"),
      position: formData.get("position"),
      location: formData.get("location"),
      jobUrl: formData.get("jobUrl"),
      salary: formData.get("salary"),
      status: formData.get("status"),
      notes: formData.get("notes"),
    };

    try {
      const response = await fetch(`/api/applications/${application.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update application.");
      }

      router.push("/applications");
      router.refresh();
    } catch {
      setError("Could not update application. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Company Name *
          </label>
          <input
            name="company"
            defaultValue={application.company}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Job Position *
          </label>
          <input
            name="position"
            defaultValue={application.position}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Location
          </label>
          <input
            name="location"
            defaultValue={application.location ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Job URL
          </label>
          <input
            name="jobUrl"
            type="url"
            defaultValue={application.jobUrl ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Salary
          </label>
          <input
            name="salary"
            defaultValue={application.salary ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Application Status
          </label>
          <select
            name="status"
            defaultValue={application.status}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500"
          >
            <option value="WISHLIST">Wishlist</option>
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFERED">Offered</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Notes
        </label>
        <textarea
          name="notes"
          defaultValue={application.notes ?? ""}
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/applications")}
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
