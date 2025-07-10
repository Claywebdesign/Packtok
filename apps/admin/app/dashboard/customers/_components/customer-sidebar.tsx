"use client";

import { Button } from "@packtok/ui/components/button";
import { Mail, Phone, MapPin, MoreHorizontal } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface CustomerDetail {
  name: string;
  title: string;
  email: string;
  phone: string;
  secondaryPhone: string;
  address: string;
}

interface CustomerSidebarProps {
  customer: CustomerDetail;
}

const performanceData = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 60 },
  { month: "Mar", value: 80 },
  { month: "Apr", value: 30 },
  { month: "May", value: 90 },
  { month: "Jun", value: 50 },
];

const pieData = [
  { name: "Active", value: 70, color: "#10B981" },
  { name: "Inactive", value: 30, color: "#E5E7EB" },
];

const COLORS = ["#10B981", "#E5E7EB"];

export function CustomerSidebar({ customer }: CustomerSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Selected Customer Info */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-lg">
              {customer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            {customer.name}
          </h3>
          <p className="text-gray-600 text-sm">{customer.title}</p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Contact Info</h4>

          <div className="flex items-center space-x-3 text-sm">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{customer.email}</span>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{customer.phone}</span>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{customer.secondaryPhone}</span>
          </div>

          <div className="flex items-start space-x-3 text-sm">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
            <span className="text-gray-600">{customer.address}</span>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Performance</h4>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Performance Bar Chart */}
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis hide />
              <Bar dataKey="value" fill="#EC4899" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="mt-6 text-center">
          <div className="h-24 w-24 mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 text-xs mt-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span>Active 70%</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-1"></div>
              <span>Inactive 30%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
