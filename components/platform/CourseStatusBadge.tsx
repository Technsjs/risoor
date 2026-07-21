import type { CourseStatus } from "@/lib/platform/types";

const styles: Record<CourseStatus, string> = {
  draft: "border-white/20 text-white/50",
  pending_approval: "border-amber-500/40 text-amber-400 bg-amber-500/10",
  approved: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
  rejected: "border-red-500/40 text-red-400 bg-red-500/10",
};

const labels: Record<CourseStatus, string> = {
  draft: "Draft",
  pending_approval: "Pending approval",
  approved: "Approved",
  rejected: "Rejected",
};

export function CourseStatusBadge({ status }: { status: CourseStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
