"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@packtok/ui/dialog";
import { Button } from "@packtok/ui/button";
import { Label } from "@packtok/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@packtok/ui/select";
import { ServiceRequest } from "../../../../types/service";
import { useQuery } from "@tanstack/react-query";
import api from "../../../../lib/axios";

interface AssignServiceDialogProps {
  service: ServiceRequest | null;
  onClose: () => void;
  onAssign: (serviceId: string, adminId: string) => void;
}

interface Admin {
  id: string;
  name: string;
  email: string;
}

export function AssignServiceDialog({
  service,
  onClose,
  onAssign,
}: AssignServiceDialogProps) {
  const [selectedAdminId, setSelectedAdminId] = useState<string>("");
  const [isAssigning, setIsAssigning] = useState(false);

  const { data: admins = [], isLoading } = useQuery<Admin[]>({
    queryKey: ["admins"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/admins");
      return data.data || data;
    },
    enabled: !!service,
  });

  const handleAssign = async () => {
    if (!service || !selectedAdminId) return;

    setIsAssigning(true);
    try {
      await onAssign(service.id, selectedAdminId);
      onClose();
      setSelectedAdminId("");
    } finally {
      setIsAssigning(false);
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedAdminId("");
  };

  if (!service) return null;

  return (
    <Dialog open={!!service} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Service Request</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-500">Service</Label>
            <p className="text-sm">
              {service.serviceType.replace(/_/g, " ")} - {service.id}
            </p>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-500">
              Customer
            </Label>
            <p className="text-sm">
              {service.user.name} ({service.user.email})
            </p>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-500">
              Current Assignment
            </Label>
            <p className="text-sm">
              {service.assignedTo ? service.assignedTo.name : "Unassigned"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-select">Assign to Admin</Label>
            <Select
              value={selectedAdminId}
              onValueChange={setSelectedAdminId}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an admin" />
              </SelectTrigger>
              <SelectContent>
                {admins.map((admin) => (
                  <SelectItem key={admin.id} value={admin.id}>
                    {admin.name} ({admin.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleAssign}
              disabled={!selectedAdminId || isAssigning}
            >
              {isAssigning ? "Assigning..." : "Assign"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
