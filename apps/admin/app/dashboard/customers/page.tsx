"use client";

import { useState, useMemo } from "react";
import { Button } from "@packtok/ui/components/button";
import { Input } from "@packtok/ui/components/input";
import { Badge } from "@packtok/ui/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@packtok/ui/components/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@packtok/ui/components/dropdown-menu";
import { productTabs } from "constants/navigation";
import {
  Mail,
  Phone,
  MoreHorizontal,
  MapPin,
  Search,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Edit,
  Trash2,
} from "lucide-react";
import Link from "next/link";

// Mock customer data based on the schema
interface Customer {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  gender: "Male" | "Female";
  role: "NORMAL_USER" | "VENDOR" | "ADMIN" | "SUPER_ADMIN";
  avatar?: string;
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Arrora gaur",
    email: "arroragaur@gmail.com",
    phone_number: "+49 587 2547",
    gender: "Male",
    role: "NORMAL_USER",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: "2",
    name: "James Mullican",
    email: "James@gmail.com",
    phone_number: "+49 254 8525",
    gender: "Male",
    role: "NORMAL_USER",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: "3",
    name: "Robert Bacins",
    email: "Robert@gmail.com",
    phone_number: "+49 745 2518",
    gender: "Male",
    role: "VENDOR",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: "4",
    name: "Bethany Jackson",
    email: "Bethany@gmail.com",
    phone_number: "+49 256 3627",
    gender: "Female",
    role: "NORMAL_USER",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: "5",
    name: "Anne Jacob",
    email: "Anne@gmail.com",
    phone_number: "+49 235 2573",
    gender: "Male",
    role: "NORMAL_USER",
    avatar: "/api/placeholder/40/40",
  },
];

// Mock customer detail for sidebar
const selectedCustomer = {
  name: "John Deo",
  title: "Industrialist",
  email: "kajope5182@ummoh.com",
  phone: "33757005467",
  secondaryPhone: "24757435467",
  address: "2239 Hog Camp Road Schaumburg",
};

type SortField = "name" | "email" | "phone_number" | "gender" | "role";
type SortDirection = "asc" | "desc";

export default function CustomersPage() {
  const [activeTab, setActiveTab] = useState("customers");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEdit = (customer: Customer) => {
    console.log("Edit customer:", customer);
  };

  const handleDelete = (customer: Customer) => {
    console.log("Delete customer:", customer);
  };

  const filteredAndSortedCustomers = useMemo(() => {
    const filtered = mockCustomers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
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

  const getGenderBadgeColor = (gender: string) => {
    return gender === "Male"
      ? "bg-teal-100 text-teal-800"
      : "bg-pink-100 text-pink-800";
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      NORMAL_USER: "bg-blue-100 text-blue-800",
      VENDOR: "bg-green-100 text-green-800",
      ADMIN: "bg-purple-100 text-purple-800",
      SUPER_ADMIN: "bg-red-100 text-red-800",
    };
    return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800";
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
              key={tab.value}
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm">
          {/* Search and Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 max-w-md"
              />
            </div>
          </div>

          {/* Customer Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 py-3">
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                    onClick={() => handleSort("name")}
                  >
                    Name
                    <SortIcon field="name" />
                  </Button>
                </TableHead>
                <TableHead className="px-6 py-3">
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                    onClick={() => handleSort("email")}
                  >
                    Email
                    <SortIcon field="email" />
                  </Button>
                </TableHead>
                <TableHead className="px-6 py-3">
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                    onClick={() => handleSort("phone_number")}
                  >
                    Phone number
                    <SortIcon field="phone_number" />
                  </Button>
                </TableHead>
                <TableHead className="px-6 py-3">
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                    onClick={() => handleSort("gender")}
                  >
                    Gender
                    <SortIcon field="gender" />
                  </Button>
                </TableHead>
                <TableHead className="px-6 py-3">
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                    onClick={() => handleSort("role")}
                  >
                    Role
                    <SortIcon field="role" />
                  </Button>
                </TableHead>
                <TableHead className="px-6 py-3 font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {customer.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {customer.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600">
                    {customer.phone_number}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge
                      className={`${getGenderBadgeColor(customer.gender)} text-xs`}
                    >
                      {customer.gender}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge className={`${getRoleBadge(customer.role)} text-xs`}>
                      {customer.role.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="z-50">
                        <DropdownMenuItem onClick={() => handleEdit(customer)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(customer)}
                          variant="destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Customer Detail Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Selected Customer Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-lg">JD</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedCustomer.name}
              </h3>
              <p className="text-gray-600 text-sm">{selectedCustomer.title}</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Contact Info</h4>

              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{selectedCustomer.email}</span>
              </div>

              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{selectedCustomer.phone}</span>
              </div>

              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">
                  {selectedCustomer.secondaryPhone}
                </span>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <span className="text-gray-600">
                  {selectedCustomer.address}
                </span>
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
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(
                (month, index) => {
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
                },
              )}
            </div>

            {/* Donut Chart */}
            <div className="mt-6 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-700">
                      70%
                    </span>
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
      </div>
    </div>
  );
}
