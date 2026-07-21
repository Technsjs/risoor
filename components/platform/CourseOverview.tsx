import { Video } from "lucide-react";
import { courseTrackById } from "@/lib/platform/course-tracks";
import type { Course } from "@/lib/platform/types";

export function CourseOverview({ course }: { course: Course }) {
  const track = courseTrackById(course.trackId);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--ade-accent)]/30 bg-[var(--ade-accent-dim)] px-3 py-1 text-xs text-[var(--ade-accent)]">
            <Video className="size-3.5" />
            Live cohort · Zoom sessions
          </span>
          {track && (
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
              {track.label}
            </span>
          )}
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
            {course.estimatedMonths} months
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[var(--ade-muted)]">
          {course.overview}
        </p>
      </div>

      {course.outcomes.length > 0 && (
        <section>
          <h2 className="text-lg font-medium text-white">
            What you&apos;ll be able to do
          </h2>
          <ul className="mt-3 space-y-2">
            {course.outcomes.map((item) => (
              <li
                key={item}
                className="flex gap-2 rounded-xl border border-white/10 bg-[#1a1a1a] px-4 py-3 text-sm text-white/80"
              >
                <span className="text-[var(--ade-accent)]">→</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {course.skills.length > 0 && (
        <section>
          <h2 className="text-lg font-medium text-white">What you&apos;ll learn</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {course.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-[#1a1a1a] px-3 py-1.5 text-xs text-white/70"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
