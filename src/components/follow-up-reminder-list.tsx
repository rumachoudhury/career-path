"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FollowUpReminder = {
  id: string;
  company: string;
  position: string;
  followUpDate: string;
};

type ReminderStatus = "Overdue" | "Today" | "Upcoming";

const statusStyles: Record<ReminderStatus, string> = {
  Overdue: "bg-red-50 text-red-700",
  Today: "bg-amber-50 text-amber-700",
  Upcoming: "bg-emerald-50 text-emerald-700",
};

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getReminderStatus(followUpDate: string): ReminderStatus {
  const today = dateKey(new Date());

  if (followUpDate < today) return "Overdue";
  if (followUpDate === today) return "Today";
  return "Upcoming";
}

function formatReminderDate(followUpDate: string) {
  const [year, month, day] = followUpDate.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function FollowUpReminderList({
  reminders,
}: {
  reminders: FollowUpReminder[];
}) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function markDone(id: string) {
    setPendingId(id);
    setError("");

    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followUpCompletedAt: new Date().toISOString() }),
      });

      if (!response.ok) {
        throw new Error("Could not complete follow-up.");
      }

      router.refresh();
    } catch {
      setError("Could not complete follow-up. Please try again.");
    } finally {
      setPendingId(null);
    }
  }

  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-5">
        <h3 className="font-semibold text-slate-900">Follow-up reminders</h3>
        <p className="mt-1 text-sm text-slate-500">
          Applications with a scheduled follow-up date.
        </p>
      </div>

      {reminders.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {reminders.map((reminder) => {
            const status = getReminderStatus(reminder.followUpDate);

            return (
              <div
                key={reminder.id}
                className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h4 className="font-medium text-slate-900">
                    {reminder.company}
                  </h4>
                  <p className="mt-1 text-sm text-slate-500">
                    {reminder.position}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <time
                    dateTime={reminder.followUpDate}
                    className="text-sm text-slate-600"
                  >
                    {formatReminderDate(reminder.followUpDate)}
                  </time>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
                  >
                    {status}
                  </span>
                  <Link
                    href={`/applications/${reminder.id}`}
                    className="px-2 py-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Reschedule
                  </Link>
                  <button
                    type="button"
                    onClick={() => void markDone(reminder.id)}
                    disabled={pendingId === reminder.id}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-2.5 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                  >
                    <Check size={15} aria-hidden="true" />
                    {pendingId === reminder.id ? "Saving..." : "Mark done"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="px-6 py-8 text-center">
          <p className="text-sm text-slate-500">No open follow-ups.</p>
          <Link
            href="/applications"
            className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Add a follow-up date
          </Link>
        </div>
      )}

      {error && (
        <p role="alert" className="border-t border-slate-100 px-6 py-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </section>
  );
}