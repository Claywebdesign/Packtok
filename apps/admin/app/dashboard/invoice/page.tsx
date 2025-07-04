import { Plus } from "lucide-react";
import { Button } from "@packtok/ui/components/button";
import { InvoicesTable } from "./_components/invoices-table";

// Mock invoice data - in real app this would come from fetchJson
const invoices = [
  {
    id: "#876369",
    name: "Arrora gaur",
    email: "Arrora@gmail.com",
    date: "12 Dec, 2020",
    status: "Complete" as const,
    avatar: "AG",
    selected: true,
    starred: false,
  },
  {
    id: "#876368",
    name: "James",
    email: "James@gmail.com",
    date: "12 Dec, 2020",
    status: "Complete" as const,
    avatar: "J",
    selected: false,
    starred: true,
  },
  {
    id: "#876367",
    name: "Robert Bacins",
    email: "Robert@gmail.com",
    date: "11 Dec, 2020",
    status: "Complete" as const,
    avatar: "RB",
    selected: false,
    starred: true,
  },
  {
    id: "#876366",
    name: "Bethany Jackson",
    email: "Bethany@gmail.com",
    date: "10 Dec, 2020",
    status: "Complete" as const,
    avatar: "BJ",
    selected: true,
    starred: true,
  },
  {
    id: "#876365",
    name: "Anne Jacob",
    email: "Anne@gmail.com",
    date: "09 Dec, 2020",
    status: "Complete" as const,
    avatar: "AJ",
    selected: false,
    starred: true,
  },
  {
    id: "#876364",
    name: "Bethany jackson",
    email: "arroraqaur@gmail.com",
    date: "08 Dec, 2020",
    status: "Complete" as const,
    avatar: "Bj",
    selected: true,
    starred: true,
  },
  {
    id: "#876363",
    name: "James Mullican",
    email: "Mullican@gmail.com",
    date: "05 Dec, 2020",
    status: "Complete" as const,
    avatar: "JM",
    selected: true,
    starred: true,
  },
  {
    id: "#876362",
    name: "Jhon Deo",
    email: "Jhon@gmail.com",
    date: "05 Dec, 2020",
    status: "Complete" as const,
    avatar: "JD",
    selected: false,
    starred: true,
  },
  {
    id: "#876361",
    name: "Bethany jackson",
    email: "jackson@gmail.com",
    date: "03 Dec, 2020",
    status: "Complete" as const,
    avatar: "Bj",
    selected: true,
    starred: true,
  },
  {
    id: "#876360",
    name: "James Mullican",
    email: "James@gmail.com",
    date: "02 Dec, 2020",
    status: "Complete" as const,
    avatar: "JM",
    selected: false,
    starred: true,
  },
];

export default function InvoicePage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Invoice</h1>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create New
        </Button>
      </div>

      <InvoicesTable invoices={invoices} />
    </div>
  );
}
