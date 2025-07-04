import { Button } from "@packtok/ui/components/button";
import { DashboardStats } from "./_components/dashboard-stats";
import { DashboardCharts } from "./_components/dashboard-charts";
import { DashboardTables } from "./_components/dashboard-tables";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="text-sm">
            May 2025 ▼
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <DashboardStats />

      {/* Charts and Tables Grid */}
      <DashboardCharts />

      {/* Recent Orders & Top Products */}
      <DashboardTables />
    </div>
  );
}
