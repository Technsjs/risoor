import { createFirebaseRepository, isFirebaseConfigured } from "./firebase-store";
import { createMockRepository, getPlatformRepository as getMockRepo } from "./mock-store";
import type { PlatformRepository } from "./types";

export type { PlatformRepository } from "./types";

/**
 * Returns the active platform repository.
 * Uses Firebase when env vars are set; otherwise mock localStorage store.
 */
export function getPlatformRepository(): PlatformRepository {
  if (isFirebaseConfigured()) {
    return createFirebaseRepository();
  }
  return getMockRepo();
}

export { createMockRepository, createFirebaseRepository, isFirebaseConfigured };
