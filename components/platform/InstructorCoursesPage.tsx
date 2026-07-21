"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { courseTrackById, courseTracks } from "@/lib/platform/course-tracks";
import { useAuth } from "@/lib/platform/auth/mock-auth";
import { usePlatformStore } from "@/lib/platform/hooks";
import type { CourseTrackId } from "@/lib/platform/types";
import { CourseStatusBadge } from "./CourseStatusBadge";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--ade-accent)] focus:ring-1 focus:ring-[var(--ade-accent)]";

function linesFromText(text: string) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export function InstructorCoursesPage() {
  const { user } = useAuth();
  const { repo, version, refresh } = usePlatformStore();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [outcomesText, setOutcomesText] = useState("");
  const [skillsText, setSkillsText] = useState("");
  const [trackId, setTrackId] = useState<CourseTrackId>("mobile-cross");
  const [estimatedMonths, setEstimatedMonths] = useState(6);

  const courses = user ? repo.getCoursesByInstructor(user.id) : [];
  const track = courseTrackById(trackId);

  function applyTrackPreset(id: CourseTrackId) {
    setTrackId(id);
    const preset = courseTrackById(id);
    if (!preset) return;
    if (preset.suggestedOutcomes.length) {
      setOutcomesText(preset.suggestedOutcomes.join("\n"));
    }
    if (preset.suggestedSkills.length) {
      setSkillsText(preset.suggestedSkills.join("\n"));
    }
  }

  function createCourse(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !title.trim() || !overview.trim()) return;
    const outcomes = linesFromText(outcomesText);
    const skills = linesFromText(skillsText);
    if (outcomes.length === 0 || skills.length === 0) return;

    const course = repo.createCourse({
      title: title.trim(),
      overview: overview.trim(),
      outcomes,
      skills,
      trackId,
      deliveryFormat: "live",
      estimatedMonths,
      instructorId: user.id,
    });
    refresh();
    setShowForm(false);
    router.push(`/instructor/courses/${course.id}`);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-white">Courses</h1>
          <p className="mt-2 text-sm text-[var(--ade-muted)]">
            Create live cohorts (Zoom-based). Courses go to admin for approval
            before students can enroll.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f0f0f]"
        >
          {showForm ? "Cancel" : "New course"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={createCourse}
          className="mt-6 rounded-2xl border border-white/10 bg-[#1a1a1a] p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs text-white/50">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={fieldClass}
                placeholder="Mobile App Development · Flutter"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs text-white/50">Track</label>
              <select
                value={trackId}
                onChange={(e) => applyTrackPreset(e.target.value as CourseTrackId)}
                className={fieldClass}
              >
                {courseTracks.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
              {track && (
                <p className="mt-1.5 text-xs text-white/40">{track.description}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs text-white/50">
                Overview (basics)
              </label>
              <textarea
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                className={`${fieldClass} min-h-[80px] resize-y`}
                placeholder="Live Zoom cohort — what this course is about…"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-white/50">
                What students will be able to do (one per line)
              </label>
              <textarea
                value={outcomesText}
                onChange={(e) => setOutcomesText(e.target.value)}
                className={`${fieldClass} min-h-[120px] resize-y font-mono text-xs`}
                placeholder="Ship an app to the stores&#10;Integrate Firebase…"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-white/50">
                What they&apos;ll learn — skills (one per line)
              </label>
              <textarea
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                className={`${fieldClass} min-h-[120px] resize-y font-mono text-xs`}
                placeholder="Dart&#10;Flutter&#10;Firebase&#10;GetX…"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-white/50">
                Duration (months)
              </label>
              <input
                type="number"
                min={1}
                max={24}
                value={estimatedMonths}
                onChange={(e) => setEstimatedMonths(Number(e.target.value))}
                className={fieldClass}
              />
            </div>
          </div>

          <p className="mt-4 text-xs text-amber-400/80">
            Submitting creates the course as <strong>pending approval</strong> — an
            admin must approve before enrollment opens.
          </p>

          <button
            type="submit"
            className="mt-4 rounded-full bg-[var(--ade-accent)] px-5 py-2 text-sm font-medium text-white"
          >
            Submit for approval
          </button>
        </form>
      )}

      <div className="mt-8 space-y-3" key={version}>
        {courses.map((course) => {
          const trackLabel = courseTrackById(course.trackId)?.label;
          return (
            <Link
              key={course.id}
              href={`/instructor/courses/${course.id}`}
              className="block rounded-2xl border border-white/10 bg-[#1a1a1a] p-5 transition-colors hover:border-white/20"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-medium text-white">{course.title}</h3>
                <CourseStatusBadge status={course.status} />
              </div>
              <p className="mt-1 text-sm text-white/50 line-clamp-2">
                {course.overview}
              </p>
              <p className="mt-2 text-xs text-white/40">
                {trackLabel} · {course.skills.length} skills · {course.estimatedMonths}{" "}
                mo · Live
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
