import Link from "next/link";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-red-100 p-4">
        <h2 className="text-lg font-bold mb-4">SuperAdmin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/superadmin">Home</Link>
          <Link href="/superadmin/admins">Manage Admins</Link>
          <Link href="/superadmin/system">System Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
