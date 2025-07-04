"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, useHasHydrated } from "../store/auth-store";

export default function HomePage() {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const hasHydrated = useHasHydrated();

  useEffect(() => {
    if (hasHydrated) {
      if (accessToken) {
        router.push("/dashboard");
      } else {
        router.push("/auth/signin");
      }
    }
  }, [hasHydrated, accessToken, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
