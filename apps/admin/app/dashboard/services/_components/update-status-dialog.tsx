"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@packtok/ui/dialog";
import { Button } from "@packtok/ui/button";
import { Label } from "@packtok/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@packtok/ui/select";
import { Textarea } from "@packtok/ui/textarea";
import { ServiceRequest, ServiceStatus } from "../../../../types/service";

interface UpdateStatusDialogProps {
  service: ServiceRequest | null;
  onClose: () => void;
  onStatusUpdate: (serviceId: string, status: ServiceStatus) => void;
  getStatusBadge: (status: ServiceStatus) => React.ReactNode;
}

const statusOptions: { value: ServiceStatus; label: string; description: string }[] = [
  {
    value: ServiceStatus.SUBMITTED,
    label: "Submitted",
    description: "Initial submission received"
  },
  {
    value: ServiceStatus.AWAITING_ASSIGNMENT,
    label: "Awaiting Assignment",
    description: "Waiting to be assigned to an admin"
  },
  {
    value: ServiceStatus.IN_REVIEW,
    label: "In Review",
    description: "Currently being reviewed by admin"
  },
  {
    value: ServiceStatus.ACTION_REQUIRED,
    label: "Action Required",
    description: "Requires customer action or more information"
  },
  {
    value: ServiceStatus.APPROVED,
    label: "Approved",
    description: "Service request has been approved"
  },
  {
    value: ServiceStatus.REJECTED,
    label: "Rejected",
    description: "Service request has been rejected"
  },
  {
    value: ServiceStatus.IN_PROGRESS,
    label: "In Progress",
    description: "Service work is in progress"
  },
  {
    value: ServiceStatus.COMPLETED,
    label: "Completed",
    description: "Service has been completed"
  },
  {
    value: ServiceStatus.CLOSED,
    label: "Closed",
    description: "Service request is closed"
  },
  {
    value: ServiceStatus.CANCELLED,
    label: "Cancelled",
    description: "Service request has been cancelled"
  }
];

export function UpdateStatusDialog({ 
  service, 
  onClose, 
  onStatusUpdate, 
  getStatusBadge 
}: UpdateStatusDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState<ServiceStatus | "">("");
  const [notes, setNotes] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    if (!service || !selectedStatus) return;

    setIsUpdating(true);
    try {
      await onStatusUpdate(service.id, selectedStatus);
      onClose();
      setSelectedStatus("");
      setNotes("");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedStatus("");
    setNotes("");
  };

  if (!service) return null;

  const selectedStatusOption = statusOptions.find(opt => opt.value === selectedStatus);

  return (
    <Dialog open={!!service} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Service Status</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-500">Service</Label>
            <p className="text-sm">{service.serviceType.replace(/_/g, " ")} - {service.id}</p>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-500">Customer</Label>
            <p className="text-sm">{service.user.name} ({service.user.email})</p>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-500">Current Status</Label>
            <div className="mt-1">{getStatusBadge(service.status)}</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status-select">New Status</Label>
            <Select 
              value={selectedStatus} 
              onValueChange={(value) => setSelectedStatus(value as ServiceStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-xs text-gray-500">{option.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedStatusOption && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Status:</strong> {selectedStatusOption.label}
              </p>
              <p className="text-sm text-gray-600">
                {selectedStatusOption.description}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this status change..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdate} 
              disabled={!selectedStatus || isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Status"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}