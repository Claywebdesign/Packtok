"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Eye } from "lucide-react";
import { Button } from "@packtok/ui/button";
import { Input } from "@packtok/ui/input";
import { Loading } from "@packtok/ui/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@packtok/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@packtok/ui/card";
import { Badge } from "@packtok/ui/badge";
import { toast } from "react-hot-toast";
import { useQuotes, useUpdateQuoteStatus } from "../../../../hooks";
import { QuoteRequest, QuoteStatus } from "../../../../types/product";
import { QuoteDetailsDialog } from "./quote-details-dialog";

interface QuotesTableProps {
  initialQuotes?: QuoteRequest[];
}

export function QuotesTable({ initialQuotes = [] }: QuotesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);

  const { data: quotes = initialQuotes, isLoading, error } = useQuotes();
  const updateStatusMutation = useUpdateQuoteStatus();

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch quote requests");
    }
  }, [error]);

  const handleStatusUpdate = async (
    quoteId: string,
    newStatus: QuoteStatus,
  ) => {
    try {
      await updateStatusMutation.mutateAsync({ quoteId, status: newStatus });
      toast.success("Quote status updated successfully");
    } catch (error) {
      toast.error("Failed to update quote status");
    }
  };

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.product?.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="secondary">Pending</Badge>;
      case "REVIEWED":
        return <Badge variant="default">Reviewed</Badge>;
      case "COMPLETED":
        return <Badge variant="default">Completed</Badge>;
      case "CANCELLED":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return <Loading variant="jimu" className="min-h-64" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quote Requests</CardTitle>
        <CardDescription>
          Review and manage customer quote requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quotes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="REVIEWED">Reviewed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuotes.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell className="font-medium">
                  {quote.companyName}
                </TableCell>
                <TableCell>
                  {quote.product?.title || "Unknown Product"}
                </TableCell>
                <TableCell>{getStatusBadge(quote.status)}</TableCell>
                <TableCell>
                  {new Date(quote.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{quote.user?.name || "Unknown"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedQuote(quote)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredQuotes.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {searchTerm
                ? "No quotes found matching your search."
                : "No quote requests yet."}
            </p>
          </div>
        )}
      </CardContent>

      <QuoteDetailsDialog
        quote={selectedQuote}
        onClose={() => setSelectedQuote(null)}
        onStatusUpdate={handleStatusUpdate}
        getStatusBadge={getStatusBadge}
      />
    </Card>
  );
}