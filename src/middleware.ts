// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";

console.log("✅ Middleware file loaded");

export async function middleware(req: NextRequest) {
  console.log("✅ Middleware running on:", req.nextUrl.pathname);
  const pathname = req.nextUrl.pathname;

  const token = req.cookies.get("token")?.value;

  if (!token) {
    console.log("❌ No token → redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const payload = await verifyToken(token);
  if (!payload) {
    console.log("❌ Invalid token → redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { role } = payload;
  console.log("👤 Role:", role);

  // Role-based checks
// Role-based checks with strict access
if (pathname.startsWith("/admin") && role !== "admin") {
  return NextResponse.redirect(new URL("/dashboard", req.url));
}

if (pathname.startsWith("/superadmin") && role !== "superadmin") {
  return NextResponse.redirect(new URL("/dashboard", req.url));
}

if (pathname.startsWith("/dashboard") && role !== "user") {
  return NextResponse.redirect(new URL("/login", req.url));
}

  return NextResponse.next();
}

// Run middleware only on protected areas
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/superadmin/:path*"],
};
