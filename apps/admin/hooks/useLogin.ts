"use client";

import api from "../lib/axios";
import { useAuthStore } from "../store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface LoginPayload {
  email: string;
  password: string;
}

export function useLogin() {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      // Check for demo credentials first
      // if (payload.email === "founder@packtok.io" && payload.password === "ChangeMe!") {
      //   // Mock successful response for testing
      //   return {
      //     accessToken: "mock-admin-token",
      //     user: {
      //       id: "1",
      //       email: "founder@packtok.io",
      //       name: "Founder",
      //       role: "SUPER_ADMIN"
      //     }
      //   };
      // }

      // Try the real API
      try {
        const { data } = await api.post("/api/v1/auth/login", payload);

        // Handle both possible response formats from the documentation
        if (data.data) {
          // Format: { data: { accessToken, user } }
          return data.data as { accessToken: string; user: any };
        } else if (data.accessToken) {
          // Format: { accessToken, user }
          return data as { accessToken: string; user: any };
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (error) {
        console.error("API login failed:", error);
        throw error;
      }
    },
    onSuccess: ({ accessToken, user }) => {
      // Check if user is admin or super admin
      if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
        toast.error("Access denied. Admin privileges required.");
        return;
      }

      setAccessToken(accessToken);
      setUser(user);
      toast.success("Logged in successfully");
      router.push("/dashboard");
    },
    onError: (err: any) => {
      const message = err?.response?.data?.message || "Login failed";
      toast.error(message);
    },
  });
}
