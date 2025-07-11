import { Role } from "@packtok/db";
import { Router } from "express";
import {
  adminAssignServiceRequest,
  adminDeleteServiceRequest,
  adminGetServiceRequest,
  adminListServiceRequests,
  adminUpdateServiceRequestStatus,
} from "../controllers/service.admin.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { hasRole } from "../middlewares/roles.middleware";

const router = Router();

router.use(authMiddleware, hasRole(Role.ADMIN, Role.SUPER_ADMIN));

router.get("/", adminListServiceRequests);
router.get("/:id", adminGetServiceRequest);
router.put("/:id/assign", adminAssignServiceRequest);
router.put("/:id/status", adminUpdateServiceRequestStatus);
router.delete("/:id", adminDeleteServiceRequest);

export default router;
