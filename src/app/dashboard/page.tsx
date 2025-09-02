"use client"

import React from "react";
import { Bell, Plus, ChevronDown, } from "lucide-react";
import { metrics, apps, devLogs } from "@/lib/mockUsers";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// ---- Mock Data ------------------------------------

// ---- UI helpers -----------------------------------
const StatusPill: React.FC<{ status: "Active" | "Inactive" | "Paused" }> = ({ status }) => {
  const map = {
    Active: "🟢",
    Inactive: "🔴",
    Paused: "🟡",
  } as const;

  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ">
      {map[status]} {status}
    </span>
  );
};


 

const LogIcon: React.FC<{ type: "success" | "error" | "warning" }>=({ type })=>{
  if (type === "success") return "🟢";
  if (type === "warning") return "🟡" ;
  return "🔴";
};

// ---- Page -----------------------------------------
export default function Component() {
   const { user } = useAuth();

   // Debug: Log user data to see what's available
   console.log("Dashboard - User data:", user);
   console.log("Dashboard - User name:", user?.name);
   console.log("Dashboard - User email:", user?.email);
   console.log("Dashboard - User role:", user?.role);

   const appsMetrics = metrics.find(m => m.id === "apps");
   const consumptionMetrics = metrics.find(m => m.id === "consumption");
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-10  bg-white/80 backdrop-blur">
        <div className="flex items-center justify-between gap-4 px-6 py-4">
          <div>
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              Welcome, {user ? user.name : "Guest"}!
              {user?.role && (
                <Badge variant="secondary" className="capitalize">{user.role}</Badge>
              )}
            </h1>
            <p className="text-sm text-slate-500">Manage your dApps, API keys, wallet integrations, and spin game features—all in one place.</p>
          </div>

        </div>
      </header>

      <main className="mx-auto max-w-8xl px-6 py-6">
        {/* 2 column layout: left (2/3) + right (1/3) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          
          {/* Left side (summary cards + apps table) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Summary cards */}
<div className="flex gap-6">
  <div className="border bg-white px-3 py-5">
    <h3 className="text-sm font-medium text-slate-600">API Consumption & Rate Limits</h3> 
    <div className="mt-3">
      <p className="text-xl text-slate-600 font-semibold">{consumptionMetrics?.kpis[0].value} Consumption</p> 
      <p className="mt-1 text-xl text-slate-600 font-semibold">{consumptionMetrics?.kpis[1].value} API Calls Used</p>
    </div>
  </div>
  
  <div className="border bg-white px-3 py-5">
    <h3 className="text-sm font-medium text-slate-600">Active Apps and Engagement</h3> 
    <div className="mt-3">
      <p className="text-xl text-slate-600 font-semibold">{appsMetrics?.kpis[0].value} Active Apps</p> 
      <p className="mt-1 text-xl text-slate-600 font-semibold">{appsMetrics?.kpis[1].value} Users Engaged</p>
    </div>
  </div>
</div>

              

            {/* Apps Table */}
            <section>
              <div className="mb-3 flex items-center gap-3">
                <h2 className="text-lg font-semibold">Your Apps</h2>
                <Button className="inline-flex items-center gap-2 border-2  bg-[#8759FF] px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                  <Plus className="size-4" /> Create a New App
                </Button>
              </div>

              <div className="overflow-hidden rounded-2xl border shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-slate-500">
                      <th className="px-5 py-3 font-medium">App Name</th>
                      <th className="px-5 py-3 font-medium">Created On</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium">Total Users</th>
                      <th className="px-5 py-3 font-medium">Library</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {apps.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img src={app.logo} alt="logo" className="size-10 rounded-xl" />
                            <div className="font-medium">{app.name}</div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-600">{app.createdOn}</td>
                        <td className="px-5 py-4">
                          {/* Replace local pill with Badge */}
                          <Badge variant={app.status === "Active" ? "secondary" : "outline"} className="capitalize">
                            {app.status}
                          </Badge>
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {app.users.toLocaleString()} users
                        </td>
                        <td className="px-5 py-4">
                          <Badge variant="outline" className="capitalize">{app.library}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right side (logs only) */}
          <aside className="rounded-2xl border shadow-sm">
            <div className="border-b p-4">
              <h3 className="text-sm font-semibold">Latest Developer Logs</h3>
            </div>
            <ul>
              {devLogs.map((log) => (
                <li key={log.id} className="p-4">
                  <div className="flex items-start gap-3 rounded-2xl p-2 bg-[#184BFF1A] px-2 py-4 ">
                    {/* Log type badge */}
                    <Badge
                      className={
                        log.type === "success"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : log.type === "warning"
                          ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }
                      variant="outline"
                    >
                      {log.type}
                    </Badge>
                    <div >
                      <p className="text-sm font-medium leading-5">{log.title}</p>
                      <p className="mt-1 text-sm text-slate-700">{log.message}</p>
                      <p className="mt-2 text-sm text-slate-500">{log.time}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>

    </div>
  );
}