"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  // Mock user data - replace with your actual user data source
  const user = {
    name: "John Doe",
    role: "Developer"
  };
  
  const linkClasses = (active: boolean) =>
    `hover:text-black-600 ${active ? "text-black-600 font-bold" : ""}`;
  
  const isHomeActive = pathname === "/" || pathname.startsWith("/register");
  const isDocsActive = pathname === "/docs";
  const isDeveloperActive = pathname === "/login";
  const isLeaderboardPage = pathname.includes("leaderboard");
  
  return (
    <header className="px-6 sm:px-10 py-4">
      {/* Desktop layout */}
      <div className="hidden sm:flex items-center">
        {/* Logo (left) - Fixed width container */}
        <div className="flex items-center gap-2 w-1/3">
          <Image src="/images/logo.svg" alt="logo" width={150} height={40} />
        </div>

        {/* Nav (centered) - Fixed width container */}
        <div className="w-1/3 flex justify-center">
          <nav className="flex gap-6 font-medium text-base">
            <Link href="/" className={linkClasses(isHomeActive)}>
              Home
            </Link>
            <Link href="/docs" className={linkClasses(isDocsActive)}>
              Docs
            </Link>
            <Link href="/login" className={linkClasses(isDeveloperActive)}>
              Developer
            </Link>
          </nav>
        </div>

        {/* User Profile - Fixed width container (right) */}
        <div className="w-1/3 flex justify-end">
          {isLeaderboardPage && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-purple-500 rounded-full cursor-pointer transition-colors">
              {/* Avatar */}
              <div className="w-8 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">
                  M
                </span>
              </div>
              
              {/* User Info */}
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-sm font-medium text-white truncate">
                  Mike
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="sm:hidden">
        {/* Logo and User Profile Row */}
        <div className="flex items-center justify-between mb-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/images/logo.svg" alt="logo" width={150} height={40} />
          </div>

          {/* User Profile - Only show on leaderboard page (mobile) */}
          {isLeaderboardPage && (
            <div className="flex items-center space-x-2 px-2 py-1 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-50 transition-colors bg-white">
              {/* Avatar */}
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-medium">
                  J
                </span>
              </div>
              
              {/* User Name Only on Mobile */}
              <span className="text-xs font-medium text-gray-900 truncate">
                John Doe
              </span>
            </div>
          )}
        </div>

        {/* Nav (bottom row) - Centered */}
        <div className="flex justify-center">
          <nav className="flex gap-4 font-medium text-sm">
            <Link href="/" className={linkClasses(isHomeActive)}>
              Home
            </Link>
            <Link href="/docs" className={linkClasses(isDocsActive)}>
              Docs
            </Link>
            <Link href="/login" className={linkClasses(isDeveloperActive)}>
              Developer
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}