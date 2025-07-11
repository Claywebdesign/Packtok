import { ServiceStatus } from "@packtok/db";
import { Request, Response } from "express";
import {
  assignServiceRequest,
  deleteServiceRequest,
  getRequestById,
  listAllServiceRequests,
  updateServiceRequestStatus,
} from "../services/admin/serviceRequests.service";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const adminListServiceRequests = asyncHandler(
  async (_req: Request, res: Response) => {
    const data = await listAllServiceRequests();
    res
      .status(200)
      .json(new ApiResponse(200, data, "Service requests fetched"));
  }
);

export const adminGetServiceRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await getRequestById(id);
    res.status(200).json(new ApiResponse(200, data, "Service request fetched"));
  }
);

export const adminAssignServiceRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { adminId } = req.body;
    const data = await assignServiceRequest(id, adminId, req.user!.id);
    res
      .status(200)
      .json(new ApiResponse(200, data, "Service request assigned"));
  }
);

export const adminUpdateServiceRequestStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!Object.values(ServiceStatus).includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const data = await updateServiceRequestStatus(id, status, req.user!.id);
    res
      .status(200)
      .json(new ApiResponse(200, data, "Service request status updated"));
  }
);

export const adminDeleteServiceRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteServiceRequest(id, req.user!.role as any);
    res.status(200).json(new ApiResponse(200, null, "Service request deleted"));
  }
);
