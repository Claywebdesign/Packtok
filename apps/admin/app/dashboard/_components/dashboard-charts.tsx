"use client";

import { TrendingUp, MoreHorizontal } from "lucide-react";
import { Button } from "@packtok/ui/components/button";

export function DashboardCharts() {
  return (
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
  );
}