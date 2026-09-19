import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Seat = sequelize.define("Seat", {
    seatId: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    seatNumber: { type: DataTypes.STRING(20), allowNull: false },
    seatType: { type: DataTypes.ENUM("seater", "Recliner"), allowNull: false },
    busId: { type: DataTypes.BIGINT, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.ENUM("AVAILABLE", "HELD", "BOOKED"), allowNull: false, defaultValue: "AVAILABLE" }
}, { tableName: "seats", indexes: [{ unique: true, fields: ["bus_id", "seat_number"] }] });

export default Seat;
