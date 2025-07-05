import { z } from "zod";

export const productSubmissionSchema = z.object({
  // Basic product information
  title: z.string().min(2, {
    message: "Item name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
  productType: z.enum(["MACHINERY", "SPARE_PARTS", "CONSUMABLES", "RAW_MATERIALS"], {
    message: "Please select a product type.",
  }),
  condition: z.enum(["NEW", "USED"], {
    message: "Please select product condition.",
  }),
  categoryName: z.string().min(1, {
    message: "Category is required.",
  }),
  machineType: z.enum(["MONO_CARTON", "MASTER_CARTON", "BOTH", "OTHER"]).optional(),
  
  // Optional fields
  manufacturer: z.string().optional(),
  model: z.string().optional(),
  year: z.string().optional(),
  specifications: z.string().optional(),
  additionalInfo: z.string().optional(),
  
  // Address information
  legalBusinessName: z.string().min(2, {
    message: "Legal business name must be at least 2 characters.",
  }),
  addressLine1: z.string().min(5, {
    message: "Address line 1 must be at least 5 characters.",
  }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  postcodeZip: z.string().min(3, {
    message: "Postcode/ZIP must be at least 3 characters.",
  }),
  country: z.string().min(2, {
    message: "Country is required.",
  }),
  state: z.string().min(2, {
    message: "State is required.",
  }),
  
  // Files - will be handled separately in state
  images: z.array(z.instanceof(File)).optional(),
  thumbnail: z.instanceof(File).optional(),
  video: z.instanceof(File).optional(),
  videoThumbnail: z.instanceof(File).optional(),
  pdf: z.instanceof(File).optional(),
});

export type ProductSubmissionFormData = z.infer<typeof productSubmissionSchema>;