"use client";

import { ReactNode } from "react";
import Link from "next/link";

export default function HorizontalScroller({
  title,
  seeAllHref,
  children,
}: {
  title: string;
  seeAllHref?: string;
  children: ReactNode;
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {seeAllHref && (
          <Link href={seeAllHref} className="text-sm text-blue-600">
            See all
          </Link>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {children}
      </div>
    </section>
  );
}
