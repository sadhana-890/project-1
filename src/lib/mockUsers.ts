// lib/mockUsers.ts
export type UserRole = "user" | "admin" | "superadmin";

export interface User {
  id: number;
  email: string;
  role: UserRole;
  password: string;
}

// ✅ Seeding utility (mock DB)
let users: User[] = [];

export function seedUsers() {
  if (users.length === 0) {
    users = [
      { id: 1, email: "alice@example.com", role: "user", password: "1234" },
      { id: 2, email: "bob@example.com", role: "admin", password: "admin123" },
      { id: 3, email: "charlie@example.com", role: "superadmin", password: "super123" },
    ];
    console.log("Mock users seeded ✅");
  }
}

export function getUsers() {
  return users;
}
