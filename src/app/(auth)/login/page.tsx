"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/app/header/page";
import Footer from "@/app/footer/page";
import { Label } from "@/components/ui/label";


import { seedUsers, getUsers } from "@/lib/mockUsers";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  // Seed mock users once when app runs
  seedUsers();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>();

const onSubmit = async (data: LoginFormInputs) => {
  const users = getUsers();
  const user = users.find(
    (u) => u.email === data.email && u.password === data.password
  );

  if (!user) {
    setError("email", { message: "Invalid email or password" });
    setError("password", { message: "Invalid email or password" });
    return;
  }

  console.log("Login success:", user);

  // 🔑 Call login API to set JWT cookie
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: user.id,
      name: user.email, // or actual name if you add it
      role: user.role,
    }),
  });

  if (!res.ok) {
    console.error("Login API failed");
    return;
  }

  // ✅ Once cookie is set, then redirect
  if (user.role === "admin") {
    router.push("/admin");
  } else if (user.role === "superadmin") {
    router.push("/superadmin");
  } else {
    router.push("/dashboard");
  }
};


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center flex-1 px-6 sm:px-20 lg:px-40 mt-10 sm:mt-[60px]">
        <h1 className="text-3xl sm:text-4xl lg:text-[56px] font-semibold text-center text-[#060535] mb-2 leading-tight">
          Log in to your Superapp Developer Account
        </h1>
        <p className="text-base sm:text-lg lg:text-[18px] text-gray-500 text-center mb-6 px-2 sm:px-0">
          From wallets to webhooks—get everything you need to build fast, secure,
          and fun blockchain-powered experiences
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-md bg-white"
        >
          {/* Email field */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <Label className="block text-sm font-medium mb-1">Email Address</Label>
              <Input
                type="email"
                className="w-full sm:max-w-md md:max-w-lg h-12 px-4 border border-gray-300 rounded-md shadow-none"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Password field */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <Label className="block text-sm font-medium mb-1">Password</Label>
              <Input
                type="password"
                className="  w-full sm:max-w-md md:max-w-lg h-12 px-4 border border-gray-300 rounded-md shadow-none"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full sm:w-[120px] h-12 rounded-sm bg-[#8759FF] text-white hover:bg-purple-700"
            >
              Login
            </Button>

          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
