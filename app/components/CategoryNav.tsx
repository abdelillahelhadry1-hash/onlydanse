// app/components/CategoryNav.tsx

"use client";

import Link from "next/link";

export default function CategoryNav() {
  const categories = [
    { name: "Events", path: "/events" },
    { name: "Classes", path: "/classes" },
    { name: "Workshops", path: "/workshops" },
    { name: "Festivals", path: "/festivals" },
    { name: "Instructors", path: "/instructors" },
    { name: "Studios", path: "/studios" },
  ];

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-30">
      <div className="mx-auto max-w-7xl px-6 py-3 flex gap-6 text-sm font-medium text-gray-700">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.path}
            className="hover:text-black transition-colors"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
