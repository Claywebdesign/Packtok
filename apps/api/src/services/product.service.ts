import {
  MarketplaceProductStatus,
  Prisma,
  ProductType,
  UserSubmissionStatus,
  prisma,
} from "@packtok/db";
import { ApiError } from "../utils/apiError";

/**
 * Helper function to build Prisma where clause for public visibility rule
 */
const publicVisibilityWhere: Prisma.MarketplaceProductWhereInput = {
  status: MarketplaceProductStatus.AVAILABLE,
  OR: [
    { submissionStatus: null },
    { submissionStatus: UserSubmissionStatus.APPROVED },
  ],
};

/**
 * Removes the price field for products that are of type MACHINERY (Price Secrecy Rule)
 */
const sanitizePriceForPublic = (
  product: Prisma.MarketplaceProductGetPayload<{ include: { category: true } }>
) => {
  const copy: any = { ...product };
  if (copy.productType === ProductType.MACHINERY) {
    delete copy.price;
  }
  return copy;
};

const ensureCategory = async (
  categoryId: string | undefined,
  categoryName: string | undefined
): Promise<string> => {
  if (categoryId) return categoryId;
  if (categoryName) {
    const existing = await prisma.category.findFirst({
      where: { name: categoryName },
    });
    if (existing) return existing.id;
    const created = await prisma.category.create({
      data: { name: categoryName },
    });
    return created.id;
  }
  throw new ApiError(400, "Category id or name is required");
};

export const createProductAsAdmin = async (adminId: string, data: any) => {
  const { categoryId, categoryName, ...rest } = data;
  const resolvedCategoryId = await ensureCategory(categoryId, categoryName);
  return prisma.marketplaceProduct.create({
    data: {
      ...rest,
      categoryId: resolvedCategoryId,
      createdById: adminId,
      submissionStatus: null,
    },
  });
};

export const createProductSubmission = async (userId: string, data: any) => {
  const { categoryId, categoryName, ...rest } = data;
  const resolvedCategoryId = await ensureCategory(categoryId, categoryName);
  return prisma.marketplaceProduct.create({
    data: {
      ...rest,
      categoryId: resolvedCategoryId,
      createdById: userId,
      submissionStatus: UserSubmissionStatus.PENDING_APPROVAL,
      status: MarketplaceProductStatus.DRAFT,
    },
  });
};

export const updateProduct = async (
  productId: string,
  data: Prisma.MarketplaceProductUpdateInput
) => {
  const existing = await prisma.marketplaceProduct.findUnique({
    where: { id: productId },
  });
  if (!existing) {
    throw new ApiError(404, "Product not found");
  }
  return prisma.marketplaceProduct.update({ where: { id: productId }, data });
};

export const changeProductStatus = async (
  productId: string,
  newStatus: MarketplaceProductStatus
) => {
  return prisma.marketplaceProduct.update({
    where: { id: productId },
    data: { status: newStatus },
  });
};

export const listAllProductsForAdmin = async () => {
  return prisma.marketplaceProduct.findMany({
    include: {
      createdByUser: {
        select: { id: true, name: true, email: true, role: true },
      },
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getPendingSubmissions = async () => {
  return prisma.marketplaceProduct.findMany({
    where: { submissionStatus: UserSubmissionStatus.PENDING_APPROVAL },
    include: {
      createdByUser: { select: { id: true, name: true, email: true } },
      category: true,
    },
    orderBy: { createdAt: "asc" },
  });
};

export const approveSubmission = async (productId: string) => {
  return prisma.marketplaceProduct.update({
    where: { id: productId },
    data: {
      submissionStatus: UserSubmissionStatus.APPROVED,
      status: MarketplaceProductStatus.AVAILABLE,
    },
  });
};

export const rejectSubmission = async (productId: string) => {
  return prisma.marketplaceProduct.update({
    where: { id: productId },
    data: { submissionStatus: UserSubmissionStatus.REJECTED },
  });
};

export type PublicProductQueryOptions = {
  categoryId?: string;
  condition?: string; // ProductCondition enum name
  machineType?: string; // MachineType enum name
  productType?: string; // optional filter
  page?: number;
  limit?: number;
};

export const getPublicProducts = async (options: PublicProductQueryOptions) => {
  const page = options.page && options.page > 0 ? options.page : 1;
  const limit = options.limit && options.limit > 0 ? options.limit : 10;
  const skip = (page - 1) * limit;

  const where: Prisma.MarketplaceProductWhereInput = {
    ...publicVisibilityWhere,
  };
  if (options.categoryId) where.categoryId = options.categoryId;
  if (options.condition) (where as any).condition = options.condition;
  if (options.machineType) (where as any).machineType = options.machineType;
  if (options.productType) (where as any).productType = options.productType;

  const [items, total] = await Promise.all([
    prisma.marketplaceProduct.findMany({
      where,
      include: { category: true },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.marketplaceProduct.count({ where }),
  ]);

  const sanitized = items.map(sanitizePriceForPublic);
  return { items: sanitized, total, page, limit };
};

export const getPublicProductById = async (id: string) => {
  const product = await prisma.marketplaceProduct.findFirst({
    where: { id, ...publicVisibilityWhere },
    include: { category: true },
  });
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return sanitizePriceForPublic(product);
};
