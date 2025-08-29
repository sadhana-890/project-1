// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();

  const mainModules = [
    { name: "Dashboard", icon: "/icons/dashboard.svg", path: "/" },
    { name: "API Keys", icon: "/icons/api-keys.svg", path: "/apikeys" },
  ];

  const pages = [
    { name: "Settings", icon: "/icons/settings.svg", path: "/settings" },
    { name: "Logout", icon: "/icons/logout.svg", path: "/logout" },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r p-4 flex flex-col">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-10">
        <Image
          src="/images/logo.svg"
          alt="Superapp Logo"
          width={150}
          height={36}
          priority
        />
    
      </div>

      {/* Main Modules */}
      <div className="mb-6">
        <p className="text-xs font-light text-gray-400 mb-2  font-sans">MAIN MODULES</p>
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
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="mr-3"
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Pages */}
      <div>
        <p className="text-xs font-light text-gray-400 mb-2  font-sans">PAGES</p>
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
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="mr-3"
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
