import type { PlatformStore } from "./types";

const DEMO_PASSWORD = "demo";

export const DEMO_INSTRUCTOR = {
  id: "user_instructor",
  email: "instructor@risoor.demo",
  name: "Alex Rivera",
  role: "instructor" as const,
  password: DEMO_PASSWORD,
};

export const DEMO_STUDENTS = Array.from({ length: 6 }, (_, i) => ({
  id: `user_student_${i + 1}`,
  email: `student${i + 1}@risoor.demo`,
  name: `Student ${i + 1}`,
  role: "student" as const,
  password: DEMO_PASSWORD,
}));

export const DEMO_ACCOUNTS = [DEMO_INSTRUCTOR, ...DEMO_STUDENTS];

export function createSeedStore(): PlatformStore {
  const now = new Date().toISOString();
  const courseId = "course_js_intro";

  const assignmentId = "assign_login_ui";
  const variantFacebook = "variant_facebook_login";
  const variantAmazon = "variant_amazon_login";

  return {
    users: DEMO_ACCOUNTS.map(({ password, ...user }) => ({ ...user, password })),
    courses: [
      {
        id: courseId,
        title: "Introduction to JavaScript",
        description:
          "Learn JavaScript fundamentals while building real UI patterns. Includes variables, functions, DOM basics, and async patterns.",
        topicIds: [
          "what-is-programming",
          "how-software-works",
          "javascript",
          "javascript-applied",
          "git",
        ],
        estimatedMonths: 6,
        instructorId: DEMO_INSTRUCTOR.id,
        createdAt: now,
      },
    ],
    enrollments: DEMO_STUDENTS.slice(0, 4).map((student, i) => ({
      id: `enroll_${i + 1}`,
      userId: student.id,
      courseId,
      status: i === 0 ? "in_progress" : "enrolled",
      enrolledAt: now,
      startedAt: i === 0 ? now : null,
      completedAt: null,
      timeSpentMs: i === 0 ? 45 * 60 * 1000 : 0,
    })),
    assignments: [
      {
        id: assignmentId,
        courseId,
        title: "Design a login flow",
        instructions:
          "Build a linear login screen flow for your assigned brand. Complete each screen step and add notes describing your design decisions.",
        type: "ui-design",
        createdAt: now,
      },
    ],
    assignmentVariants: [
      {
        id: variantFacebook,
        assignmentId,
        label: "Facebook-style login",
        screens: [
          {
            id: "screen_fb_1",
            title: "Hero / empty state",
            description: "Landing screen before login with brand identity.",
          },
          {
            id: "screen_fb_2",
            title: "Email + password form",
            description: "Primary login form with social sign-in options.",
          },
          {
            id: "screen_fb_3",
            title: "Error state",
            description: "Invalid credentials, validation errors, and retry.",
          },
          {
            id: "screen_fb_4",
            title: "Success / redirect",
            description: "Successful login feedback and redirect to feed.",
          },
        ],
      },
      {
        id: variantAmazon,
        assignmentId,
        label: "Amazon-style login",
        screens: [
          {
            id: "screen_amz_1",
            title: "Email entry",
            description: "Step 1: enter email or mobile number.",
          },
          {
            id: "screen_amz_2",
            title: "Password entry",
            description: "Step 2: password with show/hide toggle.",
          },
          {
            id: "screen_amz_3",
            title: "Error state",
            description: "Wrong password, locked account, or CAPTCHA.",
          },
          {
            id: "screen_amz_4",
            title: "Success / redirect",
            description: "Signed-in state and redirect to homepage.",
          },
        ],
      },
    ],
    assignmentAllocations: [
      {
        id: "alloc_1",
        assignmentId,
        userId: DEMO_STUDENTS[0].id,
        variantId: variantFacebook,
        status: "in_progress",
        assignedAt: now,
        startedAt: now,
        submittedAt: null,
        timeSpentMs: 20 * 60 * 1000,
        completedScreenIds: ["screen_fb_1", "screen_fb_2"],
        notes: "",
      },
      {
        id: "alloc_2",
        assignmentId,
        userId: DEMO_STUDENTS[1].id,
        variantId: variantAmazon,
        status: "assigned",
        assignedAt: now,
        startedAt: null,
        submittedAt: null,
        timeSpentMs: 0,
        completedScreenIds: [],
        notes: "",
      },
      {
        id: "alloc_3",
        assignmentId,
        userId: DEMO_STUDENTS[2].id,
        variantId: variantAmazon,
        status: "assigned",
        assignedAt: now,
        startedAt: null,
        submittedAt: null,
        timeSpentMs: 0,
        completedScreenIds: [],
        notes: "",
      },
      {
        id: "alloc_4",
        assignmentId,
        userId: DEMO_STUDENTS[3].id,
        variantId: variantAmazon,
        status: "assigned",
        assignedAt: now,
        startedAt: null,
        submittedAt: null,
        timeSpentMs: 0,
        completedScreenIds: [],
        notes: "",
      },
    ],
    studentProjects: [
      {
        id: "proj_1",
        userId: DEMO_STUDENTS[0].id,
        courseId,
        templateId: "web-saas",
        kind: "learning",
        status: "active",
        milestonesCompleted: ["Auth & onboarding"],
        selectedAt: now,
      },
    ],
  };
}

export const STORAGE_KEY = "risoor_platform_store_v1";
export const AUTH_KEY = "risoor_platform_auth_v1";
