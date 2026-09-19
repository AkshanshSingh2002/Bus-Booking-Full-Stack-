import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Seat = sequelize.define(
  "Seat",
  {
    seatId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    seatNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seatType: {
      type: DataTypes.ENUM("seater", "Recliner"),
    },
    busId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("AVAILABLE", "HELD", "BOOKED"),
      allowNull: false,
      defaultValue: "AVAILABLE",
    },
  },
  {
    tableName: "seats",
    indexes: [{ unique: true, fields: ["bus_id", "seat_number"] }],
  },
);

export default Seat;
