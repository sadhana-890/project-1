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

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-6 lg:mb-10 p-2 lg:p-0">
        <Image
          src="/images/logo.svg"
          alt="Superapp Logo"
          width={150}
          height={40}
          className="w-[120px] lg:w-[150px] h-[32px] lg:h-[40px]"
        />
      </div>

      {/* Main Modules */}
      <div className="mb-6">
        <p className="text-xs font-light text-gray-400 mb-2 font-sans">MAIN MODULES</p>
        <ul className="space-y-2">
          {mainModules.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-purple-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="mr-3 flex-shrink-0"
                  />
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
        <ul className="space-y-2">
          {pages.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-purple-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="mr-3 flex-shrink-0"
                  />
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
      <div className="hidden lg:flex h-screen w-64 bg-white border-r p-4 flex-col fixed left-0 top-0 z-30">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar - Slide-out drawer */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-screen w-64 bg-white border-r p-4 flex flex-col transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <SidebarContent />
      </div>
    </>
  );
};