import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME || "real_estate_db",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "1572001",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 5432,
  dialect: (process.env.DB_DIALECT as any) || "postgres",
  models: [User],
});
