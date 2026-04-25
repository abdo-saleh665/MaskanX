import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export interface PropertyAttributes {
  id?: number;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  owner_id?: number;
  status?: string;
}

export class Property extends Model<PropertyAttributes> implements PropertyAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public location!: string;
  public bedrooms!: number;
  public bathrooms!: number;
  public area!: number;
  public owner_id!: number;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Property.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "available",
      validate: {
        isIn: [["available", "sold", "rented"]],
      },
    },
  },
  {
    sequelize,
    tableName: "properties",
  }
);
