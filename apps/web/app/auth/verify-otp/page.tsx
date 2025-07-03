import VerifyOtpForm from "@/components/auth/verify-otp-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground mb-4">Verify OTP</h1>
      <Suspense fallback={null}>
        <VerifyOtpForm />
      </Suspense>
    </main>
  );
}
