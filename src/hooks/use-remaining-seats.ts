"use client";

import { useCallback, useState, useTransition } from "react";

interface UseRemainingSeatsOptions {
  eventSlug: string;
  totalSeats: number;
  initialCount: number;
}

export function useRemainingSeats({
  eventSlug,
  totalSeats,
  initialCount,
}: UseRemainingSeatsOptions) {
  const [currentCount, setCurrentCount] = useState(initialCount);
  const [isRefreshing, startTransition] = useTransition();

  const setCount = useCallback((nextCount: number) => {
    setCurrentCount(nextCount);
  }, []);

  const refresh = useCallback(() => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/remaining-seats?eventSlug=${eventSlug}`);
        if (!response.ok) {
          throw new Error("Impossible de mettre à jour les places restantes.");
        }
        const data = (await response.json()) as { count: number };
        setCurrentCount(data.count);
      } catch (error) {
        console.error(error);
      }
    });
  }, [eventSlug]);

  const remainingSeats = Math.max(0, totalSeats - currentCount);

  return {
    remainingSeats,
    currentCount,
    totalSeats,
    setCount,
    refresh,
    isRefreshing,
  };
}
