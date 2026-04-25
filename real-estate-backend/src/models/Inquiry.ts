import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export interface InquiryAttributes {
  id?: number;
  property_id: number;
  user_id: number;
  message: string;
  status?: string;
}

export class Inquiry extends Model<InquiryAttributes> implements InquiryAttributes {
  public id!: number;
  public property_id!: number;
  public user_id!: number;
  public message!: string;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Inquiry.init(
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
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "open",
      validate: {
        isIn: [["open", "replied", "closed"]],
      },
    },
  },
  {
    sequelize,
    tableName: "inquiries",
  }
);
