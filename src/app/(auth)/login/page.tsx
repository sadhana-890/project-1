"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const mockUsers = [
  { id: 1, name: "Alice", role: "user" as const, password: "1234" },
  { id: 2, name: "Bob", role: "admin" as const, password: "admin123" },
  { id: 3, name: "Charlie", role: "superadmin" as const, password: "super123" },
];

type LoginFormInputs = {
  name: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    const user = mockUsers.find(
      (u) => u.name === data.name && u.password === data.password
    );

    if (!user) {
      setError("name", { message: "Invalid credentials" });
      setError("password", { message: "Invalid credentials" });
      return;
    }

    try {
      const res = await axios.post("/api/auth/login", {
        id: user.id,
        name: user.name,
        role: user.role,
      });

      const result = res.data; // axios auto-parses JSON
      console.log("Login success:", result);

      if (user.role === "admin") {
        router.push("/admin");
      } else if (user.role === "superadmin") {
        router.push("/superadmin");
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      if (error.response) {
        setError("name", {
          message: error.response.data.error || "Login failed",
        });
      } else {
        setError("name", { message: error.message });
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="flex justify-between items-center px-10 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="text-xl font-bold text-purple-600">Superapp</span>
        </div>
        <nav className="flex gap-6 font-medium">
          <a href="#" className="hover:text-purple-600">
            Home
          </a>
          <a href="#" className="hover:text-purple-600">
            Docs
          </a>
          <a href="#" className="font-semibold hover:text-purple-600">
            Developer
          </a>
        </nav>
      </header>

      {/* Login Section */}
      <main className="flex flex-col items-center flex-1 px-40 mt-[60px]">
        <h1 className="text-3xl font-semibold text-center text-[#2d004d] mb-2">
          Log in to your Superapp Developer Account
        </h1>
        <p className="text-[10px] text-gray-500 text-center mb-6">
          From wallets to webhooks—get everything you need to build fast, secure,{" "}
          and fun blockchain-powered experiences
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-md bg-white"
        >
          <div className="flex justify-center">
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <Input
                type="text"
                className="w-[300px] shadow-none"
                {...register("name", { required: "Email is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                className="w-[300px] shadow-none"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-[100px] bg-purple-600 text-white hover:bg-purple-700"
            >
              Login
            </Button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="flex justify-between items-center px-10 py-6 text-sm text-gray-500 border-t">
        <span>Copyright © 2025 Superapp</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-purple-600">
            Terms and Conditions
          </a>
          <a href="#" className="hover:text-purple-600">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
