"use client";

import Link from "next/link";
import { useCallback, useEffect } from "react";
import { topicById } from "@/lib/learn-catalog";
import { useAuth } from "@/lib/platform/auth/mock-auth";
import { formatDuration, usePlatformStore } from "@/lib/platform/hooks";
import { projectTemplateById } from "@/lib/platform/project-templates";
import { TimeTracker } from "./TimeTracker";

export function StudentCourseDetail({ courseId }: { courseId: string }) {
  const { user } = useAuth();
  const { repo, version, refresh } = usePlatformStore();

  const course = repo.getCourseById(courseId);
  const enrollment = user
    ? repo.getEnrollmentsByUser(user.id).find((e) => e.courseId === courseId)
    : undefined;

  useEffect(() => {
    if (enrollment) {
      repo.markEnrollmentStarted(enrollment.id);
    }
  }, [enrollment, repo]);

  const handleTick = useCallback(
    (deltaMs: number) => {
      if (enrollment) {
        repo.recordEnrollmentTime(enrollment.id, deltaMs);
        refresh();
      }
    },
    [enrollment, repo, refresh]
  );

  if (!course || !user) {
    return <p className="text-sm text-white/50">Course not found.</p>;
  }

  if (!enrollment) {
    return (
      <p className="text-sm text-white/50">
        You are not enrolled in this course.
      </p>
    );
  }

  const assignments = repo.getAssignmentsByCourse(courseId);
  const projects = repo.getStudentProjectsByUser(user.id, courseId);

  return (
    <div>
      <TimeTracker active onTick={handleTick} />

      <Link href="/student" className="text-xs text-white/40 hover:text-white/60">
        ← My courses
      </Link>
      <h1 className="mt-4 text-2xl font-medium text-white">{course.title}</h1>
      <p className="mt-2 text-sm text-[var(--ade-muted)]">{course.description}</p>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-white/50">
        <span className="rounded-full border border-white/10 px-3 py-1">
          Status: {enrollment.status}
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1">
          Time: {formatDuration(enrollment.timeSpentMs)}
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1">
          {course.estimatedMonths} months
        </span>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-white">Topics</h2>
        <ul className="mt-3 space-y-2" key={version}>
          {course.topicIds.map((id) => {
            const topic = topicById(id);
            return (
              <li
                key={id}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-[#1a1a1a] px-4 py-3"
              >
                <span className="text-sm text-white">{topic?.name ?? id}</span>
                {topic?.href ? (
                  <Link
                    href={topic.href}
                    className="text-xs text-[var(--ade-accent)] hover:underline"
                  >
                    Open lesson
                  </Link>
                ) : (
                  <span className="text-xs text-white/30">Coming soon</span>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-medium text-white">Assignments</h2>
        </div>
        <div className="mt-4 space-y-3">
          {assignments.length === 0 ? (
            <p className="text-sm text-white/40">No assignments yet.</p>
          ) : (
            assignments.map((assignment) => {
              const allocation = repo.getAllocationForUser(assignment.id, user.id);
              if (!allocation) {
                return (
                  <div
                    key={assignment.id}
                    className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-5 opacity-60"
                  >
                    <h3 className="font-medium text-white">{assignment.title}</h3>
                    <p className="mt-1 text-xs text-white/40">Not assigned to you</p>
                  </div>
                );
              }
              const variant = repo.getVariantById(allocation.variantId);
              return (
                <Link
                  key={assignment.id}
                  href={`/student/courses/${courseId}/assignments/${assignment.id}`}
                  className="block rounded-2xl border border-white/10 bg-[#1a1a1a] p-5 transition-colors hover:border-white/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-white">{assignment.title}</h3>
                      <p className="mt-1 text-sm text-white/50">
                        Your variant: {variant?.label}
                      </p>
                      <p className="mt-1 text-xs text-white/40">
                        {allocation.completedScreenIds.length}/
                        {variant?.screens.length ?? 0} screens · {allocation.status}
                      </p>
                    </div>
                    <span className="text-xs text-[var(--ade-accent)]">Open →</span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-medium text-white">Projects</h2>
          <Link
            href={`/student/courses/${courseId}/projects`}
            className="text-xs font-medium text-[var(--ade-accent)] hover:underline"
          >
            Manage projects
          </Link>
        </div>
        <div className="mt-4 space-y-2">
          {projects.length === 0 ? (
            <p className="text-sm text-white/40">
              Pick a learning project and optional capstone.
            </p>
          ) : (
            projects.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-white/10 bg-[#1a1a1a] px-4 py-3 text-sm"
              >
                <span className="text-white/50 uppercase text-[10px] tracking-wider">
                  {p.kind}
                </span>
                <p className="text-white">
                  {projectTemplateById(p.templateId)?.name ?? p.templateId}
                </p>
                <p className="text-xs text-white/40">
                  {p.milestonesCompleted.length} milestones completed
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
