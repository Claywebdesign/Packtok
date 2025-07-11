"use client";

import Protected from "@/components/auth/protected";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useMyServiceRequests } from "@/hooks/useServiceSubmission";
import { Button } from "@packtok/ui/components/button";
import { Input } from "@packtok/ui/components/input";
import { Badge } from "@packtok/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@packtok/ui/components/card";
import Link from "next/link";
import { ServiceRequest } from "@/hooks/useServiceSubmission";

export default function AccountPage() {
  const { data: user, isLoading } = useCurrentUser();
  const { data: services, isLoading: servicesLoading } = useMyServiceRequests();

  if (isLoading || !user) return null;

  // Helper function to get service type display name
  const getServiceTypeDisplay = (serviceType: ServiceRequest['serviceType']) => {
    const serviceTypeMap = {
      MAINTENANCE: "Maintenance",
      CONSULTANCY: "Consultancy",
      TURNKEY_PROJECT: "Turnkey Project",
      COMPANY_ACQUISITION: "Company Acquisition",
      MANPOWER_HIRING: "Manpower Hiring",
      JOB_SEEKER: "Job Seeker"
    };
    return serviceTypeMap[serviceType] || serviceType;
  };

  // Helper function to get status color
  const getStatusColor = (status: ServiceRequest['status']) => {
    const statusColors = {
      SUBMITTED: "bg-blue-100 text-blue-800",
      AWAITING_ASSIGNMENT: "bg-yellow-100 text-yellow-800",
      IN_REVIEW: "bg-purple-100 text-purple-800",
      ACTION_REQUIRED: "bg-orange-100 text-orange-800",
      APPROVED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
      IN_PROGRESS: "bg-blue-100 text-blue-800",
      COMPLETED: "bg-green-100 text-green-800",
      CLOSED: "bg-gray-100 text-gray-800",
      CANCELLED: "bg-red-100 text-red-800"
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <Protected>
      <div className="max-w-5xl mx-auto pb-20 pt-24 px-4">
        <h1 className="text-3xl font-bold mb-10 text-center">My Account</h1>
        <div className="grid md:grid-cols-3 gap-10">
          {/* Sidebar */}
          <aside className="bg-gray-100 rounded-lg p-6 space-y-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-semibold text-white">
                {user.name?.[0] ?? user.email[0]}
              </div>
              <h2 className="font-semibold">{user.name}</h2>
            </div>
            <nav className="space-y-4 text-sm">
              <span className="block font-medium text-primary">Account</span>
              <span className="block text-muted-foreground">Address</span>
              <span className="block text-muted-foreground">Orders</span>
              <span className="block text-muted-foreground">Wishlist</span>
              <span className="block font-medium text-primary">Services</span>
              <Button variant="link" className="px-0" asChild>
                <Link href="/">Log Out</Link>
              </Button>
            </nav>
          </aside>

          {/* Details */}
          <section className="md:col-span-2 space-y-10">
            <div>
              <h3 className="text-lg font-semibold mb-4">Account Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  placeholder="First name"
                  value={user.name?.split(" ")[0] || ""}
                  readOnly
                />
                <Input
                  placeholder="Last name"
                  value={user.name?.split(" ").slice(1).join(" ") || ""}
                  readOnly
                />
                <Input
                  placeholder="Display name"
                  value={user.name || user.email}
                  readOnly
                  className="md:col-span-2"
                />
                <Input
                  placeholder="Email"
                  value={user.email}
                  readOnly
                  className="md:col-span-2"
                />
                <Input
                  placeholder="Phone number"
                  value={user.phone_number ?? "-"}
                  readOnly
                  className="md:col-span-2"
                />
                <Input
                  placeholder="Country"
                  value={user.country ?? "-"}
                  readOnly
                  className="md:col-span-2"
                />
              </div>
            </div>

            {/* Services Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">My Service Requests</h3>
              {servicesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : services && services.length > 0 ? (
                <div className="space-y-4">
                  {services.map((service) => (
                    <Card key={service.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-base">
                              {getServiceTypeDisplay(service.serviceType)}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Submitted on {new Date(service.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={getStatusColor(service.status)}>
                            {service.status.replace(/_/g, ' ')}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Service ID:</span>
                            <p className="text-muted-foreground">{service.id}</p>
                          </div>
                          <div>
                            <span className="font-medium">Last Updated:</span>
                            <p className="text-muted-foreground">
                              {new Date(service.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                          {service.assignedToId && (
                            <div>
                              <span className="font-medium">Assigned:</span>
                              <p className="text-muted-foreground">Yes</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-8">
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      You haven&apos;t submitted any service requests yet.
                    </p>
                    <Button asChild>
                      <Link href="/services">Browse Services</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        </div>
      </div>
    </Protected>
  );
}
