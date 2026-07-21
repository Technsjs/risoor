"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import { useAuth } from "@/lib/platform/auth/mock-auth";
import { usePlatformStore } from "@/lib/platform/hooks";

export function InstructorDashboard() {
  const { user } = useAuth();
  const { repo, version } = usePlatformStore();

  const courses = user
    ? repo.getCoursesByInstructor(user.id)
    : [];

  const totalStudents = courses.reduce((sum, course) => {
    return sum + repo.getEnrollmentsByCourse(course.id).length;
  }, 0);

  return (
    <div>
      <h1 className="text-2xl font-medium text-white">Instructor overview</h1>
      <p className="mt-2 text-sm text-[var(--ade-muted)]">
        Manage courses, enroll students, and distribute assignments.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-5">
          <BookOpen className="size-5 text-[var(--ade-accent)]" />
          <p className="mt-3 text-2xl font-medium text-white">{courses.length}</p>
          <p className="text-sm text-white/50">Active courses</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-5">
          <Users className="size-5 text-[var(--ade-accent)]" />
          <p className="mt-3 text-2xl font-medium text-white">{totalStudents}</p>
          <p className="text-sm text-white/50">Enrolled students</p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-medium text-white">Your courses</h2>
          <Link
            href="/instructor/courses"
            className="text-xs font-medium text-[var(--ade-accent)] hover:underline"
          >
            Manage courses
          </Link>
        </div>

        <div className="mt-4 space-y-3" key={version}>
          {courses.length === 0 ? (
            <p className="text-sm text-white/40">No courses yet.</p>
          ) : (
            courses.map((course) => {
              const enrollments = repo.getEnrollmentsByCourse(course.id);
              const assignments = repo.getAssignmentsByCourse(course.id);
              return (
                <Link
                  key={course.id}
                  href={`/instructor/courses/${course.id}`}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#1a1a1a] p-5 transition-colors hover:border-white/20"
                >
                  <div>
                    <h3 className="font-medium text-white">{course.title}</h3>
                    <p className="mt-1 text-sm text-white/50">
                      {enrollments.length} students · {assignments.length} assignments ·{" "}
                      {course.estimatedMonths} mo
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-white/30" />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
