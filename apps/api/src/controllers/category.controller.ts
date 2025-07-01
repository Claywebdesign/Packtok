import { Request, Response } from "express";
import {
  createCategory,
  deleteCategory,
  listCategories,
} from "../services/category.service";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const getCategories = asyncHandler(
  async (_req: Request, res: Response) => {
    const categories = await listCategories();
    res
      .status(200)
      .json(new ApiResponse(200, categories, "Categories fetched"));
  }
);

export const postCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const category = await createCategory(name);
    res.status(201).json(new ApiResponse(201, category, "Category created"));
  }
);

export const removeCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteCategory(id);
    res.status(200).json(new ApiResponse(200, null, "Category deleted"));
  }
);
