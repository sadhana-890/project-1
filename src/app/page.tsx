"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to SuperApp 🚀</h1>
      <p className="text-lg text-gray-600 mb-8">
        Manage everything in one place. Please log in to continue.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => router.push("/login")}>Login</Button>
        {/* Uncomment this later if you add registration */}
        {/* <Button variant="outline" onClick={() => router.push("/register")}>
          Sign Up
        </Button> */}
      </div>
    </div>
  );
}
