import { isAdminAuthenticated } from "./auth-helper";
import { getMenuData } from "@/app/menu/menu-storage";
import { AdminLogin } from "./admin-login";
import { AdminDashboard } from "./admin-dashboard";

export async function AdminDashboardContainer() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return <AdminLogin />;
  }

  const data = await getMenuData();

  return <AdminDashboard initialData={data} />;
}
