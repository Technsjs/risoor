"use client";

import { useEffect, useState } from "react";
import type { PlatformRepository } from "./repositories/types";
import { getPlatformRepository } from "./repositories/index";

export function usePlatformRepository(): PlatformRepository {
  const [repo] = useState(() => getPlatformRepository());
  return repo;
}

export function usePlatformStore() {
  const repo = usePlatformRepository();
  const [version, setVersion] = useState(0);

  const refresh = () => setVersion((v) => v + 1);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key?.startsWith("risoor_platform")) {
        refresh();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { repo, version, refresh };
}

export function formatDuration(ms: number) {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}
