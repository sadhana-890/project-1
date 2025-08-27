"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Mock users for testing
const mockUsers = [
  { id: 1, name: "Alice", role: "user" as const, password: "1234" },
  { id: 2, name: "Bob", role: "admin" as const, password: "admin123" },
  { id: 3, name: "Charlie", role: "superadmin" as const, password: "super123" },
];

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ 1. Find matching user
    const user = mockUsers.find(
      (u) => u.name === name && u.password === password
    );

    if (!user) {
      setError("Invalid credentials");
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id, name: user.name, role: user.role }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Login failed");
      return;
    }

    
    if (user.role === "admin") {
  router.push("/admin");
} else if (user.role === "superadmin") {
  router.push("/superadmin");
} else {
  router.push("/dashboard"); // default user dashboard
}
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded space-y-4 w-80"
      >
        <h1 className="text-xl font-bold">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-2 py-1"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-2 py-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
