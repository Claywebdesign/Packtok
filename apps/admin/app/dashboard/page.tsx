"use client";

import {
  Heart,
  DollarSign,
  Gift,
  FileText,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@packtok/ui/components/button";

const stats = [
  {
    name: "Top Products",
    value: "178+",
    icon: Heart,
    color: "bg-purple-100 text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    name: "Stock Products",
    value: "20+",
    icon: DollarSign,
    color: "bg-green-100 text-green-600",
    bgColor: "bg-green-50",
  },
  {
    name: "Sales Products",
    value: "190+",
    icon: Gift,
    color: "bg-pink-100 text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    name: "Form Filled",
    value: "12+",
    icon: FileText,
    color: "bg-blue-100 text-blue-600",
    bgColor: "bg-blue-50",
  },
];

const recentOrders = [
  {
    id: "#87863",
    product: "Corrugated machinery",
    price: "$79",
    status: "Pending",
    total: "$146,880",
  },
  {
    id: "#87868",
    product: "Corrugated machinery",
    price: "$84",
    status: "Completed",
    total: "$59,860",
  },
  {
    id: "#87947",
    product: "Corrugated machinery",
    price: "$91",
    status: "Processing",
    total: "$146,875",
  },
  {
    id: "#87951",
    product: "Corrugated machinery",
    price: "$92",
    status: "Shipped",
    total: "$146,88",
  },
];

const topProducts = [
  { name: "Corrugated machinery", rating: 4, price: "$87", image: "🏭" },
  { name: "Corrugated machinery", rating: 3, price: "$987", image: "🏭" },
];

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className={`${stat.bgColor} p-6 rounded-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sales</h3>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Sales Chart Placeholder</p>
            </div>
          </div>
        </div>

        {/* Analytics Donut */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">80%</p>
                    <p className="text-xs text-gray-500">Transactions</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-8 h-8 bg-green-400 rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 bg-pink-400 rounded-full"></div>
            </div>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Sale</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Distribute</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Orders
            </h3>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-3">Tracking no</th>
                  <th className="pb-3">Product Name</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Total Order</th>
                  <th className="pb-3">Total Amount</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="py-3 text-sm">{order.id}</td>
                    <td className="py-3 text-sm">{order.product}</td>
                    <td className="py-3 text-sm">{order.price}</td>
                    <td className="py-3">
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm font-medium">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Top selling Products
            </h3>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                  {product.image}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xs ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
