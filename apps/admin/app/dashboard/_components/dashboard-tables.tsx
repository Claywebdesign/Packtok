"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@packtok/ui/components/button";

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

export function DashboardTables() {
  return (
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
  );
}