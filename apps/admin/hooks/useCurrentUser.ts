"use client";

import api from "../lib/axios";
import { useAuthStore } from "../store/auth-store";
import { User } from "../types/auth";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useCurrentUser() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const router = useRouter();

  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: async (): Promise<User> => {
      // Handle mock authentication
      // if (accessToken === "mock-admin-token") {
      //   return {
      //     id: "1",
      //     email: "founder@packtok.io",
      //     name: "Founder",
      //     role: "SUPER_ADMIN"
      //   };
      // }

      // Real API call
      const { data } = await api.get("/api/v1/auth/me");
      return data.data as User;
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  // Handle success/error using useEffect
  useEffect(() => {
    if (query.data) {
      // Check if user is admin or super admin
      if (query.data.role !== "ADMIN" && query.data.role !== "SUPER_ADMIN") {
        setAccessToken(null);
        setUser(null);
        router.push("/auth/signin");
        return;
      }
      setUser(query.data);
    }

    if (query.error) {
      setAccessToken(null);
      setUser(null);
      router.push("/auth/signin");
    }
  }, [query.data, query.error, setUser, setAccessToken, router]);

  return query;
}
