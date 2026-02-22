import DashboardClient from "./DashboardClient";

export default function DashboardWrapper({ user, roles }: any) {
  return <DashboardClient user={user} roles={roles} />;
}
