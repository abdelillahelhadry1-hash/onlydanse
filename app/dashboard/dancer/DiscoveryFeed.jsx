"use client";

import React from "react";

export function DiscoveryFeed() {
  const items = [
    { id: 1, type: "studio", text: "New studio near Bonfim: Kiz & Flow Studio" },
    { id: 2, type: "instructor", text: "New instructor in Porto: Ana Ribeiro (Urban Kiz)" },
  ];

  return (
    <section className="bg-[#020617] rounded-2xl p-4 border border-gray-800">
      <h2 className="text-base font-semibold mb-3">Discovery</h2>
      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-xl bg-[#020617] border border-gray-800 text-sm"
          >
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
}

