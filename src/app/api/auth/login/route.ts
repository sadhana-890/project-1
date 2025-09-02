// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { signToken } from "@/lib/jwt";
import { getUsers, seedUsers } from "@/lib/mockUsers";

export async function POST(req: Request) {
  try {
    // Ensure mock users are seeded on server side
    seedUsers();
    
    const { email, password } = await req.json();
    console.log("Login route received:", { email, password });

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 });
    }

    // Find user in mock data
    const users = getUsers();
    console.log("Available users:", users.map(u => ({ email: u.email, role: u.role })));
    
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      console.log("User not found or password mismatch");
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    console.log("User found:", { id: user.id, email: user.email, role: user.role });

    // Create token with all required fields
    const tokenPayload = { 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      role: user.role 
    };
    
    console.log("Creating JWT with payload:", tokenPayload);
    const token = await signToken(tokenPayload);
    console.log("JWT token created successfully");

    const res = NextResponse.json({ success: true });

    res.cookies.set("token", token, {
      httpOnly: true, // prevent access from JS
      secure: process.env.NODE_ENV === "production", // use HTTPS in prod
      path: "/",
      sameSite: "lax", // prevents CSRF
      maxAge: 60 * 60, // 1 hour
    });

    return res;
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
