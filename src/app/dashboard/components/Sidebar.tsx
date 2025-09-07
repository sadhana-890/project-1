"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import { X } from "lucide-react";

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const pathname = usePathname();

  const mainModules = [
    { name: "Dashboard", icon: "/icons/dashboard.svg", path: "/dashboard" },
    { name: "API Keys", icon: "/icons/api-keys.svg", path: "/apikeys" },
  ];

  const pages = [
    { name: "Settings", icon: "/icons/settings.svg", path: "/dashboard/settings" },
    { name: "Logout", icon: "/icons/logout.svg", path: "/logout" },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname, setIsMobileMenuOpen]);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobileMenuOpen]);

  // Helper function to check if dashboard should be active
  const isDashboardActive = (itemPath: string) => {
    if (itemPath === "/dashboard") {
      // Dashboard is active if:
      // 1. Current path is exactly /dashboard
      // 2. Current path starts with /dashboard/ (dashboard sub-pages)
      // 3. Current path is the create new app form (adjust path as needed)
      return pathname === "/dashboard" || 
             pathname.startsWith("/dashboard/") ||
             pathname === "/create-new-app" || // Adjust this path to match your actual route
             pathname === "/apps/create" ||    // Alternative path - adjust as needed
             pathname.includes("create-app");  // Fallback for any create app related paths
    }
    return false;
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-4 lg:mb-6 p-1 lg:p-0">
        <Image
          src="/images/logo.svg"
          alt="Superapp Logo"
          width={120}
          height={32}
          className="w-[100px] lg:w-[120px] h-[26px] lg:h-[32px]"
        />
      </div>

      {/* Main Modules */}
      <div className="mb-4">
        <p className="text-xs font-light text-gray-400 mb-2 font-sans">MAIN MODULES</p>
        <ul className="space-y-1">
          {mainModules.map((item) => {
            // Use custom logic for dashboard, regular logic for others
            const isActive = item.name === "Dashboard" 
              ? isDashboardActive(item.path)
              : pathname === item.path;
              
            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`flex items-center px-2 py-1.5 rounded text-sm transition ${
                    isActive
                      ? "bg-purple-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className={`mr-2 flex-shrink-0 w-4 h-4 ${
                    isActive ? 'brightness-0 invert bg-transparent' : ''
                  }`}>
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={16}
                      height={16}
                      className={`w-4 h-4 ${isActive ? 'mix-blend-multiply' : ''}`}
                    />
                  </div>
                  <span className="truncate">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Pages */}
      <div>
        <p className="text-xs font-light text-gray-400 mb-2 font-sans">PAGES</p>
        <ul className="space-y-1">
          {pages.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`flex items-center px-2 py-1.5 rounded text-sm transition ${
                    isActive
                      ? "bg-purple-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className={`mr-2 flex-shrink-0 w-4 h-4 ${
                    isActive ? 'brightness-0 invert' : ''
                  }`}>
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </div>
                  <span className="truncate">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar - Always visible on large screens */}
      <div className="hidden lg:flex h-screen w-56 bg-white border-r p-3 flex-col fixed left-0 top-0 z-30">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar - Slide-out drawer */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-screen w-56 bg-white border-r p-3 flex flex-col transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end mb-3">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        <SidebarContent />
      </div>
    </>
  );
};