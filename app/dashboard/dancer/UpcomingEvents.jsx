"use client";

import React from "react";

export function UpcomingEvents() {
  const events = [
    { id: 1, title: "Salsa Night", date: "Mar 12", location: "Porto Downtown", type: "Social" },
    { id: 2, title: "Kizomba Workshop", date: "Mar 15", location: "Bonfim Studio", type: "Workshop" },
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
      <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>Upcoming events</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {events.map((e) => (
          <div
            key={e.id}
            style={{
              padding: "10px 12px",
              borderRadius: "12px",
              background: "#020617",
              border: "1px solid #1f2937",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 500 }}>{e.title}</div>
              <div style={{ fontSize: "12px", color: "#9ca3af" }}>
                {e.date} • {e.location} • {e.type}
              </div>
            </div>
            <button
              style={{
                fontSize: "12px",
                padding: "6px 10px",
                borderRadius: "999px",
                border: "none",
                background: "#22c55e1a",
                color: "#4ade80",
                cursor: "pointer",
              }}
            >
              Attending
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
