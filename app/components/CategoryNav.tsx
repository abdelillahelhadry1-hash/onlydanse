"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryNav() {
  const pathname = usePathname();

  const categories = [
    { name: "Events", href: "/events" },
    { name: "Classes", href: "/classes" },
    { name: "Workshops", href: "/workshops" },
    { name: "Festivals", href: "/festivals" },
    { name: "Instructors", href: "/instructors" },
    { name: "Studios", href: "/studios" },
  ];

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-30 mb-6">
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-center gap-6 overflow-x-auto">
        {categories.map((cat) => {
          const active = pathname.startsWith(cat.href);

          return (
            <Link
              key={cat.href}
              href={cat.href}
              className={`text-sm font-medium whitespace-nowrap transition-colors ${
                active ? "text-black border-b-2 border-black pb-1" : "text-gray-600 hover:text-black"
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
