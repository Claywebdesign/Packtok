import { prisma } from "@packtok/db";
import { API_ROUTES, HTTP_STATUS } from "@packtok/utils";
import cors from "cors";
import express from "express";
import helmet from "helmet";

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
  res.status(HTTP_STATUS.OK).json({ status: "OK", message: "API is running" });
});

// Example users route using the shared Prisma Client
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(HTTP_STATUS.OK).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Unable to fetch users" });
  }
});

// API routes will be mounted here
// app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API Routes available:`, Object.keys(API_ROUTES));
});
