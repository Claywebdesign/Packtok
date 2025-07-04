"use client";

import { useState, useMemo } from "react";
import {
  Star,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Search,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@packtok/ui/components/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@packtok/ui/components/table";
import { Input } from "@packtok/ui/components/input";
import { Button } from "@packtok/ui/components/button";

interface Invoice {
  id: string;
  name: string;
  email: string;
  date: string;
  status: "Complete";
  avatar: string;
  selected: boolean;
  starred: boolean;
}

const invoices: Invoice[] = [
  {
    id: "#876369",
    name: "Arrora gaur",
    email: "Arrora@gmail.com",
    date: "12 Dec, 2020",
    status: "Complete",
    avatar: "AG",
    selected: true,
    starred: false,
  },
  {
    id: "#876368",
    name: "James",
    email: "James@gmail.com",
    date: "12 Dec, 2020",
    status: "Complete",
    avatar: "J",
    selected: false,
    starred: true,
  },
  {
    id: "#876367",
    name: "Robert Bacins",
    email: "Robert@gmail.com",
    date: "11 Dec, 2020",
    status: "Complete",
    avatar: "RB",
    selected: false,
    starred: true,
  },
  {
    id: "#876366",
    name: "Bethany Jackson",
    email: "Bethany@gmail.com",
    date: "10 Dec, 2020",
    status: "Complete",
    avatar: "BJ",
    selected: true,
    starred: true,
  },
  {
    id: "#876365",
    name: "Anne Jacob",
    email: "Anne@gmail.com",
    date: "09 Dec, 2020",
    status: "Complete",
    avatar: "AJ",
    selected: false,
    starred: true,
  },
  {
    id: "#876364",
    name: "Bethany jackson",
    email: "arroraqaur@gmail.com",
    date: "08 Dec, 2020",
    status: "Complete",
    avatar: "Bj",
    selected: true,
    starred: true,
  },
  {
    id: "#876363",
    name: "James Mullican",
    email: "Mullican@gmail.com",
    date: "05 Dec, 2020",
    status: "Complete",
    avatar: "JM",
    selected: true,
    starred: true,
  },
  {
    id: "#876362",
    name: "Jhon Deo",
    email: "Jhon@gmail.com",
    date: "05 Dec, 2020",
    status: "Complete",
    avatar: "JD",
    selected: false,
    starred: true,
  },
  {
    id: "#876361",
    name: "Bethany jackson",
    email: "jackson@gmail.com",
    date: "03 Dec, 2020",
    status: "Complete",
    avatar: "Bj",
    selected: true,
    starred: true,
  },
  {
    id: "#876360",
    name: "James Mullican",
    email: "James@gmail.com",
    date: "02 Dec, 2020",
    status: "Complete",
    avatar: "JM",
    selected: false,
    starred: true,
  },
];

type SortField = "id" | "name" | "email" | "date" | "status";
type SortDirection = "asc" | "desc";

export default function InvoicePage() {
  const [invoiceList, setInvoiceList] = useState<Invoice[]>(invoices);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const toggleInvoiceSelection = (invoiceId: string) => {
    setSelectedInvoices((prev) =>
      prev.includes(invoiceId)
        ? prev.filter((id) => id !== invoiceId)
        : [...prev, invoiceId],
    );
  };

  const toggleStar = (invoiceId: string) => {
    setInvoiceList((prev) =>
      prev.map((invoice) =>
        invoice.id === invoiceId
          ? { ...invoice, starred: !invoice.starred }
          : invoice,
      ),
    );
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEdit = (invoice: Invoice) => {
    console.log("Edit invoice:", invoice);
  };

  const handleDelete = (invoice: Invoice) => {
    setInvoiceList((prev) => prev.filter((inv) => inv.id !== invoice.id));
    setSelectedInvoices((prev) => prev.filter((id) => id !== invoice.id));
  };

  const filteredAndSortedInvoices = useMemo(() => {
    const filtered = invoiceList.filter(
      (invoice) =>
        invoice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "date") {
        const aDate = new Date(aValue as string).getTime();
        const bDate = new Date(bValue as string).getTime();
        if (sortDirection === "asc") {
          return aDate - bDate;
        } else {
          return bDate - aDate;
        }
      }

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
  }, [invoiceList, searchTerm, sortField, sortDirection]);

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-yellow-500",
      "bg-indigo-500",
      "bg-red-500",
      "bg-teal-500",
    ];
    return colors[name.length % colors.length];
  };

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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Invoice</h1>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create New
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-4 px-6">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </TableHead>
              <TableHead className="py-4 px-6">
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                  onClick={() => handleSort("id")}
                >
                  Invoice Id
                  <SortIcon field="id" />
                </Button>
              </TableHead>
              <TableHead className="py-4 px-6">
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                  onClick={() => handleSort("name")}
                >
                  Name
                  <SortIcon field="name" />
                </Button>
              </TableHead>
              <TableHead className="py-4 px-6">
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                  onClick={() => handleSort("email")}
                >
                  Email
                  <SortIcon field="email" />
                </Button>
              </TableHead>
              <TableHead className="py-4 px-6">
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                  onClick={() => handleSort("date")}
                >
                  Date
                  <SortIcon field="date" />
                </Button>
              </TableHead>
              <TableHead className="py-4 px-6">
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-medium text-gray-500 hover:bg-transparent"
                  onClick={() => handleSort("status")}
                >
                  Status
                  <SortIcon field="status" />
                </Button>
              </TableHead>
              <TableHead className="py-4 px-6">
                <Trash2 className="w-4 h-4 text-gray-400" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedInvoices.map((invoice, index) => (
              <TableRow
                key={invoice.id}
                className={`${
                  index === 2 ? "border-2 border-purple-500 bg-purple-50" : ""
                }`}
              >
                <TableCell className="py-4 px-6">
                  <input
                    type="checkbox"
                    checked={selectedInvoices.includes(invoice.id)}
                    onChange={() => toggleInvoiceSelection(invoice.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="text-sm font-medium text-gray-900">
                    {invoice.id}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${getAvatarColor(invoice.name)} flex items-center justify-center`}
                    >
                      <span className="text-white text-sm font-medium">
                        {invoice.avatar}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {invoice.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="text-sm text-gray-600">{invoice.email}</span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="text-sm text-gray-600">{invoice.date}</span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleStar(invoice.id)}
                      className={`p-1 rounded ${
                        invoice.starred ? "text-yellow-500" : "text-gray-400"
                      }`}
                    >
                      <Star
                        className={`w-4 h-4 ${invoice.starred ? "fill-current" : ""}`}
                      />
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="z-50">
                        <DropdownMenuItem onClick={() => handleEdit(invoice)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(invoice)}
                          variant="destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
