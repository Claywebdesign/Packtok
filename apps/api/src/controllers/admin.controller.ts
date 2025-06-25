import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createAdminUser } from "../services/admin.service";
import { ApiResponse } from "../utils/apiResponse";

export const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone_number, password, permissions } = req.body;
  const admin = await createAdminUser(
    { name, email, phone_number, password },
    permissions
  );
  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { id: admin.id, email: admin.email },
        "Admin user created successfully."
      )
    );
});
