"use client";

import React from "react";
import { ROLES } from "../dashboard/roles";

export function TopBar({ currentRole, onRoleChange }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div>
        <div style={{ fontSize: "18px", fontWeight: 600 }}>DanceFlow</div>
        <div style={{ fontSize: "12px", color: "#9ca3af" }}>Multi-role dance platform</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div>
          <label
            style={{
              fontSize: "11px",
              color: "#9ca3af",
              display: "block",
              marginBottom: "2px",
            }}
          >
            Current role
          </label>
          <select
            value={currentRole}
            onChange={(e) => onRoleChange(e.target.value)}
            style={{
              background: "#020617",
              color: "#f9fafb",
              borderRadius: "999px",
              padding: "6px 12px",
              border: "1px solid #374151",
              fontSize: "13px",
              outline: "none",
            }}
          >
            <option value={ROLES.DANCER}>Dancer</option>
            <option value={ROLES.INSTRUCTOR}>Instructor</option>
            <option value={ROLES.ORGANIZER}>Organizer</option>
            <option value={ROLES.STUDIO}>Studio</option>
          </select>
        </div>

        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          A
        </div>
      </div>
    </div>
  );
}
