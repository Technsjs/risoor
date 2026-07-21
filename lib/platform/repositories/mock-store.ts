import { distributeAssignment } from "../assignment-distribution";
import { createSeedStore, STORAGE_KEY } from "../seed-data";
import type {
  Assignment,
  AssignmentAllocation,
  AssignmentRule,
  AssignmentVariant,
  Course,
  Enrollment,
  PlatformStore,
  StudentProject,
  User,
} from "../types";
import type { PlatformRepository } from "./types";

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

let memoryStore: PlatformStore | null = null;

function loadFromStorage(): PlatformStore | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PlatformStore;
  } catch {
    return null;
  }
}

function persist(store: PlatformStore) {
  memoryStore = store;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
}

function getStoreInternal(): PlatformStore {
  if (memoryStore) return memoryStore;
  const stored = loadFromStorage();
  if (stored) {
    memoryStore = stored;
    return stored;
  }
  const seed = createSeedStore();
  persist(seed);
  return seed;
}

export function createMockRepository(): PlatformRepository {
  return {
    getStore() {
      return getStoreInternal();
    },

    resetStore() {
      persist(createSeedStore());
    },

    getUsers() {
      return getStoreInternal().users;
    },

    getUserById(id) {
      return getStoreInternal().users.find((u) => u.id === id);
    },

    getUserByEmail(email) {
      return getStoreInternal().users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
    },

    getStudents() {
      return getStoreInternal().users.filter((u) => u.role === "student");
    },

    getCourses() {
      return getStoreInternal().courses;
    },

    getCourseById(id) {
      return getStoreInternal().courses.find((c) => c.id === id);
    },

    getCoursesByInstructor(instructorId) {
      return getStoreInternal().courses.filter(
        (c) => c.instructorId === instructorId
      );
    },

    createCourse(data) {
      const store = getStoreInternal();
      const course: Course = {
        ...data,
        id: id("course"),
        createdAt: new Date().toISOString(),
      };
      store.courses.push(course);
      persist(store);
      return course;
    },

    updateCourse(id, data) {
      const store = getStoreInternal();
      const idx = store.courses.findIndex((c) => c.id === id);
      if (idx === -1) return undefined;
      store.courses[idx] = { ...store.courses[idx], ...data };
      persist(store);
      return store.courses[idx];
    },

    getEnrollments() {
      return getStoreInternal().enrollments;
    },

    getEnrollmentsByCourse(courseId) {
      return getStoreInternal().enrollments.filter(
        (e) => e.courseId === courseId
      );
    },

    getEnrollmentsByUser(userId) {
      return getStoreInternal().enrollments.filter((e) => e.userId === userId);
    },

    enrollStudents(courseId, userIds) {
      const store = getStoreInternal();
      const now = new Date().toISOString();
      const created: Enrollment[] = [];

      for (const userId of userIds) {
        const exists = store.enrollments.some(
          (e) => e.courseId === courseId && e.userId === userId
        );
        if (exists) continue;
        const enrollment: Enrollment = {
          id: id("enroll"),
          userId,
          courseId,
          status: "enrolled",
          enrolledAt: now,
          startedAt: null,
          completedAt: null,
          timeSpentMs: 0,
        };
        store.enrollments.push(enrollment);
        created.push(enrollment);
      }

      persist(store);
      return created;
    },

    unenrollStudent(courseId, userId) {
      const store = getStoreInternal();
      store.enrollments = store.enrollments.filter(
        (e) => !(e.courseId === courseId && e.userId === userId)
      );
      persist(store);
    },

    updateEnrollment(id, data) {
      const store = getStoreInternal();
      const idx = store.enrollments.findIndex((e) => e.id === id);
      if (idx === -1) return undefined;
      store.enrollments[idx] = { ...store.enrollments[idx], ...data };
      persist(store);
      return store.enrollments[idx];
    },

    recordEnrollmentTime(enrollmentId, deltaMs) {
      const store = getStoreInternal();
      const enrollment = store.enrollments.find((e) => e.id === enrollmentId);
      if (!enrollment) return;
      enrollment.timeSpentMs += deltaMs;
      if (enrollment.status === "enrolled") {
        enrollment.status = "in_progress";
      }
      persist(store);
    },

    markEnrollmentStarted(enrollmentId) {
      const store = getStoreInternal();
      const enrollment = store.enrollments.find((e) => e.id === enrollmentId);
      if (!enrollment || enrollment.startedAt) return;
      enrollment.startedAt = new Date().toISOString();
      if (enrollment.status === "enrolled") {
        enrollment.status = "in_progress";
      }
      persist(store);
    },

    getAssignments() {
      return getStoreInternal().assignments;
    },

    getAssignmentsByCourse(courseId) {
      return getStoreInternal().assignments.filter(
        (a) => a.courseId === courseId
      );
    },

    getAssignmentById(id) {
      return getStoreInternal().assignments.find((a) => a.id === id);
    },

    createAssignmentWithVariants(assignmentData, variantData, rule) {
      const store = getStoreInternal();
      const assignment: Assignment = {
        ...assignmentData,
        id: id("assign"),
        createdAt: new Date().toISOString(),
      };
      store.assignments.push(assignment);

      const variants: AssignmentVariant[] = variantData.map((v) => ({
        ...v,
        id: id("variant"),
        assignmentId: assignment.id,
      }));
      store.assignmentVariants.push(...variants);

      const enrolledIds = store.enrollments
        .filter((e) => e.courseId === assignment.courseId)
        .map((e) => e.userId);

      const resolvedRule: AssignmentRule = {
        ...rule,
        defaultVariantId: rule.defaultVariantId ?? variants[0]?.id,
        splits:
          rule.mode === "split" && rule.splits
            ? rule.splits.map((split, i) => ({
                variantId: split.variantId || variants[i]?.id || variants[0]?.id || "",
                percent: split.percent,
              }))
            : rule.splits,
      };

      const allocations = distributeAssignment(
        enrolledIds,
        resolvedRule,
        variants,
        assignment.id
      );
      store.assignmentAllocations.push(...allocations);
      persist(store);

      return { assignment, variants, allocations };
    },

    getVariantsByAssignment(assignmentId) {
      return getStoreInternal().assignmentVariants.filter(
        (v) => v.assignmentId === assignmentId
      );
    },

    getVariantById(id) {
      return getStoreInternal().assignmentVariants.find((v) => v.id === id);
    },

    getAllocations() {
      return getStoreInternal().assignmentAllocations;
    },

    getAllocationsByAssignment(assignmentId) {
      return getStoreInternal().assignmentAllocations.filter(
        (a) => a.assignmentId === assignmentId
      );
    },

    getAllocationForUser(assignmentId, userId) {
      return getStoreInternal().assignmentAllocations.find(
        (a) => a.assignmentId === assignmentId && a.userId === userId
      );
    },

    updateAllocation(id, data) {
      const store = getStoreInternal();
      const idx = store.assignmentAllocations.findIndex((a) => a.id === id);
      if (idx === -1) return undefined;
      store.assignmentAllocations[idx] = {
        ...store.assignmentAllocations[idx],
        ...data,
      };
      persist(store);
      return store.assignmentAllocations[idx];
    },

    recordAllocationTime(allocationId, deltaMs) {
      const store = getStoreInternal();
      const allocation = store.assignmentAllocations.find(
        (a) => a.id === allocationId
      );
      if (!allocation) return;
      allocation.timeSpentMs += deltaMs;
      if (allocation.status === "assigned") {
        allocation.status = "in_progress";
      }
      persist(store);
    },

    getStudentProjects() {
      return getStoreInternal().studentProjects;
    },

    getStudentProjectsByUser(userId, courseId) {
      return getStoreInternal().studentProjects.filter(
        (p) =>
          p.userId === userId && (courseId ? p.courseId === courseId : true)
      );
    },

    selectProject(data) {
      const store = getStoreInternal();
      const existing = store.studentProjects.find(
        (p) =>
          p.userId === data.userId &&
          p.courseId === data.courseId &&
          p.kind === data.kind
      );
      if (existing) {
        existing.templateId = data.templateId;
        existing.selectedAt = new Date().toISOString();
        existing.status = "active";
        existing.milestonesCompleted = [];
        persist(store);
        return existing;
      }

      const project: StudentProject = {
        ...data,
        id: id("proj"),
        status: "active",
        milestonesCompleted: [],
        selectedAt: new Date().toISOString(),
      };
      store.studentProjects.push(project);
      persist(store);
      return project;
    },

    updateStudentProject(id, data) {
      const store = getStoreInternal();
      const idx = store.studentProjects.findIndex((p) => p.id === id);
      if (idx === -1) return undefined;
      store.studentProjects[idx] = { ...store.studentProjects[idx], ...data };
      persist(store);
      return store.studentProjects[idx];
    },
  };
}

let repoInstance: PlatformRepository | null = null;

export function getPlatformRepository(): PlatformRepository {
  if (!repoInstance) {
    repoInstance = createMockRepository();
  }
  return repoInstance;
}
