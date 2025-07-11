"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  manpowerHiringSchema,
  ManpowerHiringFormData,
} from "@/schemas/manpower-hiring-schema";
import { useManpowerHiringSubmission } from "@/hooks";
import { Button } from "@packtok/ui/components/button";
import { Input } from "@packtok/ui/components/input";
import { Label } from "@packtok/ui/components/label";
import { Textarea } from "@packtok/ui/components/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@packtok/ui/components/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@packtok/ui/components/card";
import { Checkbox } from "@packtok/ui/components/checkbox";
import { cn } from "@packtok/ui/lib/utils";

export function ManpowerHiringForm() {
  const manpowerSubmission = useManpowerHiringSubmission();
  const [selectedManpowerTypes, setSelectedManpowerTypes] = useState<string[]>(
    []
  );
  const [hiringDuration, setHiringDuration] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(manpowerHiringSchema),
    defaultValues: {
      skilledWorkersRequired: "0",
      semiSkilledWorkersRequired: "0",
      unskilledWorkersRequired: "0",
    },
  });

  const manpowerOptions = [
    { value: "MACHINE_OPERATORS", label: "Machine Operators" },
    { value: "TECHNICIANS", label: "Technicians" },
    { value: "MAINTENANCE_WORKERS", label: "Maintenance Workers" },
    { value: "SUPERVISORS", label: "Supervisors" },
    { value: "OTHER", label: "Other" },
  ];

  const handleManpowerTypeChange = (
    manpowerValue: string,
    checked: boolean
  ) => {
    let updatedTypes;
    if (checked) {
      updatedTypes = [...selectedManpowerTypes, manpowerValue];
    } else {
      updatedTypes = selectedManpowerTypes.filter((t) => t !== manpowerValue);
    }
    setSelectedManpowerTypes(updatedTypes);
    setValue("manpowerType", updatedTypes as ("MACHINE_OPERATORS" | "TECHNICIANS" | "MAINTENANCE_WORKERS" | "SUPERVISORS" | "OTHER")[]);
  };

  const onSubmit = async (data: ManpowerHiringFormData) => {
    try {
      await manpowerSubmission.mutateAsync(data);
      reset();
      setSelectedManpowerTypes([]);
      setHiringDuration("");
    } catch (error) {
      console.error("Error submitting manpower hiring request:", error);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Manpower Hiring Request
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Alpha Manufacturing"
                  {...register("companyName")}
                  className={cn(errors.companyName && "border-red-500")}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  placeholder="John Doe"
                  {...register("contactPerson")}
                  className={cn(errors.contactPerson && "border-red-500")}
                />
                {errors.contactPerson && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contactPerson.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  placeholder="HR Manager"
                  {...register("designation")}
                  className={cn(errors.designation && "border-red-500")}
                />
                {errors.designation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.designation.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  {...register("phone")}
                  className={cn(errors.phone && "border-red-500")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@company.com"
                  {...register("email")}
                  className={cn(errors.email && "border-red-500")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="industryType">Industry Type</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("industryType", value as "MANUFACTURING" | "AUTOMOTIVE" | "FOOD_PROCESSING" | "PHARMACEUTICALS" | "AGRICULTURE" | "CHEMICALS" | "PETROCHEMICALS" | "TEXTILE" | "PLASTICS_PACKAGING" | "ELECTRONICS" | "OTHER")
                  }
                >
                  <SelectTrigger
                    className={cn(errors.industryType && "border-red-500")}
                  >
                    <SelectValue placeholder="Select industry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MANUFACTURING">Manufacturing</SelectItem>
                    <SelectItem value="AUTOMOTIVE">Automotive</SelectItem>
                    <SelectItem value="FOOD_PROCESSING">
                      Food Processing
                    </SelectItem>
                    <SelectItem value="PHARMACEUTICALS">
                      Pharmaceuticals
                    </SelectItem>
                    <SelectItem value="AGRICULTURE">Agriculture</SelectItem>
                    <SelectItem value="CHEMICALS">Chemicals</SelectItem>
                    <SelectItem value="PETROCHEMICALS">
                      Petrochemicals
                    </SelectItem>
                    <SelectItem value="TEXTILE">Textile</SelectItem>
                    <SelectItem value="PLASTICS_PACKAGING">
                      Plastics & Packaging
                    </SelectItem>
                    <SelectItem value="ELECTRONICS">Electronics</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.industryType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.industryType.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="companyAddress">Company Address</Label>
              <Textarea
                id="companyAddress"
                placeholder="123 Industrial Park, Manufacturing District"
                rows={3}
                {...register("companyAddress")}
                className={cn(errors.companyAddress && "border-red-500")}
              />
              {errors.companyAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyAddress.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Work Details</h3>
            <div>
              <Label htmlFor="machineryInvolved">Machinery Involved</Label>
              <Textarea
                id="machineryInvolved"
                placeholder="CNC machines, assembly lines, packaging equipment..."
                rows={3}
                {...register("machineryInvolved")}
                className={cn(errors.machineryInvolved && "border-red-500")}
              />
              {errors.machineryInvolved && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.machineryInvolved.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="workLocation">Work Location</Label>
                <Input
                  id="workLocation"
                  placeholder="New York, NY"
                  {...register("workLocation")}
                  className={cn(errors.workLocation && "border-red-500")}
                />
                {errors.workLocation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.workLocation.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="workingHours">Working Hours</Label>
                <Input
                  id="workingHours"
                  placeholder="8 AM - 5 PM"
                  {...register("workingHours")}
                  className={cn(errors.workingHours && "border-red-500")}
                />
                {errors.workingHours && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.workingHours.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Manpower Requirements</h3>
            <div>
              <Label>Manpower Type (Select all that apply)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {manpowerOptions.map((manpower) => (
                  <div
                    key={manpower.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={manpower.value}
                      checked={selectedManpowerTypes.includes(manpower.value)}
                      onCheckedChange={(checked) =>
                        handleManpowerTypeChange(
                          manpower.value,
                          checked as boolean
                        )
                      }
                    />
                    <Label
                      htmlFor={manpower.value}
                      className="text-sm font-normal"
                    >
                      {manpower.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.manpowerType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.manpowerType.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="skilledWorkersRequired">
                  Skilled Workers Required
                </Label>
                <Input
                  id="skilledWorkersRequired"
                  type="number"
                  min="0"
                  placeholder="0"
                  {...register("skilledWorkersRequired")}
                  className={cn(
                    errors.skilledWorkersRequired && "border-red-500"
                  )}
                />
                {errors.skilledWorkersRequired && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.skilledWorkersRequired.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="semiSkilledWorkersRequired">
                  Semi-Skilled Workers Required
                </Label>
                <Input
                  id="semiSkilledWorkersRequired"
                  type="number"
                  min="0"
                  placeholder="0"
                  {...register("semiSkilledWorkersRequired")}
                  className={cn(
                    errors.semiSkilledWorkersRequired && "border-red-500"
                  )}
                />
                {errors.semiSkilledWorkersRequired && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.semiSkilledWorkersRequired.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="unskilledWorkersRequired">
                  Unskilled Workers Required
                </Label>
                <Input
                  id="unskilledWorkersRequired"
                  type="number"
                  min="0"
                  placeholder="0"
                  {...register("unskilledWorkersRequired")}
                  className={cn(
                    errors.unskilledWorkersRequired && "border-red-500"
                  )}
                />
                {errors.unskilledWorkersRequired && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.unskilledWorkersRequired.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hiring Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hiringDuration">Hiring Duration</Label>
                <Select
                  onValueChange={(value) => {
                    setHiringDuration(value);
                    setValue("hiringDuration", value as "PERMANENT" | "CONTRACT");
                  }}
                >
                  <SelectTrigger
                    className={cn(errors.hiringDuration && "border-red-500")}
                  >
                    <SelectValue placeholder="Select hiring duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERMANENT">Permanent</SelectItem>
                    <SelectItem value="CONTRACT">Contract</SelectItem>
                  </SelectContent>
                </Select>
                {errors.hiringDuration && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.hiringDuration.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="hiringUrgency">Hiring Urgency</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("hiringUrgency", value as "HIGH" | "MEDIUM" | "LOW")
                  }
                >
                  <SelectTrigger
                    className={cn(errors.hiringUrgency && "border-red-500")}
                  >
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="LOW">Low</SelectItem>
                  </SelectContent>
                </Select>
                {errors.hiringUrgency && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.hiringUrgency.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="expectedJoiningDate">
                  Expected Joining Date
                </Label>
                <Input
                  id="expectedJoiningDate"
                  type="date"
                  {...register("expectedJoiningDate")}
                  className={cn(errors.expectedJoiningDate && "border-red-500")}
                />
                {errors.expectedJoiningDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.expectedJoiningDate.message}
                  </p>
                )}
              </div>

              {hiringDuration === "CONTRACT" && (
                <div>
                  <Label htmlFor="contractDurationDetails">
                    Contract Duration Details
                  </Label>
                  <Input
                    id="contractDurationDetails"
                    placeholder="6 months, 1 year, etc."
                    {...register("contractDurationDetails")}
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="requiredCertsAndExp">
                Required Certifications & Experience
              </Label>
              <Textarea
                id="requiredCertsAndExp"
                placeholder="List required certifications and experience..."
                rows={3}
                {...register("requiredCertsAndExp")}
              />
            </div>

            <div>
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                placeholder="Any additional requirements or information..."
                rows={3}
                {...register("additionalNotes")}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={manpowerSubmission.isPending}
              className="px-8"
            >
              {manpowerSubmission.isPending
                ? "Submitting..."
                : "Submit Request"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
