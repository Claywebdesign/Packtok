"use client";

import { useState } from "react";
import { productTabs } from "constants/navigation";
import {
  ProductStats,
  TopSellingProduct,
  MonthlyProductData,
  SalesAnalytics,
} from "types/analytics";
import Link from "next/link";
import { ProductStatsCards } from "./_components/product-stats-cards";
import { TopSellingProductsTable } from "./_components/top-selling-products-table";
import { MonthlyChart } from "./_components/monthly-chart";
import { SalesAnalyticsChart } from "./_components/sales-analytics-chart";

// Mock data - replace with real API calls
const mockProductStats: ProductStats = {
  totalProducts: 500874,
  newProductsToday: 1400,
  totalSales: 234888,
  newSalesToday: 1000,
};

const mockTopSellingProducts: TopSellingProduct[] = [
  {
    id: "1",
    name: "Corrugated machinery",
    price: 10,
    totalOrders: 34666,
    totalSales: 346660,
  },
  {
    id: "2",
    name: "Corrugated machinery",
    price: 15,
    totalOrders: 20000,
    totalSales: 300000,
  },
  {
    id: "3",
    name: "Corrugated machinery",
    price: 10,
    totalOrders: 15000,
    totalSales: 150000,
  },
  {
    id: "4",
    name: "Corrugated machinery",
    price: 12,
    totalOrders: 10000,
    totalSales: 120000,
  },
  {
    id: "5",
    name: "Corrugated machinery",
    price: 12,
    totalOrders: 10000,
    totalSales: 120000,
  },
  {
    id: "6",
    name: "Corrugated machinery",
    price: 12,
    totalOrders: 10000,
    totalSales: 120000,
  },
];

const mockMonthlyData: MonthlyProductData[] = [
  { month: "Jan", value: 23400 },
  { month: "Feb", value: 15000 },
  { month: "Mar", value: 30000 },
  { month: "Apr", value: 22000 },
  { month: "May", value: 10000 },
  { month: "Jun", value: 23400 },
  { month: "Jul", value: 5000 },
];

const mockSalesAnalytics: SalesAnalytics = {
  totalSales: 60,
  totalOrders: 70,
  ordersCanceled: 30,
};

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <div className="flex items-center space-x-4">
          <nav className="flex space-x-8">
            {productTabs.map((tab) => (
              <Link
                key={tab.value}
                href={tab.href}
                className={`text-sm font-medium transition-colors ${
                  activeTab === tab.value
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Stats Cards */}
      <ProductStatsCards stats={mockProductStats} />

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Selling Products Table */}
        <div className="lg:col-span-2">
          <TopSellingProductsTable products={mockTopSellingProducts} />
        </div>

        {/* Right Column - Charts */}
        <div className="space-y-6">
          <MonthlyChart data={mockMonthlyData} />
          <SalesAnalyticsChart data={mockSalesAnalytics} />
        </div>
      </div>
    </div>
  );
}
