"use client";

import Protected from "@/components/auth/protected";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button } from "@packtok/ui/components/button";
import { Input } from "@packtok/ui/components/input";
import Link from "next/link";

export default function AccountPage() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading || !user) return null;

  return (
    <Protected>
      <div className="max-w-5xl mx-auto pb-20 pt-24 px-4">
        <h1 className="text-3xl font-bold mb-10 text-center">My Account</h1>
        <div className="grid md:grid-cols-3 gap-10">
          {/* Sidebar */}
          <aside className="bg-gray-100 rounded-lg p-6 space-y-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-semibold text-white">
                {user.name?.[0] ?? user.email[0]}
              </div>
              <h2 className="font-semibold">{user.name}</h2>
            </div>
            <nav className="space-y-4 text-sm">
              <span className="block font-medium text-primary">Account</span>
              <span className="block text-muted-foreground">Address</span>
              <span className="block text-muted-foreground">Orders</span>
              <span className="block text-muted-foreground">Wishlist</span>
              <Button variant="link" className="px-0" asChild>
                <Link href="/">Log Out</Link>
              </Button>
            </nav>
          </aside>

          {/* Details */}
          <section className="md:col-span-2 space-y-10">
            <div>
              <h3 className="text-lg font-semibold mb-4">Account Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  placeholder="First name"
                  value={user.name?.split(" ")[0] || ""}
                  readOnly
                />
                <Input
                  placeholder="Last name"
                  value={user.name?.split(" ").slice(1).join(" ") || ""}
                  readOnly
                />
                <Input
                  placeholder="Display name"
                  value={user.name || user.email}
                  readOnly
                  className="md:col-span-2"
                />
                <Input
                  placeholder="Email"
                  value={user.email}
                  readOnly
                  className="md:col-span-2"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </Protected>
  );
}
