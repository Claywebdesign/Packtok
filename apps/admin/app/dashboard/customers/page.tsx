"use client";
import { Button } from "@packtok/ui/components/button";
import { productTabs } from "../../../constants/navigation";
import Link from "next/link";
import { CustomersTable } from "./_components/customers-table";
import { CustomerSidebar } from "./_components/customer-sidebar";

// Mock customer data - in real app this would come from fetchJson
const mockCustomers = [
  {
    id: "1",
    name: "Arrora gaur",
    email: "arroragaur@gmail.com",
    phone_number: "+49 587 2547",
    gender: "Male" as const,
    role: "NORMAL_USER" as const,
    avatar: "/api/placeholder/40/40",
  },
  {
    id: "2",
    name: "James Mullican",
    email: "James@gmail.com",
    phone_number: "+49 254 8525",
    gender: "Male" as const,
    role: "NORMAL_USER" as const,
    avatar: "/api/placeholder/40/40",
  },
  {
    id: "3",
    name: "Robert Bacins",
    email: "Robert@gmail.com",
    phone_number: "+49 745 2518",
    gender: "Male" as const,
    role: "VENDOR" as const,
    avatar: "/api/placeholder/40/40",
  },
  {
    id: "4",
    name: "Bethany Jackson",
    email: "Bethany@gmail.com",
    phone_number: "+49 256 3627",
    gender: "Female" as const,
    role: "NORMAL_USER" as const,
    avatar: "/api/placeholder/40/40",
  },
  {
    id: "5",
    name: "Anne Jacob",
    email: "Anne@gmail.com",
    phone_number: "+49 235 2573",
    gender: "Male" as const,
    role: "NORMAL_USER" as const,
    avatar: "/api/placeholder/40/40",
  },
];

const selectedCustomer = {
  name: "John Deo",
  title: "Industrialist",
  email: "kajope5182@ummoh.com",
  phone: "33757005467",
  secondaryPhone: "24757435467",
  address: "2239 Hog Camp Road Schaumburg",
};

export default function CustomersPage() {
  const handleEdit = (customer: any) => {
    console.log("Edit customer:", customer);
  };

  const handleDelete = (customer: any) => {
    console.log("Delete customer:", customer);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Customer List</h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4">
        {productTabs.map((tab) => (
          <Link key={tab.value} href={tab.href}>
            <Button
              variant={tab.value === "customers" ? "default" : "outline"}
              className={
                tab.value === "customers" ? "bg-blue-600 text-white" : ""
              }
            >
              {tab.name}
              {tab.value === "add-product" && <span className="ml-2">+</span>}
            </Button>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-3">
          <CustomersTable
            customers={mockCustomers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Customer Detail Sidebar */}
        <div className="lg:col-span-1">
          <CustomerSidebar customer={selectedCustomer} />
        </div>
      </div>
    </div>
  );
}
