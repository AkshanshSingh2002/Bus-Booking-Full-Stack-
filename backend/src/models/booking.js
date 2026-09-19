import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Booking = sequelize.define("Booking", {
    bookingId: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.BIGINT, allowNull: false },
    busId: { type: DataTypes.BIGINT, allowNull: false },
    seatId: { type: DataTypes.BIGINT, allowNull: false },
    bookingStatus: { type: DataTypes.ENUM("PENDING", "CONFIRMED", "EXPIRED", "CANCELLED"), allowNull: false, defaultValue: "PENDING" },
    idempotencyKey: { type: DataTypes.STRING(100), allowNull: false },
    expiresAt: { type: DataTypes.DATE, allowNull: true }
}, { tableName: "bookings", indexes: [{ unique: true, fields: ["user_id", "idempotency_key"] }, { fields: ["expires_at", "booking_status"] }] });

export default Booking;
