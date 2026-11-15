"use client";

import { useSyncExternalStore } from "react";

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
};

function subscribe(onStoreChange: () => void) {
  const intervalId = window.setInterval(onStoreChange, 60_000);

  return () => window.clearInterval(intervalId);
}

function getLocalDate() {
  return new Date().toLocaleDateString("en-US", dateOptions);
}

export default function LocalDate({ initialDate }: { initialDate: string }) {
  const date = useSyncExternalStore(subscribe, getLocalDate, () => initialDate);

  return <time>{date}</time>;
}
