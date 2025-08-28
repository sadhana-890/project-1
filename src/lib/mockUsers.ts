export type Role = "user" | "admin" | "superadmin";

export interface MockUser {
  id: number;
  name: string;
  password: string;
  role: Role;
}

export let mockUsers: MockUser[] = [];
// lib/mockUsers.ts
export type UserRole = "user" | "admin" | "superadmin";

export interface User {
  id: number;
  name: string;
  role: UserRole;
  password: string;
}

// ✅ Seeding utility (mock DB)
let users: User[] = [];

export function seedUsers() {
  if (users.length === 0) {
    users = [
      { id: 1, name: "Alice", role: "user", password: "1234" },
      { id: 2, name: "Bob", role: "admin", password: "admin123" },
      { id: 3, name: "Charlie", role: "superadmin", password: "super123" },
    ];
    console.log("Mock users seeded ✅");
  }
}

export function getUsers() {
  return users;
}

export function findUser(name: string, password: string) {
  return users.find((u) => u.name === name && u.password === password);
}
