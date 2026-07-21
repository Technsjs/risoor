import type { Course, Enrollment } from "./types";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export type CourseTimeline = {
  startDate: Date;
  endDate: Date;
  totalMs: number;
  remainingMs: number;
  elapsedMs: number;
  progressPercent: number;
  isOverdue: boolean;
};

export function getCourseTimeline(
  enrollment: Enrollment,
  course: Course
): CourseTimeline {
  const startDate = new Date(enrollment.startedAt ?? enrollment.enrolledAt);
  const totalMs = course.estimatedMonths * 30 * MS_PER_DAY;
  const endDate = new Date(startDate.getTime() + totalMs);
  const now = Date.now();
  const elapsedMs = Math.max(0, now - startDate.getTime());
  const remainingMs = Math.max(0, endDate.getTime() - now);
  const progressPercent = Math.min(100, (elapsedMs / totalMs) * 100);

  return {
    startDate,
    endDate,
    totalMs,
    remainingMs,
    elapsedMs,
    progressPercent,
    isOverdue: now > endDate.getTime() && enrollment.status !== "completed",
  };
}

export function formatRemaining(ms: number) {
  if (ms <= 0) return "Course period ended";

  const days = Math.ceil(ms / MS_PER_DAY);
  if (days >= 60) {
    const months = Math.floor(days / 30);
    const restDays = days % 30;
    return restDays > 0 ? `${months} mo ${restDays}d left` : `${months} mo left`;
  }
  if (days >= 7) {
    const weeks = Math.floor(days / 7);
    const restDays = days % 7;
    return restDays > 0 ? `${weeks} wk ${restDays}d left` : `${weeks} wk left`;
  }
  return `${days} day${days !== 1 ? "s" : ""} left`;
}
