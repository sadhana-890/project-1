import "server-only";

import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET;
console.log("JWT_SECRET:", process.env.JWT_SECRET);

;
if (!secretKey) {
  throw new Error("JWT_SECRET is not defined in .env.local");
}
const secret = new TextEncoder().encode(secretKey);

// keep the same role union as your AuthContext to avoid type errors
type Role = "user" | "admin" | "superadmin";

export async function signToken(payload: { id: number; name: string;email:string; role: Role }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    // Cast to your shape; in a real app you’d validate
    return payload as { id: number; name: string;email:string, role: Role };
  } catch {
    return null;
  }
}
