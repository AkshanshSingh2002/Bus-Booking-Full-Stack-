import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const BookingRecord = sequelize.define(
  "Booking",
  {
    bookingId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    busName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    driverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    busType: {
      type: DataTypes.ENUM(
        "Sleeper",
        "Non-Ac Sleeper",
        "Seater",
        "Non-Ac Seater",
        "AC Sleeper",
      ),
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userMobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    busId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    seatId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    seatNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seatType: {
      type: DataTypes.ENUM("seater", "Recliner"),
    },
    bookingStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      default: "Pending",
    },
    idempotencyKey: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "booking_records",
    indexes: [
      { unique: true, fields: ["user_id", "idempotency_key"] },
      { fields: ["expires_at", "booking_status"] },
    ],
  },
);

export default BookingRecord;
