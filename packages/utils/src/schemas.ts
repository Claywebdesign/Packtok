import { z } from "zod";

// User schemas
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Listing schemas
export const listingSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  userId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createListingSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
});

export const updateListingSchema = createListingSchema.partial();

// Export types
export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type Login = z.infer<typeof loginSchema>;
export type Listing = z.infer<typeof listingSchema>;
export type CreateListing = z.infer<typeof createListingSchema>;
export type UpdateListing = z.infer<typeof updateListingSchema>;
