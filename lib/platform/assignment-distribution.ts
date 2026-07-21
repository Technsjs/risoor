import type {
  AssignmentAllocation,
  AssignmentRule,
  AssignmentVariant,
} from "./types";

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function distributeAssignment(
  enrolledStudentIds: string[],
  rule: AssignmentRule,
  variants: AssignmentVariant[],
  assignmentId: string
): AssignmentAllocation[] {
  const now = new Date().toISOString();

  if (variants.length === 0) {
    return [];
  }

  let targetStudentIds: string[] = [];

  if (rule.mode === "specific") {
    targetStudentIds = (rule.studentIds ?? []).filter((id) =>
      enrolledStudentIds.includes(id)
    );
  } else {
    targetStudentIds = [...enrolledStudentIds];
  }

  if (targetStudentIds.length === 0) {
    return [];
  }

  const defaultVariantId =
    rule.defaultVariantId ?? variants[0]?.id ?? "";

  if (rule.mode === "all" || rule.mode === "specific") {
    return targetStudentIds.map((userId) => ({
      id: id("alloc"),
      assignmentId,
      userId,
      variantId: defaultVariantId,
      status: "assigned" as const,
      assignedAt: now,
      startedAt: null,
      submittedAt: null,
      timeSpentMs: 0,
      completedScreenIds: [],
      notes: "",
    }));
  }

  const splits = rule.splits ?? [];
  const totalPercent = splits.reduce((sum, s) => sum + s.percent, 0);
  if (totalPercent !== 100 || splits.length === 0) {
    return targetStudentIds.map((userId) => ({
      id: id("alloc"),
      assignmentId,
      userId,
      variantId: defaultVariantId,
      status: "assigned" as const,
      assignedAt: now,
      startedAt: null,
      submittedAt: null,
      timeSpentMs: 0,
      completedScreenIds: [],
      notes: "",
    }));
  }

  const shuffled = shuffle(targetStudentIds);
  const allocations: AssignmentAllocation[] = [];
  let cursor = 0;

  for (let i = 0; i < splits.length; i++) {
    const split = splits[i];
    const isLast = i === splits.length - 1;
    const count = isLast
      ? shuffled.length - cursor
      : Math.round((split.percent / 100) * shuffled.length);

    const group = shuffled.slice(cursor, cursor + count);
    cursor += count;

    for (const userId of group) {
      allocations.push({
        id: id("alloc"),
        assignmentId,
        userId,
        variantId: split.variantId,
        status: "assigned",
        assignedAt: now,
        startedAt: null,
        submittedAt: null,
        timeSpentMs: 0,
        completedScreenIds: [],
        notes: "",
      });
    }
  }

  return allocations;
}

export function previewSplitCounts(
  studentCount: number,
  splits: { variantId: string; percent: number }[]
): { variantId: string; count: number }[] {
  if (studentCount === 0 || splits.length === 0) return [];

  let cursor = 0;
  return splits.map((split, i) => {
    const isLast = i === splits.length - 1;
    const count = isLast
      ? studentCount - cursor
      : Math.round((split.percent / 100) * studentCount);
    cursor += count;
    return { variantId: split.variantId, count };
  });
}
