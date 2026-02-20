"use client";

import React from "react";

export function MainLayout({ topBar, sidebar, children }) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#020617",
        color: "#f9fafb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "260px",
          borderRight: "1px solid #1f2937",
          padding: "16px 12px",
          background: "#020617",
        }}
      >
        {sidebar}
      </div>

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <div
          style={{
            height: "64px",
            borderBottom: "1px solid #1f2937",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            background: "#020617",
          }}
        >
          {topBar}
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            padding: "24px",
            overflowY: "auto",
            background: "radial-gradient(circle at top, #020617 0, #020617 40%, #020617 100%)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
