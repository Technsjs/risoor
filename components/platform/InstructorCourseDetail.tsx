"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { courseTrackById } from "@/lib/platform/course-tracks";
import { formatDuration, usePlatformStore } from "@/lib/platform/hooks";
import { CourseOverview } from "./CourseOverview";
import { CourseStatusBadge } from "./CourseStatusBadge";

export function InstructorCourseDetail({ courseId }: { courseId: string }) {
  const { repo, version, refresh } = usePlatformStore();
  const course = repo.getCourseById(courseId);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  if (!course) {
    return <p className="text-sm text-white/50">Course not found.</p>;
  }

  const isApproved = course.status === "approved";
  const enrollments = repo.getEnrollmentsByCourse(courseId);
  const enrolledIds = new Set(enrollments.map((e) => e.userId));
  const allStudents = repo.getStudents();
  const assignments = repo.getAssignmentsByCourse(courseId);
  const track = courseTrackById(course.trackId);

  function toggleStudent(id: string) {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function enrollSelected() {
    if (!isApproved) return;
    const toEnroll = selectedStudents.filter((id) => !enrolledIds.has(id));
    if (toEnroll.length === 0) return;
    repo.enrollStudents(courseId, toEnroll);
    setSelectedStudents([]);
    refresh();
  }

  function unenroll(userId: string) {
    repo.unenrollStudent(courseId, userId);
    refresh();
  }

  function resubmit() {
    repo.submitCourseForApproval(courseId);
    refresh();
  }

  const getStudentName = useCallback(
    (userId: string) => repo.getUserById(userId)?.name ?? userId,
    [repo]
  );

  return (
    <div>
      <Link
        href="/instructor/courses"
        className="text-xs text-white/40 hover:text-white/60"
      >
        ← All courses
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-medium text-white">{course.title}</h1>
        <CourseStatusBadge status={course.status} />
      </div>
      {track && (
        <p className="mt-1 text-sm text-white/50">{track.label}</p>
      )}

      {course.status === "pending_approval" && (
        <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200/90">
          Waiting for admin approval. Students cannot enroll until this course is
          approved.
        </p>
      )}

      {course.status === "rejected" && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-300">
            Rejected: {course.rejectionNote ?? "No reason provided."}
          </p>
          <button
            type="button"
            onClick={resubmit}
            className="mt-3 rounded-full bg-white/10 px-4 py-1.5 text-xs text-white"
          >
            Edit & resubmit for approval
          </button>
        </div>
      )}

      <div className="mt-8">
        <CourseOverview course={course} />
      </div>

      <section className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-medium text-white">
            Roster ({enrollments.length})
          </h2>
          {isApproved && (
            <Link
              href={`/instructor/courses/${courseId}/assignments/new`}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f0f0f]"
            >
              New assignment
            </Link>
          )}
        </div>

        {!isApproved ? (
          <p className="mt-4 text-sm text-white/40">
            Enrollment opens after admin approval.
          </p>
        ) : (
          <>
            <div
              className="mt-4 overflow-x-auto rounded-2xl border border-white/10"
              key={version}
            >
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="border-b border-white/10 bg-[#1a1a1a] text-xs uppercase tracking-wider text-white/40">
                  <tr>
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Time in course</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((e) => (
                    <tr key={e.id} className="border-b border-white/5">
                      <td className="px-4 py-3 text-white">
                        {getStudentName(e.userId)}
                      </td>
                      <td className="px-4 py-3 text-white/60">{e.status}</td>
                      <td className="px-4 py-3 text-white/60">
                        {formatDuration(e.timeSpentMs)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => unenroll(e.userId)}
                          className="text-xs text-red-400/80 hover:text-red-400"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-[#1a1a1a] p-5">
              <h3 className="text-sm font-medium text-white">Enroll students</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {allStudents
                  .filter((s) => !enrolledIds.has(s.id))
                  .map((student) => (
                    <button
                      key={student.id}
                      type="button"
                      onClick={() => toggleStudent(student.id)}
                      className={`rounded-full px-3 py-1 text-xs ${
                        selectedStudents.includes(student.id)
                          ? "bg-white text-[#0f0f0f]"
                          : "border border-white/10 text-white/60"
                      }`}
                    >
                      {student.name}
                    </button>
                  ))}
              </div>
              {selectedStudents.length > 0 && (
                <button
                  type="button"
                  onClick={enrollSelected}
                  className="mt-4 rounded-full bg-[var(--ade-accent)] px-4 py-2 text-xs font-medium text-white"
                >
                  Enroll {selectedStudents.length} student
                  {selectedStudents.length !== 1 ? "s" : ""}
                </button>
              )}
            </div>
          </>
        )}
      </section>

      {isApproved && (
        <section className="mt-10">
          <h2 className="text-lg font-medium text-white">Assignments</h2>
          <div className="mt-4 space-y-3">
            {assignments.length === 0 ? (
              <p className="text-sm text-white/40">No assignments yet.</p>
            ) : (
              assignments.map((assignment) => {
                const allocations = repo.getAllocationsByAssignment(assignment.id);
                const variants = repo.getVariantsByAssignment(assignment.id);
                return (
                  <div
                    key={assignment.id}
                    className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-5"
                  >
                    <h3 className="font-medium text-white">{assignment.title}</h3>
                    <p className="mt-1 text-sm text-white/50">{assignment.instructions}</p>
                    <p className="mt-2 text-xs text-white/40">
                      {variants.length} variant{variants.length !== 1 ? "s" : ""} ·{" "}
                      {allocations.length} allocated
                    </p>
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full min-w-[400px] text-left text-xs">
                        <thead className="text-white/40">
                          <tr>
                            <th className="pb-2 pr-4">Student</th>
                            <th className="pb-2 pr-4">Variant</th>
                            <th className="pb-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allocations.map((alloc) => (
                            <tr key={alloc.id} className="border-t border-white/5">
                              <td className="py-2 pr-4 text-white/70">
                                {getStudentName(alloc.userId)}
                              </td>
                              <td className="py-2 pr-4 text-white/60">
                                {repo.getVariantById(alloc.variantId)?.label}
                              </td>
                              <td className="py-2 text-white/60">{alloc.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      )}
    </div>
  );
}
