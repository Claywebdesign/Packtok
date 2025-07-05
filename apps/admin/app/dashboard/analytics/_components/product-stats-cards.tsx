"use client";

import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Package, TrendingUp, DollarSign } from 'lucide-react';
import { ProductStats } from 'types/analytics';

interface ProductStatsCardsProps {
  stats: ProductStats;
}

const miniChartData = [
  { value: 20 }, { value: 30 }, { value: 25 }, { value: 40 }, { value: 35 }, { value: 50 }, { value: 45 }
];

export function ProductStatsCards({ stats }: ProductStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {/* Total Products Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-600 text-sm">Total Products</p>
            <p className="text-green-500 text-sm">
              +{stats.newProductsToday.toLocaleString()} Today
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="relative">
          <h3 className="text-3xl font-bold text-gray-900">
            {stats.totalProducts.toLocaleString()}
          </h3>
          <div className="mt-4 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniChartData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* New Products Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-600 text-sm">New Products</p>
            <p className="text-green-500 text-sm">This Month</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <TrendingUp className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <div className="relative">
          <h3 className="text-3xl font-bold text-gray-900">
            {stats.newProductsToday.toLocaleString()}
          </h3>
          <div className="mt-4 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniChartData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Total Sales Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-600 text-sm">Total Sales</p>
            <p className="text-green-500 text-sm">
              +{stats.newSalesToday.toLocaleString()} Sales Today
            </p>
          </div>
          <div className="p-3 bg-pink-100 rounded-lg">
            <DollarSign className="h-6 w-6 text-pink-600" />
          </div>
        </div>
        <div className="relative">
          <h3 className="text-3xl font-bold text-gray-900">
            ${stats.totalSales.toLocaleString()}
          </h3>
          <div className="mt-4 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniChartData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#EC4899" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}