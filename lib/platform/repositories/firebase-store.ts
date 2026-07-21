import type { PlatformRepository } from "./types";

/**
 * Firebase-backed repository — swap-in when credentials are provided.
 *
 * Required env vars (see .env.local.example):
 *   NEXT_PUBLIC_FIREBASE_API_KEY
 *   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
 *   NEXT_PUBLIC_FIREBASE_PROJECT_ID
 *   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
 *   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
 *   NEXT_PUBLIC_FIREBASE_APP_ID
 *
 * Install: npm install firebase
 * Then implement PlatformRepository against Firestore collections:
 *   users, courses, enrollments, assignments, assignmentVariants,
 *   assignmentAllocations, studentProjects
 */
export function createFirebaseRepository(): PlatformRepository {
  throw new Error(
    "Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* env vars and implement createFirebaseRepository(), or continue using the mock store."
  );
}

export function isFirebaseConfigured(): boolean {
  return Boolean(
    typeof process !== "undefined" &&
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
}
