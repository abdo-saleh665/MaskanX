import dotenv from "dotenv";
import { Buffer } from "buffer";
import { sequelize } from "./config/database";
import { app } from "./app";

// Fix for Node.js v25 compatibility (restores removed SlowBuffer needed by 'jwa' library)
if (typeof (Buffer as any).SlowBuffer === "undefined") {
  (Buffer as any).SlowBuffer = (size: number) => Buffer.allocUnsafe(size);
}

dotenv.config();

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log("📌 Database connected!");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((error) => {
  console.error("❌ Database connection error:", error);
});
