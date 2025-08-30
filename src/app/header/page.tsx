import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


    export default function Header() {
        const pathname = usePathname();

    const linkClasses = (href: string) =>
    `hover:text-black-600 ${
      pathname === href ? "text-black-600 font-bold" : ""
    }`;
    return (
    <header className="flex items-center px-6 sm:px-10 py-4 relative">
      {/* Logo (left) */}
      <div className="flex items-center gap-2">
        <Image src="/images/logo.svg" alt="logo" width={150} height={40} />
      </div>

      {/* Nav (centered) */}
      <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-4 sm:gap-6 font-medium text-sm sm:text-base">
      <Link href="/" className={linkClasses("/")}>
        Home
      </Link>
      <Link href="/docs" className={linkClasses("/docs")}>
        Docs
      </Link>
      <Link href="/login" className={linkClasses("/login")}>
        Developer
      </Link>
    </nav>
    </header>
    );
    }