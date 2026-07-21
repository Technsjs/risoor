"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { useAuth } from "@/lib/platform/auth/mock-auth";
import { formatDuration, usePlatformStore } from "@/lib/platform/hooks";

export function StudentDashboard() {
  const { user } = useAuth();
  const { repo, version } = usePlatformStore();

  const enrollments = user ? repo.getEnrollmentsByUser(user.id) : [];

  return (
    <div>
      <h1 className="text-2xl font-medium text-white">My courses</h1>
      <p className="mt-2 text-sm text-[var(--ade-muted)]">
        Track progress, complete assignments, and build your side project.
      </p>

      <div className="mt-8 space-y-3" key={version}>
        {enrollments.length === 0 ? (
          <p className="text-sm text-white/40">
            You are not enrolled in any courses yet. Ask your instructor to enroll you.
          </p>
        ) : (
          enrollments.map((enrollment) => {
            const course = repo.getCourseById(enrollment.courseId);
            if (!course) return null;

            const assignments = repo.getAssignmentsByCourse(course.id);
            const myAllocations = assignments
              .map((a) => repo.getAllocationForUser(a.id, user!.id))
              .filter(Boolean);
            const pending = myAllocations.filter(
              (a) => a!.status !== "submitted"
            ).length;

            return (
              <Link
                key={enrollment.id}
                href={`/student/courses/${course.id}`}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#1a1a1a] p-5 transition-colors hover:border-white/20"
              >
                <div>
                  <h3 className="font-medium text-white">{course.title}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-white/50">
                    <Clock className="size-3.5" />
                    {formatDuration(enrollment.timeSpentMs)} spent · {course.estimatedMonths}{" "}
                    mo course
                  </p>
                  {pending > 0 && (
                    <p className="mt-1 text-xs text-[var(--ade-accent)]">
                      {pending} assignment{pending !== 1 ? "s" : ""} in progress
                    </p>
                  )}
                </div>
                <ArrowRight className="size-4 text-white/30" />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
