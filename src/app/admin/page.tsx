import { Suspense } from "react";
import { AdminDashboardContainer } from "./admin-container";

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f8efe0]">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-800 border-t-transparent" />
        </div>
      }
    >
      <AdminDashboardContainer />
    </Suspense>
  );
}
