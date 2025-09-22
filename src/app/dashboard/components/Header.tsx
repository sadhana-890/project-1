"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Header({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {
  const [notifications, setNotifications] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    // Simulate fetching notifications (replace with API call if needed)
    setTimeout(() => {
      setNotifications(3); // example notifications
    }, 500);
  }, []);

  return (
    <header className="flex justify-between items-center px-3 sm:px-4 lg:px-5 py-2 bg-white sticky top-0 z-20">
      {/* Left Section - Mobile Menu + Search */}
      <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-1.5 rounded-md hover:bg-gray-50 transition-colors flex-shrink-0 border-0 bg-transparent"
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
              className="p-1.5 rounded-md hover:bg-gray-50 transition-colors border-0 bg-transparent"
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
                className="p-1 text-gray-500 hover:text-gray-700 text-xs bg-transparent border-0"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Notifications + Profile */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
        {/* Notification Bell */}
        <button
          className="relative p-1.5 rounded-md hover:bg-gray-50 transition-colors border-0 bg-transparent"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4 text-gray-600" />
          {notifications > 0 && (
            <span className="absolute top-0.5 right-0.5 block w-1.5 h-1.5 rounded-full bg-red-500">
              <span className="sr-only">{notifications} notifications</span>
            </span>
          )}
        </button>

        {/* User Profile - Hardcoded Alice */}
        <div className="flex items-center gap-2 pl-2 pr-4 h-8 md:h-9 border border-gray-200 rounded-full cursor-pointer hover:bg-gray-50 transition-colors bg-white">
          {/* Avatar */}
          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
            <span className="text-gray-600 text-xs font-medium">A</span>
          </div>

          {/* User Info */}
          <div className="hidden sm:flex flex-col leading-none min-w-0">
            <span className="text-sm font-medium text-gray-900 truncate">Alice</span>
            <span className="text-xs text-gray-500 truncate">Developer</span>
          </div>

          {/* Dropdown Arrow */}
          <ChevronDown className="h-3 w-3 text-gray-400 flex-shrink-0" />
        </div>
      </div>
    </header>
  );
}
