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
import {
  Mail,
  MoreHorizontal,
  Search,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Edit,
  Trash2,
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  gender: "Male" | "Female";
  role: "NORMAL_USER" | "VENDOR" | "ADMIN" | "SUPER_ADMIN";
  avatar?: string;
}

type SortField = "name" | "email" | "phone_number" | "gender" | "role";
type SortDirection = "asc" | "desc";

interface CustomersTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export function CustomersTable({
  customers,
  onEdit,
  onDelete,
}: CustomersTableProps) {
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

  const filteredAndSortedCustomers = useMemo(() => {
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [searchTerm, sortField, sortDirection, customers]);

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
    <div className="bg-white rounded-lg shadow-sm">
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
                    <DropdownMenuItem onClick={() => onEdit(customer)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(customer)}
                      className="text-red-600 hover:text-red-700"
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
  );
}
