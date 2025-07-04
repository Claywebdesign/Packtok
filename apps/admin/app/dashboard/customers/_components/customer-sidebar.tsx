"use client";

import { Button } from "@packtok/ui/components/button";
import { Mail, Phone, MapPin, MoreHorizontal } from "lucide-react";

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

        {/* Simple bar chart representation */}
        <div className="space-y-3">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, index) => {
            const height = [40, 60, 80, 30, 90, 50][index];
            return (
              <div
                key={month}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-600">{month}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-pink-500 h-2 rounded-full"
                      style={{ width: `${height}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Donut Chart */}
        <div className="mt-6 text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-700">70%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-1"></div>
              <span>60%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
