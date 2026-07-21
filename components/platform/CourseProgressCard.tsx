import type { CourseTimeline } from "@/lib/platform/course-progress";
import { formatRemaining } from "@/lib/platform/course-progress";

export function CourseProgressCard({
  timeline,
  timeSpentLabel,
  compact,
}: {
  timeline: CourseTimeline;
  timeSpentLabel?: string;
  compact?: boolean;
}) {
  const remainingLabel = formatRemaining(timeline.remainingMs);

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-[#1a1a1a] ${compact ? "p-4" : "p-5"}`}
    >
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
            Time to finish
          </p>
          <p
            className={`font-medium text-white ${compact ? "text-lg" : "text-xl"} ${timeline.isOverdue ? "text-amber-400" : ""}`}
          >
            {remainingLabel}
          </p>
        </div>
        {timeSpentLabel && (
          <p className="text-xs text-white/45">{timeSpentLabel} in platform</p>
        )}
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-[10px] text-white/40">
          <span>Progress</span>
          <span>{Math.round(timeline.progressPercent)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[var(--ade-accent)] transition-all"
            style={{ width: `${timeline.progressPercent}%` }}
          />
        </div>
        <p className="mt-2 text-[10px] text-white/35">
          Ends {timeline.endDate.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
