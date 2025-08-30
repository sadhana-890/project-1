"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface User {
  name: string;
  role: string;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<number>(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Simulate fetching user and notifications (replace with API call)
    setTimeout(() => {
      setUser({ name: "Mike", role: "Developer" });
      setNotifications(3); // example notifications
    }, 500);
  }, []);

  return (
    <header className="flex justify-between items-center px-4 py-0.6">
      {/* Left - Search */}
      <div className="flex items-center w-1/3">
        <div className="relative w-[320px]">
    <Image
        src="/icons/search.svg"
        alt="Search"
        width={18}
        height={18}
        className="absolute left-3 top-1/2 -translate-y-1/2"
    />

    <Input
        type="text"
        placeholder="Search App"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-12 w-[320px] pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-indigo-500 shadow-none"
    />
    </div>

      </div>

      {/* Right - Notifications + Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <div className="relative">
          <Image
          src="/icons/notification.svg"
          alt="Search"
          width={20}
          height={20} 
          className="w-6 h-6 text-gray-600 cursor-pointer" />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 block w-2.5 h-2.5 rounded-full bg-red-500"></span>
          )}
        </div>

        {/* User Profile */}
        {user && (
          <div className="flex items-center space-x-3 px-3 py-1 border rounded-full cursor-pointer hover:bg-gray-50">
            <div className="w-8 h-8 rounded-full bg-gray-300" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-gray-500">{user.role}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
