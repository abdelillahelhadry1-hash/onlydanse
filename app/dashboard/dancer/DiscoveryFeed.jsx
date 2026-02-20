"use client";

import React from "react";

export function DiscoveryFeed() {
  const items = [
    { id: 1, type: "studio", text: "New studio near Bonfim: Kiz & Flow Studio" },
    { id: 2, type: "instructor", text: "New instructor in Porto: Ana Ribeiro (Urban Kiz)" },
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
      <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>Discovery</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "10px 12px",
              borderRadius: "12px",
              background: "#020617",
              border: "1px solid #1f2937",
              fontSize: "13px",
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
}
