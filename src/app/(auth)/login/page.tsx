"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/app/header/page";
import Footer from "@/app/footer/page";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

import { seedUsers, getUsers } from "@/lib/mockUsers";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Seed mock users once when app runs
  seedUsers();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginFormInputs) => {
    console.log("Login attempt:", data.email);

    // 🔑 Call login API with email and password
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      setError("email", { message: errorData.error || "Login failed" });
      setError("password", { message: errorData.error || "Login failed" });
      return;
    }

    // ✅ Login successful, redirect based on user role
    const users = getUsers();
    const user = users.find((u) => u.email === data.email);

    if (user) {
      if (user.role === "admin") {
        router.push("/admin");
      } else if (user.role === "superadmin") {
        router.push("/superadmin");
      } else {
        router.push("/dashboard");
      }
    } else {
      router.push("/dashboard"); // fallback
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <main className="flex flex-col items-center flex-1 px-4 sm:px-16 lg:px-32 mt-8 sm:mt-12">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-center text-[#060535] mb-1 leading-tight font-inter">
          Log in to your Superapp Developer Account
        </h1>
          <p className="text-sm sm:text-base lg:text-base text-gray-500 text-center mb-5 px-2 sm:px-0">
            From wallets to webhooks—get everything you need to build fast, secure,
            and fun blockchain-powered experiences
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 w-full max-w-sm bg-white"
          >
            {/* Email field */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <Label className="block text-xs font-medium mb-1">Email Address</Label>
                <Input
                  type="email"
                  className="w-full sm:max-w-sm md:max-w-md h-10 px-3 border border-gray-300 rounded-md shadow-none"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Password field with toggle */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <Label className="block text-xs font-medium mb-1">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="w-full sm:max-w-sm md:max-w-md h-10 px-3 pr-10 border border-gray-300 rounded-md shadow-none"
                    {...register("password", { required: "Password is required" })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-full sm:w-[100px] h-10 rounded-sm bg-[#8759FF] text-white hover:bg-purple-700"
              >
                Login
              </Button>
            </div>
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
}