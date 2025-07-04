"use client";

import { useState } from "react";
import { Search, Filter, Eye, Calendar, DollarSign } from "lucide-react";
import { Button } from "@packtok/ui/button";
import { Input } from "@packtok/ui/input";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@packtok/ui/dialog";
import { toast } from "react-hot-toast";
import { useQuotes, useUpdateQuoteStatus } from "../../../hooks";
import { QuoteRequest, QuoteStatus } from "../../../types/product";
import Image from "next/image";

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);

  // Use hooks for data fetching and mutations
  const { data: quotes = [], isLoading, error } = useQuotes();
  const updateStatusMutation = useUpdateQuoteStatus();

  // Handle error state
  if (error) {
    toast.error("Failed to fetch quote requests");
  }

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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quote Requests</h1>
          <p className="text-muted-foreground">
            Manage customer quote requests
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quotes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {quotes.filter((q) => q.status === "PENDING").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {quotes.filter((q) => q.status === "COMPLETED").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                quotes.filter((q) => {
                  const quoteDate = new Date(q.createdAt);
                  const now = new Date();
                  return (
                    quoteDate.getMonth() === now.getMonth() &&
                    quoteDate.getFullYear() === now.getFullYear()
                  );
                }).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedQuote(quote)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Quote Request Details</DialogTitle>
                            <DialogDescription>
                              Review and manage this quote request
                            </DialogDescription>
                          </DialogHeader>
                          {selectedQuote && (
                            <div className="space-y-6 max-h-[70vh] overflow-y-auto">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-1">
                                    Company
                                  </h4>
                                  <p className="text-sm">
                                    {selectedQuote.companyName}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-1">Status</h4>
                                  {getStatusBadge(selectedQuote.status)}
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-1">
                                    Created At
                                  </h4>
                                  <p className="text-sm">
                                    {new Date(
                                      selectedQuote.createdAt,
                                    ).toLocaleDateString()}{" "}
                                    {new Date(
                                      selectedQuote.createdAt,
                                    ).toLocaleTimeString()}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-1">
                                    Updated At
                                  </h4>
                                  <p className="text-sm">
                                    {new Date(
                                      selectedQuote.updatedAt,
                                    ).toLocaleDateString()}{" "}
                                    {new Date(
                                      selectedQuote.updatedAt,
                                    ).toLocaleTimeString()}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">
                                  Contact Information
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium">
                                      {selectedQuote.user?.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {selectedQuote.user?.email}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {selectedQuote.user?.phone_number}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      User ID:
                                    </p>
                                    <p className="text-xs font-mono">
                                      {selectedQuote.user?.id}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-1">Address</h4>
                                <p className="text-sm">
                                  {selectedQuote.address}
                                </p>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">
                                  Product Details
                                </h4>
                                {selectedQuote.product && (
                                  <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-sm font-medium">
                                          {selectedQuote.product.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {selectedQuote.product.description}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground">
                                          Price:
                                        </p>
                                        <p className="text-sm font-medium">
                                          ₹{selectedQuote.product.price}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                      <div>
                                        <p className="text-xs text-muted-foreground">
                                          Quantity:
                                        </p>
                                        <p className="text-sm">
                                          {selectedQuote.product.quantity}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground">
                                          Condition:
                                        </p>
                                        <p className="text-sm">
                                          {selectedQuote.product.condition}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground">
                                          Year:
                                        </p>
                                        <p className="text-sm">
                                          {selectedQuote.product.year}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-xs text-muted-foreground">
                                          Type:
                                        </p>
                                        <p className="text-sm">
                                          {selectedQuote.product.productType}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground">
                                          Machine Type:
                                        </p>
                                        <p className="text-sm">
                                          {selectedQuote.product.machineType}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-xs text-muted-foreground">
                                          Manufacturer:
                                        </p>
                                        <p className="text-sm">
                                          {selectedQuote.product.manufacturer}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground">
                                          Status:
                                        </p>
                                        <p className="text-sm">
                                          {selectedQuote.product.status}
                                        </p>
                                      </div>
                                    </div>
                                    {selectedQuote.product.specifications && (
                                      <div>
                                        <p className="text-xs text-muted-foreground">
                                          Specifications:
                                        </p>
                                        <div className="text-sm bg-gray-50 p-2 rounded">
                                          {(() => {
                                            try {
                                              const specs = JSON.parse(
                                                selectedQuote.product
                                                  .specifications,
                                              );
                                              return Object.entries(specs).map(
                                                ([key, value]) => (
                                                  <div
                                                    key={key}
                                                    className="flex justify-between"
                                                  >
                                                    <span className="font-medium">
                                                      {key
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        key.slice(1)}
                                                    </span>
                                                    <span>{String(value)}</span>
                                                  </div>
                                                ),
                                              );
                                            } catch {
                                              return (
                                                <span>
                                                  {
                                                    selectedQuote.product
                                                      .specifications
                                                  }
                                                </span>
                                              );
                                            }
                                          })()}
                                        </div>
                                      </div>
                                    )}

                                    {selectedQuote.product.imagesThumbnail && (
                                      <div>
                                        <p className="text-xs text-muted-foreground mb-2">
                                          Product Image:
                                        </p>
                                        <Image
                                          width={128}
                                          height={128}
                                          src={
                                            selectedQuote.product
                                              .imagesThumbnail
                                          }
                                          alt={selectedQuote.product.title}
                                          className="w-32 h-32 object-cover rounded border"
                                        />
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>

                              <div>
                                <h4 className="font-semibold mb-1">Message</h4>
                                <p className="text-sm">
                                  {selectedQuote.message}
                                </p>
                              </div>
                              {selectedQuote.additionalInfo && (
                                <div>
                                  <h4 className="font-semibold mb-1">
                                    Additional Information
                                  </h4>
                                  <p className="text-sm">
                                    {selectedQuote.additionalInfo}
                                  </p>
                                </div>
                              )}
                              <div className="flex gap-2 pt-4">
                                {selectedQuote.status === "PENDING" && (
                                  <Button
                                    onClick={() =>
                                      handleStatusUpdate(
                                        selectedQuote.id,
                                        "REVIEWED",
                                      )
                                    }
                                    size="sm"
                                  >
                                    Mark as Reviewed
                                  </Button>
                                )}
                                {selectedQuote.status === "REVIEWED" && (
                                  <Button
                                    onClick={() =>
                                      handleStatusUpdate(
                                        selectedQuote.id,
                                        "COMPLETED",
                                      )
                                    }
                                    size="sm"
                                  >
                                    Mark as Completed
                                  </Button>
                                )}
                                {selectedQuote.status !== "CANCELLED" && (
                                  <Button
                                    onClick={() =>
                                      handleStatusUpdate(
                                        selectedQuote.id,
                                        "CANCELLED",
                                      )
                                    }
                                    variant="destructive"
                                    size="sm"
                                  >
                                    Cancel
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
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
      </Card>
    </div>
  );
}
