// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { id, email,name,role } = await req.json();
    console.log("Login route received:", { id, name,email, role });

    // basic validation
    if (!id || !email ) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const token = await signToken({ id, email,name, role });

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
