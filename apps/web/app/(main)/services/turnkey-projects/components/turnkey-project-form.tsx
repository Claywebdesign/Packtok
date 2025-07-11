"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  turnkeyProjectSchema,
  TurnkeyProjectFormData,
} from "@/schemas/turnkey-project-schema";
import { useTurnkeyProjectSubmission } from "@/hooks";
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

export function TurnkeyProjectForm() {
  const turnkeySubmission = useTurnkeyProjectSubmission();
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TurnkeyProjectFormData>({
    resolver: zodResolver(turnkeyProjectSchema),
  });

  const industryOptions = [
    { value: "MANUFACTURING", label: "Manufacturing" },
    { value: "AUTOMOTIVE", label: "Automotive" },
    { value: "FOOD_PROCESSING", label: "Food Processing" },
    { value: "PHARMACEUTICALS", label: "Pharmaceuticals" },
    { value: "AGRICULTURE", label: "Agriculture" },
    { value: "CHEMICALS", label: "Chemicals" },
    { value: "PETROCHEMICALS", label: "Petrochemicals" },
    { value: "TEXTILE", label: "Textile" },
    { value: "PLASTICS_PACKAGING", label: "Plastics & Packaging" },
    { value: "ELECTRONICS", label: "Electronics" },
    { value: "OTHER", label: "Other" },
  ];

  const serviceOptions = [
    { value: "FEASIBILITY_STUDY", label: "Feasibility Study" },
    { value: "PLANT_DESIGN_ENGINEERING", label: "Plant Design & Engineering" },
    { value: "EQUIPMENT_PROCUREMENT", label: "Equipment Procurement" },
    { value: "MACHINERY_INSTALLATION", label: "Machinery Installation" },
    {
      value: "AUTOMATION_SOFTWARE_INTEGRATION",
      label: "Automation & Software Integration",
    },
    { value: "PROCESS_OPTIMIZATION", label: "Process Optimization" },
    { value: "EMPLOYEE_TRAINING", label: "Employee Training" },
    {
      value: "MAINTENANCE_AFTER_SALES_SUPPORT",
      label: "Maintenance & After-Sales Support",
    },
    {
      value: "REGULATORY_COMPLIANCE_SETUP",
      label: "Regulatory Compliance Setup",
    },
    { value: "OTHER", label: "Other" },
  ];

  const handleIndustryChange = (industryValue: string, checked: boolean) => {
    let updatedIndustries;
    if (checked) {
      updatedIndustries = [...selectedIndustries, industryValue];
    } else {
      updatedIndustries = selectedIndustries.filter((i) => i !== industryValue);
    }
    setSelectedIndustries(updatedIndustries);
    setValue("industry", updatedIndustries as ("MANUFACTURING" | "AUTOMOTIVE" | "FOOD_PROCESSING" | "PHARMACEUTICALS" | "AGRICULTURE" | "CHEMICALS" | "PETROCHEMICALS" | "TEXTILE" | "PLASTICS_PACKAGING" | "ELECTRONICS" | "OTHER")[]);
  };

  const handleServiceChange = (serviceValue: string, checked: boolean) => {
    let updatedServices;
    if (checked) {
      updatedServices = [...selectedServices, serviceValue];
    } else {
      updatedServices = selectedServices.filter((s) => s !== serviceValue);
    }
    setSelectedServices(updatedServices);
    setValue("servicesNeeded", updatedServices as ("FEASIBILITY_STUDY" | "PLANT_DESIGN_ENGINEERING" | "EQUIPMENT_PROCUREMENT" | "MACHINERY_INSTALLATION" | "AUTOMATION_SOFTWARE_INTEGRATION" | "PROCESS_OPTIMIZATION" | "EMPLOYEE_TRAINING" | "MAINTENANCE_AFTER_SALES_SUPPORT" | "REGULATORY_COMPLIANCE_SETUP" | "OTHER")[]);
  };

  const onSubmit = async (data: TurnkeyProjectFormData) => {
    try {
      await turnkeySubmission.mutateAsync(data);
      reset();
      setSelectedIndustries([]);
      setSelectedServices([]);
    } catch (error) {
      console.error("Error submitting turnkey project request:", error);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Turnkey Project Inquiry
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  placeholder="John Doe"
                  {...register("contactName")}
                  className={cn(errors.contactName && "border-red-500")}
                />
                {errors.contactName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contactName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Alpha Industries"
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
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  placeholder="Project Manager"
                  {...register("role")}
                  className={cn(errors.role && "border-red-500")}
                />
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.role.message}
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
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  placeholder="https://company.com"
                  {...register("website")}
                  className={cn(errors.website && "border-red-500")}
                />
                {errors.website && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.website.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Industry & Project Details
            </h3>
            <div>
              <Label>Industry (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {industryOptions.map((industry) => (
                  <div
                    key={industry.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={industry.value}
                      checked={selectedIndustries.includes(industry.value)}
                      onCheckedChange={(checked) =>
                        handleIndustryChange(industry.value, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={industry.value}
                      className="text-sm font-normal"
                    >
                      {industry.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.industry && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.industry.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facilityType">Facility Type</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("facilityType", value as "NEW_PRODUCTION_PLANT" | "EXPANSION_OF_EXISTING_FACILITY" | "MODERNIZATION_AUTOMATION" | "OTHER")
                  }
                >
                  <SelectTrigger
                    className={cn(errors.facilityType && "border-red-500")}
                  >
                    <SelectValue placeholder="Select facility type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEW_PRODUCTION_PLANT">
                      New Production Plant
                    </SelectItem>
                    <SelectItem value="EXPANSION_OF_EXISTING_FACILITY">
                      Expansion of Existing Facility
                    </SelectItem>
                    <SelectItem value="MODERNIZATION_AUTOMATION">
                      Modernization & Automation
                    </SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.facilityType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.facilityType.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="targetProductionCapacity">
                  Target Production Capacity
                </Label>
                <Input
                  id="targetProductionCapacity"
                  placeholder="1000 units/day"
                  {...register("targetProductionCapacity")}
                  className={cn(
                    errors.targetProductionCapacity && "border-red-500"
                  )}
                />
                {errors.targetProductionCapacity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.targetProductionCapacity.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea
                id="projectDescription"
                placeholder="Describe your turnkey project requirements..."
                rows={4}
                {...register("projectDescription")}
                className={cn(errors.projectDescription && "border-red-500")}
              />
              {errors.projectDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.projectDescription.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Timeline & Budget</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="completionTimeline">Completion Timeline</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("completionTimeline", value as "MONTHS_0_6" | "MONTHS_6_12" | "YEARS_1_2" | "FLEXIBLE_TO_BE_DISCUSSED")
                  }
                >
                  <SelectTrigger
                    className={cn(
                      errors.completionTimeline && "border-red-500"
                    )}
                  >
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MONTHS_0_6">0-6 Months</SelectItem>
                    <SelectItem value="MONTHS_6_12">6-12 Months</SelectItem>
                    <SelectItem value="YEARS_1_2">1-2 Years</SelectItem>
                    <SelectItem value="FLEXIBLE_TO_BE_DISCUSSED">
                      Flexible (To be discussed)
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.completionTimeline && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.completionTimeline.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="estimatedBudget">Estimated Budget</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("estimatedBudget", value as "UNDER_1M" | "M1_5" | "M5_10" | "OVER_10M" | "TO_BE_DISCUSSED")
                  }
                >
                  <SelectTrigger
                    className={cn(errors.estimatedBudget && "border-red-500")}
                  >
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UNDER_1M">Under $1M</SelectItem>
                    <SelectItem value="M1_5">$1M - $5M</SelectItem>
                    <SelectItem value="M5_10">$5M - $10M</SelectItem>
                    <SelectItem value="OVER_10M">Over $10M</SelectItem>
                    <SelectItem value="TO_BE_DISCUSSED">
                      To be discussed
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.estimatedBudget && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.estimatedBudget.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="fundingStatus">Funding Status</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("fundingStatus", value as "FULLY_FUNDED" | "PARTIALLY_FUNDED" | "SEEKING_FINANCING" | "OTHER")
                  }
                >
                  <SelectTrigger
                    className={cn(errors.fundingStatus && "border-red-500")}
                  >
                    <SelectValue placeholder="Select funding status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FULLY_FUNDED">Fully Funded</SelectItem>
                    <SelectItem value="PARTIALLY_FUNDED">
                      Partially Funded
                    </SelectItem>
                    <SelectItem value="SEEKING_FINANCING">
                      Seeking Financing
                    </SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.fundingStatus && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fundingStatus.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="siteAvailableStatus">
                  Site Available Status
                </Label>
                <Select
                  onValueChange={(value) =>
                    setValue("siteAvailableStatus", value as "YES" | "NO" | "IN_PLANNING")
                  }
                >
                  <SelectTrigger
                    className={cn(
                      errors.siteAvailableStatus && "border-red-500"
                    )}
                  >
                    <SelectValue placeholder="Select site status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YES">Yes</SelectItem>
                    <SelectItem value="NO">No</SelectItem>
                    <SelectItem value="IN_PLANNING">In Planning</SelectItem>
                  </SelectContent>
                </Select>
                {errors.siteAvailableStatus && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.siteAvailableStatus.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services Needed</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {serviceOptions.map((service) => (
                <div
                  key={service.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={service.value}
                    checked={selectedServices.includes(service.value)}
                    onCheckedChange={(checked) =>
                      handleServiceChange(service.value, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={service.value}
                    className="text-sm font-normal"
                  >
                    {service.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.servicesNeeded && (
              <p className="text-red-500 text-sm mt-1">
                {errors.servicesNeeded.message}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="powerSupplyAvailable">
                  Power Supply Available
                </Label>
                <Input
                  id="powerSupplyAvailable"
                  placeholder="440V, 3-phase"
                  {...register("powerSupplyAvailable")}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="utilitiesAvailable"
                  onCheckedChange={(checked) =>
                    setValue("utilitiesAvailable", checked as boolean)
                  }
                />
                <Label htmlFor="utilitiesAvailable">Utilities Available</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requiresOngoingSupport"
                  onCheckedChange={(checked) =>
                    setValue("requiresOngoingSupport", checked as boolean)
                  }
                />
                <Label htmlFor="requiresOngoingSupport">
                  Requires Ongoing Support
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="interestedInFutureUpgrades"
                  onCheckedChange={(checked) =>
                    setValue("interestedInFutureUpgrades", checked as boolean)
                  }
                />
                <Label htmlFor="interestedInFutureUpgrades">
                  Interested in Future Upgrades
                </Label>
              </div>
            </div>

            <div>
              <Label htmlFor="machineryPreferences">
                Machinery Preferences
              </Label>
              <Textarea
                id="machineryPreferences"
                placeholder="Specific machinery brands or requirements..."
                rows={3}
                {...register("machineryPreferences")}
              />
            </div>

            <div>
              <Label htmlFor="specialRequirements">Special Requirements</Label>
              <Textarea
                id="specialRequirements"
                placeholder="Any special requirements or considerations..."
                rows={3}
                {...register("specialRequirements")}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={turnkeySubmission.isPending}
              className="px-8"
            >
              {turnkeySubmission.isPending ? "Submitting..." : "Submit Inquiry"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
