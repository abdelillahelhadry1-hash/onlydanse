"use client";

import Link from "next/link";

export default function CategoryNav() {
  const categories = [
    "Events",
    "Classes",
    "Workshops",
    "Festivals",
    "Instructors",
    "Studios",
  ];

  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-6 py-3 flex gap-6 text-sm font-medium text-gray-700">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/events?category=${cat.toLowerCase()}`}
            className="hover:text-black transition-colors"
          >
            {cat}
          </Link>
        ))}
      </div>
    </nav>
  );
}
