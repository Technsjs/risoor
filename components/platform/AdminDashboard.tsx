"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";
import { courseTrackById } from "@/lib/platform/course-tracks";
import { useAuth } from "@/lib/platform/auth/mock-auth";
import { usePlatformStore } from "@/lib/platform/hooks";
import { CourseStatusBadge } from "./CourseStatusBadge";
import { CourseOverview } from "./CourseOverview";

export function AdminDashboard() {
  const { user } = useAuth();
  const { repo, version, refresh } = usePlatformStore();
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectNote, setRejectNote] = useState("");

  const pending = repo.getPendingCourses();
  const approved = repo.getApprovedCourses();

  function approve(courseId: string) {
    if (!user) return;
    repo.approveCourse(courseId, user.id);
    refresh();
  }

  function reject(courseId: string) {
    if (!user || !rejectNote.trim()) return;
    repo.rejectCourse(courseId, user.id, rejectNote.trim());
    setRejectingId(null);
    setRejectNote("");
    refresh();
  }

  return (
    <div>
      <h1 className="text-2xl font-medium text-white">Admin</h1>
      <p className="mt-2 text-sm text-[var(--ade-muted)]">
        Approve instructor-submitted live courses before students can enroll.
        Offered courses will be fetched from Firebase later — for now they live
        in the mock store.
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-white">
          Pending approval ({pending.length})
        </h2>
        <div className="mt-4 space-y-4" key={version}>
          {pending.length === 0 ? (
            <p className="text-sm text-white/40">No courses awaiting review.</p>
          ) : (
            pending.map((course) => {
              const instructor = repo.getUserById(course.instructorId);
              const track = courseTrackById(course.trackId);
              return (
                <div
                  key={course.id}
                  className="rounded-2xl border border-amber-500/20 bg-[#1a1a1a] p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-white">{course.title}</h3>
                      <p className="mt-1 text-xs text-white/50">
                        By {instructor?.name ?? "Unknown"} · {track?.label} ·{" "}
                        {course.estimatedMonths} mo
                      </p>
                    </div>
                    <CourseStatusBadge status={course.status} />
                  </div>
                  <p className="mt-3 text-sm text-white/60 line-clamp-3">
                    {course.overview}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {course.skills.slice(0, 6).map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/50"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  {rejectingId === course.id ? (
                    <div className="mt-4 space-y-2">
                      <textarea
                        value={rejectNote}
                        onChange={(e) => setRejectNote(e.target.value)}
                        placeholder="Reason for rejection (shown to instructor)…"
                        className="min-h-[72px] w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-3 py-2 text-sm text-white outline-none focus:border-[var(--ade-accent)]"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => reject(course.id)}
                          className="rounded-full bg-red-500/20 px-4 py-1.5 text-xs text-red-400"
                        >
                          Confirm reject
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setRejectingId(null);
                            setRejectNote("");
                          }}
                          className="text-xs text-white/50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => approve(course.id)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-medium text-emerald-400"
                      >
                        <Check className="size-3.5" />
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => setRejectingId(course.id)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 px-4 py-2 text-xs text-red-400"
                      >
                        <X className="size-3.5" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-medium text-white">
          Approved & offered ({approved.length})
        </h2>
        <div className="mt-4 space-y-6">
          {approved.map((course) => (
            <div key={course.id}>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <h3 className="font-medium text-white">{course.title}</h3>
                <CourseStatusBadge status={course.status} />
              </div>
              <CourseOverview course={course} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
