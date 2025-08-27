// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { id, name, role } = await req.json();

    // basic validation
    if (!id || !name ) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const token = await signToken({ id, name, role });

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
