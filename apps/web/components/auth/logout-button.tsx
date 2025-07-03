"use client";

import { useAuthStore } from "@/store/auth-store";
import { Button } from "@packtok/ui/components/button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LogoutButton() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleClick = async () => {
    await logout();
    toast.success("Logged out");
    router.push("/");
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className="text-sm font-medium"
    >
      Logout
    </Button>
  );
}
