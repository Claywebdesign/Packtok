import Link from "next/link";
import { Button } from "@packtok/ui/components/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Category Not Found
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The category you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link href="/marketplace">
            <Button className="w-full sm:w-auto">Back to Marketplace</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
