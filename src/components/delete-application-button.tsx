"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DeleteApplicationButtonProps = {
  applicationId: string;
};

export default function DeleteApplicationButton({
  applicationId,
}: DeleteApplicationButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?",
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete application.");
      }

      router.refresh();
    } catch (error) {
      alert("Could not delete application. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
