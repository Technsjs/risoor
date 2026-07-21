"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/platform/auth/mock-auth";
import { usePlatformStore } from "@/lib/platform/hooks";
import {
  projectTemplateById,
  projectTemplates,
} from "@/lib/platform/project-templates";
import type { StudentProject, StudentProjectKind } from "@/lib/platform/types";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2.5 text-sm text-white outline-none focus:border-[var(--ade-accent)]";

function ProjectSection({
  courseId,
  kind,
  selected,
  onSelect,
  onToggleMilestone,
  version,
}: {
  courseId: string;
  kind: StudentProjectKind;
  selected: StudentProject | undefined;
  onSelect: (templateId: string, kind: StudentProjectKind) => void;
  onToggleMilestone: (projectId: string, milestone: string) => void;
  version: number;
}) {
  const label = kind === "learning" ? "Learning project" : "Capstone project";
  const hint =
    kind === "learning"
      ? "Build this during live sessions alongside your cohort."
      : "Optional second project — no certificate issued yet.";

  return (
    <section className="mt-8">
      <h3 className="text-base font-medium text-white">{label}</h3>
      <p className="mt-1 text-sm text-[var(--ade-muted)]">{hint}</p>

      {selected && (
        <div className="mt-4 rounded-2xl border border-[var(--ade-accent)]/30 bg-[var(--ade-accent-dim)] p-5">
          <p className="text-sm font-medium text-white">
            {projectTemplateById(selected.templateId)?.name}
          </p>
          <p className="mt-1 text-xs text-white/50">
            {projectTemplateById(selected.templateId)?.description}
          </p>
          <ul className="mt-4 space-y-2">
            {projectTemplateById(selected.templateId)?.milestones.map((m) => {
              const done = selected.milestonesCompleted.includes(m);
              return (
                <li key={m}>
                  <button
                    type="button"
                    onClick={() => onToggleMilestone(selected.id, m)}
                    className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm ${
                      done
                        ? "border-emerald-500/40 text-emerald-400"
                        : "border-white/10 text-white/70"
                    }`}
                  >
                    <span
                      className={`size-4 shrink-0 rounded border ${
                        done ? "border-emerald-500 bg-emerald-500/20" : "border-white/20"
                      }`}
                    />
                    {m}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2" key={version}>
        {projectTemplates.map((template) => (
          <button
            key={`${courseId}-${kind}-${template.id}`}
            type="button"
            onClick={() => onSelect(template.id, kind)}
            className={`rounded-2xl border p-4 text-left transition-colors ${
              selected?.templateId === template.id
                ? "border-white bg-white/5"
                : "border-white/10 bg-[#1a1a1a] hover:border-white/20"
            }`}
          >
            <span className="text-[10px] font-medium uppercase tracking-wider text-white/40">
              {template.platform} · {template.category}
            </span>
            <p className="mt-1 font-medium text-white">{template.name}</p>
            <p className="mt-1 text-xs text-white/50 line-clamp-2">
              {template.description}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

export function StudentSettingsPage() {
  const { user, logout } = useAuth();
  const { repo, version, refresh } = usePlatformStore();
  const searchParams = useSearchParams();

  const enrollments = user
    ? repo.getEnrollmentsByUser(user.id).filter((e) => {
        const c = repo.getCourseById(e.courseId);
        return c?.status === "approved";
      })
    : [];

  const courseFromUrl = searchParams.get("course");
  const [courseId, setCourseId] = useState(
    courseFromUrl && enrollments.some((e) => e.courseId === courseFromUrl)
      ? courseFromUrl
      : enrollments[0]?.courseId ?? ""
  );

  useEffect(() => {
    if (
      courseFromUrl &&
      enrollments.some((e) => e.courseId === courseFromUrl)
    ) {
      setCourseId(courseFromUrl);
    }
  }, [courseFromUrl, enrollments]);

  const myProjects =
    user && courseId ? repo.getStudentProjectsByUser(user.id, courseId) : [];
  const learningProject = myProjects.find((p) => p.kind === "learning");
  const capstoneProject = myProjects.find((p) => p.kind === "capstone");

  function selectProject(templateId: string, kind: StudentProjectKind) {
    if (!user || !courseId) return;
    repo.selectProject({ userId: user.id, courseId, templateId, kind });
    refresh();
  }

  function toggleMilestone(projectId: string, milestone: string) {
    const project = repo.getStudentProjects().find((p) => p.id === projectId);
    if (!project) return;
    const completed = new Set(project.milestonesCompleted);
    if (completed.has(milestone)) completed.delete(milestone);
    else completed.add(milestone);
    const milestonesCompleted = Array.from(completed);
    const template = projectTemplateById(project.templateId);
    const allDone =
      template && milestonesCompleted.length >= template.milestones.length;
    repo.updateStudentProject(projectId, {
      milestonesCompleted,
      status: allDone ? "completed" : "active",
    });
    refresh();
  }

  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-medium text-white">Settings</h1>
      <p className="mt-2 text-sm text-[var(--ade-muted)]">
        Manage your account and side projects.
      </p>

      <section className="mt-10 rounded-2xl border border-white/10 bg-[#1a1a1a] p-6">
        <h2 className="text-lg font-medium text-white">Account</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs text-white/50">Name</label>
            <input value={user.name} readOnly className={fieldClass} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-white/50">Email</label>
            <input value={user.email} readOnly className={fieldClass} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-white/50">Role</label>
            <input value={user.role} readOnly className={`${fieldClass} capitalize`} />
          </div>
        </div>
        <p className="mt-4 text-xs text-white/40">
          Account details will sync from Firebase when connected.
        </p>
        <button
          type="button"
          onClick={logout}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-white/25 hover:text-white"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-[#1a1a1a] p-6">
        <h2 className="text-lg font-medium text-white">Your projects</h2>
        <p className="mt-1 text-sm text-[var(--ade-muted)]">
          Choose what you build during your live cohort. Progress resets if you
          switch templates.
        </p>

        {enrollments.length === 0 ? (
          <p className="mt-4 text-sm text-white/40">
            Enroll in a course first to pick a project.
          </p>
        ) : (
          <>
            <div className="mt-4">
              <label className="mb-1.5 block text-xs text-white/50">Course</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className={fieldClass}
              >
                {enrollments.map((e) => {
                  const c = repo.getCourseById(e.courseId);
                  return (
                    <option key={e.id} value={e.courseId}>
                      {c?.title ?? e.courseId}
                    </option>
                  );
                })}
              </select>
            </div>

            <ProjectSection
              courseId={courseId}
              kind="learning"
              selected={learningProject}
              onSelect={selectProject}
              onToggleMilestone={toggleMilestone}
              version={version}
            />
            <ProjectSection
              courseId={courseId}
              kind="capstone"
              selected={capstoneProject}
              onSelect={selectProject}
              onToggleMilestone={toggleMilestone}
              version={version}
            />
          </>
        )}
      </section>
    </div>
  );
}
