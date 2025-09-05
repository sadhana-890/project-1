"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Menu, Search, Bell } from "lucide-react";

interface User {
  name: string;
  role: string;
}

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Header({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    // Simulate fetching user and notifications (replace with API call)
    setTimeout(() => {
      setUser({ name: "Mike", role: "Developer" });
      setNotifications(3); // example notifications
    }, 500);
  }, []);

  return (
    <header className="flex justify-between items-center px-2 sm:px-3 lg:px-4 py-2 bg-white sticky top-0 z-20">
      {/* Left Section - Mobile Menu + Search */}
      <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-1.5 rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4 text-gray-600" />
        </button>

        {/* Search Bar - Desktop & Tablet */}
        <div className="hidden sm:flex relative w-full max-w-[240px] md:max-w-[280px] lg:max-w-[350px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search App"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 md:h-9 w-full pl-8 pr-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-none text-sm"
          />
        </div>

        {/* Mobile Search - Expandable */}
        <div className="sm:hidden flex items-center">
          {!isSearchExpanded ? (
            <button
              onClick={() => setIsSearchExpanded(true)}
              className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-gray-600" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 flex-1">
              <div className="relative flex-1 max-w-[180px]">
                <Input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 w-full pl-3 pr-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-none text-sm"
                  autoFocus
                />
              </div>
              <button
                onClick={() => setIsSearchExpanded(false)}
                className="p-1 text-gray-500 hover:text-gray-700 text-xs"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Notifications + Profile */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 flex-shrink-0">
        {/* Notification Bell */}
        <button
          className="relative p-1.5 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4 text-gray-600" />
          {notifications > 0 && (
            <span className="absolute top-0.5 right-0.5 block w-1.5 h-1.5 rounded-full bg-red-500">
              <span className="sr-only">{notifications} notifications</span>
            </span>
          )}
        </button>

        {/* User Profile */}
        {user && (
          <div className="flex items-center space-x-1.5 sm:space-x-2 px-1.5 sm:px-2 py-1 border rounded-full cursor-pointer hover:bg-gray-50 transition-colors">
            {/* Avatar */}
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-medium">
                {user.name.charAt(0)}
              </span>
            </div>
            
            {/* User Info - Hidden on small mobile, shown on larger screens */}
            <div className="hidden md:flex flex-col leading-tight min-w-0">
              <span className="text-xs font-medium text-gray-900 truncate">
                {user.name}
              </span>
              <span className="text-xs text-gray-500 truncate">
                {user.role}
              </span>
            </div>

            {/* Show only name on medium mobile screens */}
            <div className="hidden sm:flex md:hidden flex-col leading-tight min-w-0">
              <span className="text-xs font-medium text-gray-900 truncate">
                {user.name}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}