"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const linkClasses = (active: boolean) =>
    `hover:text-black-600 ${active ? "text-black-600 font-bold" : ""}`;

  const isHomeActive = pathname === "/" || pathname.startsWith("/register");
  const isDocsActive = pathname === "/docs";
  const isDeveloperActive = pathname === "/login";

  return (
    <header className="px-6 sm:px-10 py-4">
      {/* Desktop layout */}
      <div className="hidden sm:flex items-center relative">
        {/* Logo (left) */}
        <div className="flex items-center gap-2">
          <Image src="/images/logo.svg" alt="logo" width={150} height={40} />
        </div>

        {/* Nav (centered) */}
        <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-6 font-medium text-base">
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

      {/* Mobile layout */}
      <div className="sm:hidden">
        {/* Logo (top row) */}
        <div className="flex items-center gap-2 mb-4">
          <Image src="/images/logo.svg" alt="logo" width={150} height={40} />
        </div>

        {/* Nav (bottom row) */}
        <nav className="flex justify-center gap-4 font-medium text-sm">
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
    </header>
  );
}