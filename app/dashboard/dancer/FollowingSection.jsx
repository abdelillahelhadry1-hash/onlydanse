"use client";

import React from "react";

export function FollowingSection() {
  const following = {
    instructors: ["Chieh", "Maria Lopez"],
    studios: ["Porto Dance Hub", "Bonfim Kiz Studio"],
    events: ["Urban Kiz Festival"],
  };

  return (
    <section
      style={{
        background: "#020617",
        borderRadius: "16px",
        padding: "16px 18px",
        border: "1px solid #1f2937",
      }}
    >
      <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>Following</h2>

      <div style={{ marginBottom: "12px" }}>
        <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>Instructors</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {following.instructors.map((name) => (
            <span
              key={name}
              style={{
                fontSize: "12px",
                padding: "4px 8px",
                borderRadius: "999px",
                background: "#020617",
                border: "1px solid #1f2937",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>Studios</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {following.studios.map((name) => (
            <span
              key={name}
              style={{
                fontSize: "12px",
                padding: "4px 8px",
                borderRadius: "999px",
                background: "#020617",
                border: "1px solid #1f2937",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>Events</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {following.events.map((name) => (
            <span
              key={name}
              style={{
                fontSize: "12px",
                padding: "4px 8px",
                borderRadius: "999px",
                background: "#020617",
                border: "1px solid #1f2937",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
