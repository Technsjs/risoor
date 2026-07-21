"use client";

import Link from "next/link";
import { useAuth } from "@/lib/platform/auth/mock-auth";
import { usePlatformStore } from "@/lib/platform/hooks";
import {
  projectTemplateById,
  projectTemplates,
} from "@/lib/platform/project-templates";
import type { StudentProjectKind } from "@/lib/platform/types";

export function ProjectPicker({ courseId }: { courseId: string }) {
  const { user } = useAuth();
  const { repo, version, refresh } = usePlatformStore();

  const enrollment = user
    ? repo.getEnrollmentsByUser(user.id).find((e) => e.courseId === courseId)
    : undefined;

  const myProjects = user
    ? repo.getStudentProjectsByUser(user.id, courseId)
    : [];

  const learningProject = myProjects.find((p) => p.kind === "learning");
  const capstoneProject = myProjects.find((p) => p.kind === "capstone");

  if (!user || !enrollment) {
    return (
      <p className="text-sm text-white/50">
        You must be enrolled in this course to pick projects.
      </p>
    );
  }

  function selectProject(templateId: string, kind: StudentProjectKind) {
    repo.selectProject({
      userId: user!.id,
      courseId,
      templateId,
      kind,
    });
    refresh();
  }

  function toggleMilestone(projectId: string, milestone: string) {
    const project = repo.getStudentProjects().find((p) => p.id === projectId);
    if (!project) return;
    const completed = new Set(project.milestonesCompleted);
    if (completed.has(milestone)) {
      completed.delete(milestone);
    } else {
      completed.add(milestone);
    }
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

  function ProjectSection({
    kind,
    selected,
  }: {
    kind: StudentProjectKind;
    selected: typeof learningProject;
  }) {
    const label = kind === "learning" ? "Learning project" : "Capstone project";
    const hint =
      kind === "learning"
        ? "Build this during the course as you learn each topic."
        : "Optional second project for a future certification track — no certificate issued yet.";

    return (
      <section className="mt-10">
        <h2 className="text-lg font-medium text-white">{label}</h2>
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
                      onClick={() => toggleMilestone(selected.id, m)}
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
              key={`${kind}-${template.id}`}
              type="button"
              onClick={() => selectProject(template.id, kind)}
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

  return (
    <div>
      <Link
        href={`/student/courses/${courseId}`}
        className="text-xs text-white/40 hover:text-white/60"
      >
        ← Back to course
      </Link>
      <h1 className="mt-4 text-2xl font-medium text-white">Choose your projects</h1>
      <p className="mt-2 text-sm text-[var(--ade-muted)]">
        Pick a realistic product to build while learning. You can change your selection
        anytime — progress resets when you switch.
      </p>

      <ProjectSection kind="learning" selected={learningProject} />
      <ProjectSection kind="capstone" selected={capstoneProject} />
    </div>
  );
}
