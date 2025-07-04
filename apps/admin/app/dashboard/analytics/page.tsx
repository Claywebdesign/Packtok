"use client";

import { useState, useMemo } from "react";
import { Button } from "@packtok/ui/components/button";
import { Input } from "@packtok/ui/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@packtok/ui/components/table";
import { productTabs } from "constants/navigation";
import {
  ProductStats,
  TopSellingProduct,
  MonthlyProductData,
  SalesAnalytics,
} from "types/analytics";
import {
  Package,
  TrendingUp,
  DollarSign,
  MoreHorizontal,
  Search,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

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

type SortField = "name" | "price" | "totalOrders" | "totalSales";
type SortDirection = "asc" | "desc";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("totalSales");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = mockTopSellingProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
      }
      if (typeof bValue === "string") {
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 ml-1" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1" />
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Product Analytics</h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4">
        {productTabs.map((tab) => (
          <Link key={tab.value} href={tab.href}>
            <Button
              variant={activeTab === tab.value ? "default" : "outline"}
              onClick={() => setActiveTab(tab.value)}
              className={
                activeTab === tab.value ? "bg-blue-600 text-white" : ""
              }
            >
              {tab.name}
              {tab.value === "add-product" && <span className="ml-2">+</span>}
            </Button>
          </Link>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Products Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm">Total Product</p>
              <p className="text-green-500 text-sm">
                +{mockProductStats.newProductsToday.toLocaleString()} New Added
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="relative">
            <h3 className="text-3xl font-bold text-gray-900">
              {mockProductStats.totalProducts.toLocaleString()}
            </h3>
            <div className="mt-4 h-32 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-end justify-center">
              <div className="w-full h-20 bg-gradient-to-t from-purple-700 to-purple-500 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Total Sales Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm">Total Sales</p>
              <p className="text-green-500 text-sm">
                +{mockProductStats.newSalesToday.toLocaleString()} Sales Today
              </p>
            </div>
            <div className="p-3 bg-pink-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-pink-600" />
            </div>
          </div>
          <div className="relative">
            <h3 className="text-3xl font-bold text-gray-900">
              {mockProductStats.totalSales.toLocaleString()}
            </h3>
            <div className="mt-4 h-32 bg-gradient-to-r from-pink-400 to-pink-600 rounded-lg flex items-end justify-center">
              <div className="w-full h-24 bg-gradient-to-t from-pink-700 to-pink-500 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Selling Products Table */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border-2 border-blue-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Top Selling Products
              </h3>
              <Button variant="ghost" size="sm" className="text-blue-600">
                See More
              </Button>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="py-3">SN</TableHead>
                  <TableHead className="py-3">
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                      onClick={() => handleSort("name")}
                    >
                      Name
                      <SortIcon field="name" />
                    </Button>
                  </TableHead>
                  <TableHead className="py-3">
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                      onClick={() => handleSort("price")}
                    >
                      Price
                      <SortIcon field="price" />
                    </Button>
                  </TableHead>
                  <TableHead className="py-3">
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                      onClick={() => handleSort("totalOrders")}
                    >
                      Total Order
                      <SortIcon field="totalOrders" />
                    </Button>
                  </TableHead>
                  <TableHead className="py-3">
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                      onClick={() => handleSort("totalSales")}
                    >
                      Total Sales
                      <SortIcon field="totalSales" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedProducts.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell className="py-3">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-pink-600 text-sm font-medium">
                          {index + 1}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-sm">
                      {product.name}
                    </TableCell>
                    <TableCell className="py-3 text-sm">
                      ${product.price}
                    </TableCell>
                    <TableCell className="py-3 text-sm">
                      {product.totalOrders.toLocaleString()} Piece
                    </TableCell>
                    <TableCell className="py-3 text-sm font-medium text-green-600">
                      ${product.totalSales.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right Side Charts */}
        <div className="space-y-6">
          {/* Product Add by Month */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Product Add by Month
            </h3>
            <div className="space-y-3">
              {mockMonthlyData.map((item) => (
                <div
                  key={item.month}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-gray-600">{item.month}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-pink-500 h-2 rounded-full"
                        style={{ width: `${(item.value / 30000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Sales Analytics */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Product Sales Analytics
              </h3>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                {/* Donut Chart - simplified representation */}
                <div className="w-32 h-32 rounded-full border-8 border-gray-200 relative">
                  <div
                    className="absolute inset-0 rounded-full border-8 border-blue-500"
                    style={{
                      background: `conic-gradient(#3b82f6 0deg ${(mockSalesAnalytics.totalSales / 100) * 360}deg, #10b981 ${(mockSalesAnalytics.totalSales / 100) * 360}deg ${((mockSalesAnalytics.totalSales + mockSalesAnalytics.totalOrders) / 100) * 360}deg, #f472b6 ${((mockSalesAnalytics.totalSales + mockSalesAnalytics.totalOrders) / 100) * 360}deg 360deg)`,
                      borderRadius: "50%",
                    }}
                  >
                    <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Total Sales</span>
                </div>
                <span>{mockSalesAnalytics.totalSales}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Total Order</span>
                </div>
                <span>{mockSalesAnalytics.totalOrders}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                  <span>Order Cancel</span>
                </div>
                <span>{mockSalesAnalytics.ordersCanceled}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
