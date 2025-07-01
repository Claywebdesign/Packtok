import { prisma } from "@packtok/db";
import { ApiError } from "../utils/apiError";

export const listCategories = async () => {
  return prisma.category.findMany({ orderBy: { createdAt: "asc" } });
};

export const createCategory = async (name: string) => {
  if (!name) throw new ApiError(400, "Category name is required");
  const existing = await prisma.category.findFirst({ where: { name } });
  if (existing) return existing; // idempotent
  return prisma.category.create({ data: { name } });
};

export const deleteCategory = async (id: string) => {
  try {
    await prisma.category.delete({ where: { id } });
  } catch {
    throw new ApiError(404, "Category not found");
  }
};
