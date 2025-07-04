"use client";

import { Heart, DollarSign, Gift, FileText } from "lucide-react";

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

interface DashboardStatsProps {
  statsData?: typeof stats;
}

export function DashboardStats({ statsData = stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat) => (
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
  );
}
