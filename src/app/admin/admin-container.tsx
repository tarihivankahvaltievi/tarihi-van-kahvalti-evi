import { isAdminAuthenticated } from "./auth-helper";
import { getMenuData } from "@/app/menu/menu-storage";
import {
  getReservationData,
  getCalendarFeedToken,
} from "@/app/reservations/reservation-storage";
import { siteUrl } from "@/app/seo";
import { AdminLogin } from "./admin-login";
import { AdminDashboard } from "./admin-dashboard";

export async function AdminDashboardContainer() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return <AdminLogin />;
  }

  const [menuData, reservationData] = await Promise.all([
    getMenuData(),
    getReservationData(),
  ]);

  const baseUrl = siteUrl || "https://www.tarihivankahvaltievi.com";
  const feedToken = getCalendarFeedToken();
  const calendarFeedUrl = `${baseUrl}/api/reservations/calendar.ics?key=${feedToken}`;
  const webcalFeedUrl = calendarFeedUrl.replace(/^https?:\/\//i, "webcal://");

  return (
    <AdminDashboard
      initialData={menuData}
      initialReservations={reservationData}
      calendarFeedUrl={calendarFeedUrl}
      webcalFeedUrl={webcalFeedUrl}
    />
  );
}
