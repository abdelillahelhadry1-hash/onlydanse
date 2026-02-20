"use client";

import React from "react";

export function RecommendedEvents() {
  const recs = [
    { id: 1, title: "Bachata Sensual Intensive", match: "Based on Chieh & Porto Dance Hub" },
    { id: 2, title: "Urban Kiz Social Night", match: "Similar to events you follow" },
  ];

  return (
    <section
      style={{
        background: "#020617",
        borderRadius: "16px",
        padding: "16px 18px",
        border: "1px solid #1f2937",
      }}
    >
      <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>Recommended for you</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {recs.map((e) => (
          <div
            key={e.id}
            style={{
              padding: "10px 12px",
              borderRadius: "12px",
              background: "#020617",
              border: "1px solid #1f2937",
            }}
          >
            <div style={{ fontWeight: 500 }}>{e.title}</div>
            <div style={{ fontSize: "12px", color: "#9ca3af" }}>{e.match}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
