"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { previewSplitCounts } from "@/lib/platform/assignment-distribution";
import { usePlatformStore } from "@/lib/platform/hooks";
import type { AssignmentRuleMode, AssignmentType } from "@/lib/platform/types";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--ade-accent)] focus:ring-1 focus:ring-[var(--ade-accent)]";

type VariantDraft = {
  label: string;
  screens: { title: string; description: string }[];
};

export function NewAssignmentForm({ courseId }: { courseId: string }) {
  const { repo, refresh } = usePlatformStore();
  const router = useRouter();
  const course = repo.getCourseById(courseId);
  const enrollments = repo.getEnrollmentsByCourse(courseId);
  const students = repo.getStudents();

  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [type, setType] = useState<AssignmentType>("ui-design");
  const [mode, setMode] = useState<AssignmentRuleMode>("split");
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [variants, setVariants] = useState<VariantDraft[]>([
    {
      label: "Facebook-style login",
      screens: [
        { title: "Hero / empty state", description: "Landing before login." },
        { title: "Email + password", description: "Primary login form." },
        { title: "Error state", description: "Invalid credentials." },
        { title: "Success", description: "Redirect after login." },
      ],
    },
    {
      label: "Amazon-style login",
      screens: [
        { title: "Email entry", description: "Step 1: email or phone." },
        { title: "Password entry", description: "Step 2: password." },
        { title: "Error state", description: "Wrong password or lockout." },
        { title: "Success", description: "Signed in redirect." },
      ],
    },
  ]);
  const [splitPercents, setSplitPercents] = useState<number[]>([20, 80]);

  const enrolledCount =
    mode === "specific" ? selectedStudentIds.length : enrollments.length;

  const preview = useMemo(() => {
    if (mode !== "split" || variants.length === 0) return [];
    const splits = variants.map((_, i) => ({
      variantId: `preview_${i}`,
      percent: splitPercents[i] ?? 0,
    }));
    return previewSplitCounts(enrolledCount, splits);
  }, [mode, variants, splitPercents, enrolledCount]);

  if (!course) {
    return <p className="text-sm text-white/50">Course not found.</p>;
  }

  function updateVariant(index: number, patch: Partial<VariantDraft>) {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, ...patch } : v))
    );
  }

  function addVariant() {
    setVariants((prev) => [
      ...prev,
      {
        label: `Variant ${prev.length + 1}`,
        screens: [{ title: "Screen 1", description: "First step." }],
      },
    ]);
    setSplitPercents((prev) => {
      const next = [...prev, 0];
      if (next.length > 0) {
        const even = Math.floor(100 / next.length);
        return next.map((_, i) =>
          i === next.length - 1 ? 100 - even * (next.length - 1) : even
        );
      }
      return next;
    });
  }

  function updateSplitPercent(index: number, value: number) {
    setSplitPercents((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function toggleStudent(id: string) {
    setSelectedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || variants.length === 0) return;

    const variantPayload = variants.map((v) => ({
      label: v.label,
      screens: v.screens.map((s, i) => ({
        id: `screen_${i}`,
        title: s.title,
        description: s.description,
      })),
    }));

    const createdVariants = variantPayload.map((v, i) => ({
      ...v,
      screens: v.screens.map((s, si) => ({
        ...s,
        id: `screen_${Date.now()}_${i}_${si}`,
      })),
    }));

    const rule =
      mode === "all"
        ? { mode: "all" as const }
        : mode === "specific"
          ? { mode: "specific" as const, studentIds: selectedStudentIds }
          : {
              mode: "split" as const,
              splits: createdVariants.map((_, i) => ({
                variantId: "",
                percent: splitPercents[i] ?? 0,
              })),
            };

    repo.createAssignmentWithVariants(
      {
        courseId,
        title: title.trim(),
        instructions: instructions.trim(),
        type,
      },
      createdVariants.map(({ label, screens }) => ({ label, screens })),
      rule
    );

    refresh();
    router.push(`/instructor/courses/${courseId}`);
  }

  const splitTotal = splitPercents.reduce((a, b) => a + b, 0);

  return (
    <div>
      <Link
        href={`/instructor/courses/${courseId}`}
        className="text-xs text-white/40 hover:text-white/60"
      >
        ← Back to course
      </Link>
      <h1 className="mt-4 text-2xl font-medium text-white">New assignment</h1>
      <p className="mt-2 text-sm text-[var(--ade-muted)]">
        Create variants and choose how to distribute them across the class.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs text-white/50">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={fieldClass}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs text-white/50">Instructions</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className={`${fieldClass} min-h-[80px]`}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-white/50">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as AssignmentType)}
              className={fieldClass}
            >
              <option value="ui-design">UI design</option>
              <option value="coding">Coding</option>
            </select>
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Variants</h2>
            <button
              type="button"
              onClick={addVariant}
              className="text-xs text-[var(--ade-accent)]"
            >
              + Add variant
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {variants.map((variant, vi) => (
              <div
                key={vi}
                className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-5"
              >
                <input
                  value={variant.label}
                  onChange={(e) => updateVariant(vi, { label: e.target.value })}
                  className={fieldClass}
                  placeholder="Variant label"
                />
                <div className="mt-3 space-y-2">
                  {variant.screens.map((screen, si) => (
                    <div key={si} className="grid gap-2 sm:grid-cols-2">
                      <input
                        value={screen.title}
                        onChange={(e) => {
                          const screens = [...variant.screens];
                          screens[si] = { ...screens[si], title: e.target.value };
                          updateVariant(vi, { screens });
                        }}
                        className={fieldClass}
                        placeholder={`Screen ${si + 1} title`}
                      />
                      <input
                        value={screen.description}
                        onChange={(e) => {
                          const screens = [...variant.screens];
                          screens[si] = {
                            ...screens[si],
                            description: e.target.value,
                          };
                          updateVariant(vi, { screens });
                        }}
                        className={fieldClass}
                        placeholder="Description"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white">Distribution</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {(
              [
                ["all", "Whole class"],
                ["specific", "Specific students"],
                ["split", "Split by %"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value)}
                className={`rounded-full px-3 py-1.5 text-xs ${
                  mode === value
                    ? "bg-white text-[#0f0f0f]"
                    : "border border-white/10 text-white/60"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {mode === "specific" && (
            <div className="mt-4 flex flex-wrap gap-2">
              {students.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleStudent(s.id)}
                  className={`rounded-full px-3 py-1 text-xs ${
                    selectedStudentIds.includes(s.id)
                      ? "bg-white text-[#0f0f0f]"
                      : "border border-white/10 text-white/60"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}

          {mode === "split" && (
            <div className="mt-4 space-y-3">
              {variants.map((v, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="min-w-[140px] text-sm text-white/70">{v.label}</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={splitPercents[i] ?? 0}
                    onChange={(e) => updateSplitPercent(i, Number(e.target.value))}
                    className={`${fieldClass} max-w-[80px]`}
                  />
                  <span className="text-xs text-white/40">%</span>
                </div>
              ))}
              <p
                className={`text-xs ${splitTotal === 100 ? "text-emerald-400" : "text-amber-400"}`}
              >
                Total: {splitTotal}% (must equal 100)
              </p>
              {preview.length > 0 && (
                <div className="rounded-xl border border-white/10 p-3 text-xs text-white/60">
                  Preview for {enrolledCount} students:{" "}
                  {preview.map((p, i) => (
                    <span key={i}>
                      {variants[i]?.label}: ~{p.count}
                      {i < preview.length - 1 ? " · " : ""}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        <button
          type="submit"
          disabled={mode === "split" && splitTotal !== 100}
          className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#0f0f0f] disabled:opacity-40"
        >
          Create & distribute
        </button>
      </form>
    </div>
  );
}
