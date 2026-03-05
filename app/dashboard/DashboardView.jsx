"use client";

import React from "react";
import { ROLES } from "./roles";
import { DancerDashboard } from "./dancer/DancerDashboard";

export function DashboardView({ role }) {
  const dashboards = {
    [ROLES.DANCER]: <DancerDashboard />,
    [ROLES.INSTRUCTOR]: <div>Instructor dashboard coming soon…</div>,
    [ROLES.ORGANIZER]: <div>Organizer dashboard coming soon…</div>,
    [ROLES.STUDIO]: <div>Studio dashboard coming soon…</div>,
  };

  return dashboards[role] ?? null;
}
