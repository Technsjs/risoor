"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/platform/auth/mock-auth";
import { formatDuration, usePlatformStore } from "@/lib/platform/hooks";
import type { AssignmentScreen } from "@/lib/platform/types";
import { TimeTracker } from "./TimeTracker";

export function AssignmentFlow({
  courseId,
  assignmentId,
}: {
  courseId: string;
  assignmentId: string;
}) {
  const { user } = useAuth();
  const { repo, refresh } = usePlatformStore();
  const assignment = repo.getAssignmentById(assignmentId);
  const allocation = user
    ? repo.getAllocationForUser(assignmentId, user.id)
    : undefined;
  const variant = allocation
    ? repo.getVariantById(allocation.variantId)
    : undefined;

  const [screenIndex, setScreenIndex] = useState(0);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (allocation && !allocation.startedAt) {
      repo.updateAllocation(allocation.id, {
        startedAt: new Date().toISOString(),
        status: "in_progress",
      });
      refresh();
    }
  }, [allocation, repo, refresh]);

  useEffect(() => {
    if (allocation) {
      setNotes(allocation.notes);
    }
  }, [allocation?.id, allocation?.notes]);

  const handleTick = useCallback(
    (deltaMs: number) => {
      if (allocation) {
        repo.recordAllocationTime(allocation.id, deltaMs);
        refresh();
      }
    },
    [allocation, repo, refresh]
  );

  if (!assignment || !user || !allocation || !variant) {
    return (
      <p className="text-sm text-white/50">
        Assignment not found or not assigned to you.
      </p>
    );
  }

  const screens: AssignmentScreen[] = variant.screens;
  const currentScreen = screens[screenIndex];
  const isComplete = allocation.completedScreenIds.includes(currentScreen.id);

  function toggleScreenComplete() {
    const ids = new Set(allocation!.completedScreenIds);
    if (ids.has(currentScreen.id)) {
      ids.delete(currentScreen.id);
    } else {
      ids.add(currentScreen.id);
    }
    repo.updateAllocation(allocation!.id, {
      completedScreenIds: Array.from(ids),
    });
    refresh();
  }

  function saveNotes(value: string) {
    setNotes(value);
    repo.updateAllocation(allocation!.id, { notes: value });
    refresh();
  }

  function submit() {
    repo.updateAllocation(allocation!.id, {
      status: "submitted",
      submittedAt: new Date().toISOString(),
    });
    refresh();
  }

  const allScreensDone = screens.every((s) =>
    allocation.completedScreenIds.includes(s.id)
  );

  return (
    <div>
      <TimeTracker active={allocation.status !== "submitted"} onTick={handleTick} />

      <Link
        href={`/student/courses/${courseId}`}
        className="text-xs text-white/40 hover:text-white/60"
      >
        ← Back to course
      </Link>

      <h1 className="mt-4 text-2xl font-medium text-white">{assignment.title}</h1>
      <p className="mt-1 text-sm text-[var(--ade-accent)]">Variant: {variant.label}</p>
      <p className="mt-2 text-sm text-[var(--ade-muted)]">{assignment.instructions}</p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/50">
        <span className="rounded-full border border-white/10 px-3 py-1">
          {formatDuration(allocation.timeSpentMs)} spent
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1">
          Status: {allocation.status}
        </span>
      </div>

      {allocation.status === "submitted" ? (
        <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
          <p className="font-medium text-emerald-400">Assignment submitted</p>
          <p className="mt-1 text-sm text-white/60">
            Submitted on{" "}
            {allocation.submittedAt
              ? new Date(allocation.submittedAt).toLocaleString()
              : "—"}
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {screens.map((screen, i) => {
              const done = allocation.completedScreenIds.includes(screen.id);
              const active = i === screenIndex;
              return (
                <button
                  key={screen.id}
                  type="button"
                  onClick={() => setScreenIndex(i)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition-colors ${
                    active
                      ? "bg-white text-[#0f0f0f]"
                      : done
                        ? "border border-emerald-500/40 text-emerald-400"
                        : "border border-white/10 text-white/50"
                  }`}
                >
                  {i + 1}. {screen.title}
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#1a1a1a] p-6">
            <h2 className="text-lg font-medium text-white">{currentScreen.title}</h2>
            <p className="mt-2 text-sm text-[var(--ade-muted)]">
              {currentScreen.description}
            </p>

            <div className="mt-6">
              <label className="mb-1.5 block text-xs text-white/50">
                Your design notes for this screen
              </label>
              <textarea
                value={notes}
                onChange={(e) => saveNotes(e.target.value)}
                className="min-h-[120px] w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-white outline-none focus:border-[var(--ade-accent)]"
                placeholder="Describe layout, components, states, and UX decisions…"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={screenIndex === 0}
                onClick={() => setScreenIndex((i) => i - 1)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 disabled:opacity-30"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={toggleScreenComplete}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  isComplete
                    ? "border border-emerald-500/40 text-emerald-400"
                    : "bg-white/10 text-white"
                }`}
              >
                {isComplete ? "Mark incomplete" : "Mark complete"}
              </button>
              <button
                type="button"
                disabled={screenIndex >= screens.length - 1}
                onClick={() => setScreenIndex((i) => i + 1)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </div>

          {allScreensDone && (
            <button
              type="button"
              onClick={submit}
              className="mt-6 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#0f0f0f]"
            >
              Submit assignment
            </button>
          )}
        </>
      )}
    </div>
  );
}
