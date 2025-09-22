"use client";

import React from "react";
import { Bell, Plus } from "lucide-react";
import { metrics, apps, devLogs } from "@/lib/mockUsers";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// ---- UI helpers -----------------------------------
const StatusPill: React.FC<{ status: "Active" | "Inactive" | "Paused" }> = ({
  status,
}) => {
  const map = {
    Active: "🟢",
    Inactive: "🔴",
    Paused: "🟡",
  } as const;

  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium">
      {map[status]} {status}
    </span>
  );
};

const LogIcon: React.FC<{ type: "success" | "error" | "warning" }> = ({
  type,
}) => {
  if (type === "success") return "🟢";
  if (type === "warning") return "🟡";
  return "🔴";
};

// ---- Page -----------------------------------------
export default function Component() {
  const appsMetrics = metrics.find((m) => m.id === "apps");
  const consumptionMetrics = metrics.find((m) => m.id === "consumption");

  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur">
        <div className="flex items-center justify-between gap-3 px-5 py-3">
          <div>
            <h1 className="text-xl font-semibold">Welcome, Alice!</h1>
            <p className="text-xs text-slate-500">
              Manage your dApps, API keys, wallet integrations, and spin game
              features—all in one place.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-8xl px-3 py-5">
        {/* 2 column layout: left (1/2) + right (1/2) */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {/* Left side (summary cards + apps table) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {/* Summary cards */}
            <div className="flex gap-3">
              <div className="border bg-white px-2.5 py-4 flex-1">
                <h3 className="text-xs font-medium text-slate-600">
                  API Consumption & Rate Limits
                </h3>
                <div className="mt-2">
                  <p className="text-lg text-slate-600 font-semibold">
                    {consumptionMetrics?.kpis[0].value} Consumption
                  </p>
                  <p className="mt-0.5 text-lg text-slate-600 font-semibold">
                    {consumptionMetrics?.kpis[1].value} API Calls Used
                  </p>
                </div>
              </div>

              <div className="border bg-white px-2.5 py-4 flex-1">
                <h3 className="text-xs font-medium text-slate-600">
                  Active Apps and Engagement
                </h3>
                <div className="mt-2">
                  <p className="text-lg text-slate-600 font-semibold">
                    {appsMetrics?.kpis[0].value} Active Apps
                  </p>
                  <p className="mt-0.5 text-lg text-slate-600 font-semibold">
                    {appsMetrics?.kpis[1].value} Users Engaged
                  </p>
                </div>
              </div>
            </div>

            {/* Apps Table */}
            <section>
              <div className="mb-2.5 flex items-center gap-2.5">
                <h2 className="text-base font-semibold">Your Apps</h2>
                <Button
                  onClick={() => router.push("/dashboard/createNewApp")}
                  className="inline-flex items-center gap-1.5 border-2 bg-[#8759FF] px-2.5 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  <Plus className="size-3.5" /> Create a New App
                </Button>
              </div>

              <div className="overflow-hidden rounded-xl border shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 text-xs">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-slate-500">
                      <th className="px-4 py-2.5 font-medium">App Name</th>
                      <th className="px-4 py-2.5 font-medium">Created On</th>
                      <th className="px-4 py-2.5 font-medium">Status</th>
                      <th className="px-4 py-2.5 font-medium">Total Users</th>
                      <th className="px-4 py-2.5 font-medium">Library</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {apps.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={app.logo}
                              alt="logo"
                              className="size-8 rounded-lg"
                            />
                            <div className="font-medium text-sm">{app.name}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {app.createdOn}
                        </td>
                        <td className="px-4 py-3">
                          <StatusPill status={app.status} />
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {app.users.toLocaleString()} users
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs text-slate-700">
                            {app.library}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right side (logs only) */}
          <aside className="lg:col-span-1 rounded-xl border shadow-sm w-full">
            <div className="border-b p-3">
              <h3 className="text-sm font-semibold">Latest Developer Logs</h3>
            </div>
            <ul>
              {devLogs.map((log) => (
                <li key={log.id} className="p-2.5">
                  <div className="flex items-start gap-2 rounded-sm bg-[#184BFF1A] px-2 py-2.5">
                    <LogIcon type={log.type} />
                    <div>
                      <p className="text-xs font-medium leading-loose">
                        {log.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-700 leading-loose">
                        {log.message}
                      </p>
                      <p className="mt-2 text-xs text-slate-500">{log.time}</p>
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