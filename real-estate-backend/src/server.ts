import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Buffer } from "buffer";
import { sequelize } from "./config/database";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes"; 

// Fix for Node.js v25 compatibility (restores removed SlowBuffer needed by 'jwa' library)
if (typeof (Buffer as any).SlowBuffer === "undefined") {
  (Buffer as any).SlowBuffer = (size: number) => Buffer.allocUnsafe(size);
}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);


sequelize.sync().then(() => {
  console.log("📌 Database connected!");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((error) => {
  console.error("❌ Database connection error:", error);
});
