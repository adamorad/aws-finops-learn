import { SRS_EASE_MAX, SRS_EASE_MIN } from "./constants";
import type { CardProgress } from "../types/progress";

export function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function isDue(card: CardProgress, today: string): boolean {
  return card.dueDate <= today;
}

export function rateCard(
  card: CardProgress,
  rating: "again" | "good" | "easy",
  today: string,
): CardProgress {
  const isFirst = card.repetitions === 0;

  let ease = card.ease;
  let interval: number;

  if (rating === "again") {
    ease = Math.max(SRS_EASE_MIN, ease - 0.2);
    interval = 1;
  } else if (rating === "good") {
    interval = isFirst ? 6 : Math.max(1, Math.round(card.interval * ease));
  } else {
    ease = Math.min(SRS_EASE_MAX, ease + 0.15);
    interval = isFirst
      ? 6
      : Math.max(1, Math.round(card.interval * ease * 1.3));
  }

  ease = Math.max(SRS_EASE_MIN, Math.min(SRS_EASE_MAX, ease));

  return {
    ease,
    interval,
    dueDate: addDays(today, interval),
    repetitions: rating === "again" ? card.repetitions : card.repetitions + 1,
  };
}
