import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export interface BookingAttributes {
  id?: number;
  property_id: number;
  user_id: number;
  start_date: Date;
  end_date: Date;
  total_price: number;
  status?: string;
}

export class Booking extends Model<BookingAttributes> implements BookingAttributes {
  public id!: number;
  public property_id!: number;
  public user_id!: number;
  public start_date!: Date;
  public end_date!: Date;
  public total_price!: number;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "properties",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
      validate: {
        isIn: [["pending", "confirmed", "cancelled", "completed"]],
      },
    },
  },
  {
    sequelize,
    tableName: "bookings",
  }
);
