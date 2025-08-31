// lib/mockUsers.ts
export type UserRole = "user" | "admin" | "superadmin";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  password: string;
}

export const metrics = [
  { id: "apps", label: "Active Apps & User Engagement", kpis: [
    { label: "Active Apps", value: "2" },
    { label: "Users Engaged", value: "3,240" },
  ] },
  { id: "consumption", label: "API Consumption & Rate Limits", kpis: [
    { label: "Consumption", value: "3,500" },
    { label: "API Calls Used", value: "10,000" },
  ] },
];

export const apps = [
  {
    id: 1,
    name: "MovieAi",
    createdOn: "Feb 21, 2024",
    status: "Active" as const,
    users: 2310,
    library: "Public",
    logo: "https://dummyimage.com/40x40/1e1b4b/ffffff&text=M",
  },
  {
    id: 2,
    name: "Block Suggestion",
    createdOn: "Feb 21, 2024",
    status: "Active" as const,
    users: 2310,
    library: "Public",
    logo: "https://dummyimage.com/40x40/0f172a/ffffff&text=B",
  },
  {
    id: 3,
    name: "GPT 4.1",
    createdOn: "Feb 21, 2024",
    status: "Active" as const,
    users: 2310,
    library: "Public",
    logo: "https://dummyimage.com/40x40/064e3b/ffffff&text=G",
  },
];

export const devLogs = [
  {
    id: 101,
    type: "success" as const,
    title: 'App "Movie AI" responded to /movies command',
    message: "User requested Movie",
    time: "Today 10:30PM",
  },
  {
    id: 102,
    type: "error" as const,
    title: 'App "Blockchain" failed to respond to alerts command',
    message: "Error 504: Webhook timed out",
    time: "Today 10:30PM",
  },
  {
    id: 103,
    type: "warning" as const,
    title: 'App "GPT 4.1" was deactivated',
    message: "Reason: Developer manually disabled app",
    time: "Today 10:30PM",
  },
  {
    id: 104,
    type: "error" as const,
    title: "Failed API Key authentication attempt",
    message: "IP Address: 192.168.1.24",
    time: "Today 10:30PM",
  },
];

// ✅ Seeding utility (mock DB)
let users: User[] = [];

export function seedUsers() {
  if (users.length === 0) {
    users = [
      { id: 1,name:"alice", email: "alice@example.com", role: "user", password: "1234" },
      { id: 2,name:"bob", email: "bob@example.com", role: "admin", password: "admin123" },
      { id: 3,name:"charlie", email: "charlie@example.com", role: "superadmin", password: "super123" },
    ];
    console.log("Mock users seeded ✅");
  }
}

export function getUsers() {
  return users;
}
