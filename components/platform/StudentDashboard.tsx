"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/platform/auth/mock-auth";
import { getCourseTimeline } from "@/lib/platform/course-progress";
import { formatDuration, usePlatformStore } from "@/lib/platform/hooks";
import { CourseProgressCard } from "./CourseProgressCard";

export function StudentDashboard() {
  const { user } = useAuth();
  const { repo, version } = usePlatformStore();

  const enrollments = user ? repo.getEnrollmentsByUser(user.id) : [];

  return (
    <div>
      <h1 className="text-2xl font-medium text-white">My courses</h1>
      <p className="mt-2 text-sm text-[var(--ade-muted)]">
        Live cohorts — track time remaining, assignments, and your side project in
        Settings.
      </p>

      <div className="mt-8 space-y-4" key={version}>
        {enrollments.length === 0 ? (
          <p className="text-sm text-white/40">
            You are not enrolled in any courses yet. Ask your instructor to enroll you.
          </p>
        ) : (
          enrollments.map((enrollment) => {
            const course = repo.getCourseById(enrollment.courseId);
            if (!course || course.status !== "approved") return null;

            const timeline = getCourseTimeline(enrollment, course);
            const assignments = repo.getAssignmentsByCourse(course.id);
            const myAllocations = assignments
              .map((a) => repo.getAllocationForUser(a.id, user!.id))
              .filter(Boolean);
            const pending = myAllocations.filter(
              (a) => a!.status !== "submitted"
            ).length;

            return (
              <div
                key={enrollment.id}
                className="rounded-2xl border border-white/10 bg-[#1a1a1a] overflow-hidden"
              >
                <Link
                  href={`/student/courses/${course.id}`}
                  className="block p-5 transition-colors hover:bg-white/[0.02]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-white">{course.title}</h3>
                      {pending > 0 && (
                        <p className="mt-1 text-xs text-[var(--ade-accent)]">
                          {pending} assignment{pending !== 1 ? "s" : ""} in progress
                        </p>
                      )}
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-white/30" />
                  </div>
                </Link>
                <div className="border-t border-white/10 p-5 pt-4">
                  <CourseProgressCard
                    timeline={timeline}
                    timeSpentLabel={formatDuration(enrollment.timeSpentMs)}
                    compact
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
