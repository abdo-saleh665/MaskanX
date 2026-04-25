import express from "express";
import cors from "cors";
import { sequelize } from "./config/database";
import authRoutes from "./routes/authRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import inquiryRoutes from "./routes/inquiryRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import statsRoutes from "./routes/statsRoutes";
import morganMiddleware from "./middlewares/morganMiddleware";
import { globalErrorHandler } from "./middlewares/errorHandler";
import "./models/index"; // Ensure models & associations are loaded

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morganMiddleware);

import { apiLimiter } from "./middlewares/rateLimiter";
app.use("/api", apiLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api", statsRoutes);

import protectedRoutes from "./routes/protectedRoutes";
app.use("/api", protectedRoutes);

// Setup Swagger Documentation Endpoint
import { setupSwagger } from "./config/swagger";
setupSwagger(app);

// Ensure database connection
sequelize.sync().then(() => {
  console.log("Database connected!");
});

// Global Error Handler
app.use(globalErrorHandler);
