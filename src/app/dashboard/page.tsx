"use client"

import React from "react";
import {  Plus } from "lucide-react";
import { metrics, apps, devLogs } from "@/lib/mockUsers";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ---- UI helpers -----------------------------------
const StatusPill: React.FC<{ status: "Active" | "Inactive" | "Paused" }> = ({ status }) => {
  const map = {
    Active: "🟢",
    Inactive: "🔴",
    Paused: "🟡",
  } as const;

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">
      {map[status]} {status}
    </span>
  );
};

const LogIcon: React.FC<{ type: "success" | "error" | "warning" }> = ({ type }) => {
  const emoji = type === "success" ? "🟢" : type === "warning" ? "🟡" : "🔴";
  return <span className="text-xs">{emoji}</span>; // Reduced emoji size
};

// ---- Page -----------------------------------------
export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();



  const appsMetrics = metrics.find(m => m.id === "apps");
  const consumptionMetrics = metrics.find(m => m.id === "consumption");

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <div>
            <h1 className="text-xl font-semibold flex items-center gap-2">
              Welcome, {user ? user.name : "Guest"}!
 
            </h1>
            <p className="text-xs text-slate-500">Manage your dApps, API keys, wallet integrations, and spin game features—all in one place.</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-8xl px-4 py-4">
        {/* 2 column layout: left (2/3) + right (1/3) */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          
          {/* Left side (summary cards + apps table) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* Summary cards */}
            <div className="flex gap-4">
              <div className="border bg-white px-3 py-3 rounded-lg">
                <h3 className="text-xs font-medium text-slate-600">API Consumption & Rate Limits</h3> 
                <div className="mt-2">
                  <p className="text-lg text-slate-600 font-semibold">{consumptionMetrics?.kpis[0].value} Consumption</p> 
                  <p className="mt-1 text-lg text-slate-600 font-semibold">{consumptionMetrics?.kpis[1].value} API Calls Used</p>
                </div>
              </div>
              
              <div className="border bg-white px-3 py-3 rounded-lg">
                <h3 className="text-xs font-medium text-slate-600">Active Apps and Engagement</h3> 
                <div className="mt-2">
                  <p className="text-lg text-slate-600 font-semibold">{appsMetrics?.kpis[0].value} Active Apps</p> 
                  <p className="mt-1 text-lg text-slate-600 font-semibold">{appsMetrics?.kpis[1].value} Users Engaged</p>
                </div>
              </div>
            </div>

            {/* Apps Table */}
            <section>
              <div className="mb-3 flex items-center gap-2">
                <h2 className="text-base font-semibold">Your Apps</h2>
                <Button size="sm" onClick={() => router.push("/dashboard/createNewApp")} >
                  <Plus className="size-3" /> Create a New App
                </Button>
              </div>

              <div className="overflow-hidden rounded-lg border shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 text-xs">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-slate-500">
                      <th className="px-3 py-2 font-medium">App Name</th>
                      <th className="px-3 py-2 font-medium">Created On</th>
                      <th className="px-3 py-2 font-medium">Status</th>
                      <th className="px-3 py-2 font-medium">Total Users</th>
                      <th className="px-3 py-2 font-medium">Library</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {apps.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50">
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <Image src={app.logo} alt="logo" width={32} height={32} className="size-8 rounded-lg" />
                            <div className="font-medium text-xs">{app.name}</div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-slate-600 text-xs">{app.createdOn}</td>
                        <td className="px-3 py-3">
                          <StatusPill status={app.status} />
                        </td>
                        <td className="px-3 py-3 text-slate-600 text-xs">
                          {app.users.toLocaleString()} users
                        </td>
                        <td className="px-3 py-3">
                          <span className="text-slate-600 capitalize text-xs">{app.library}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right side (logs only) */}
          <aside className="rounded-lg border shadow-sm">
            <div className="border-b p-3">
              <h3 className="text-xs font-semibold">Latest Developer Logs</h3>
            </div>
            <ul>
              {devLogs.map((log) => (
                <li key={log.id} className="p-3">
                  <div className="flex items-start gap-2 rounded-lg p-2 bg-[#184BFF1A] px-2 py-3">
                    {/* Log type badge with smaller emoji */}
                    <p>
                      <LogIcon type={log.type} />
                    </p>
                    <div>
                      <p className="text-xs font-medium leading-4">{log.title}</p>
                      <p className="mt-1 text-xs text-slate-700">{log.message}</p>
                      <p className="mt-1 text-xs text-slate-500">{log.time}</p>
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