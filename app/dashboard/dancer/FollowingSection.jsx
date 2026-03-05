"use client";

import React from "react";

export function FollowingSection() {
  const following = {
    instructors: ["Chieh", "Maria Lopez"],
    studios: ["Porto Dance Hub", "Bonfim Kiz Studio"],
    events: ["Urban Kiz Festival"],
  };

  const renderGroup = (label, items) => (
    <div className="mb-3">
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((name) => (
          <span
            key={name}
            className="text-xs px-2 py-1 rounded-full bg-[#020617] border border-gray-800"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section className="bg-[#020617] rounded-2xl p-4 border border-gray-800">
      <h2 className="text-base font-semibold mb-3">Following</h2>

      {renderGroup("Instructors", following.instructors)}
      {renderGroup("Studios", following.studios)}
      {renderGroup("Events", following.events)}
    </section>
  );
}
