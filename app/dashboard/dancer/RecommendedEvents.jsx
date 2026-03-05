"use client";

import React from "react";

export function RecommendedEvents() {
  const recs = [
    { id: 1, title: "Bachata Sensual Intensive", match: "Based on Chieh & Porto Dance Hub" },
    { id: 2, title: "Urban Kiz Social Night", match: "Similar to events you follow" },
  ];

  return (
    <section className="bg-[#020617] rounded-2xl p-4 border border-gray-800">
      <h2 className="text-base font-semibold mb-3">Recommended for you</h2>

      <div className="flex flex-col gap-2.5">
        {recs.map((e) => (
          <div
            key={e.id}
            className="p-3 rounded-xl bg-[#020617] border border-gray-800"
          >
            <div className="font-medium">{e.title}</div>
            <div className="text-xs text-gray-400">{e.match}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
