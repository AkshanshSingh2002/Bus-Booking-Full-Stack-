import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Refund = sequelize.define(
  "Refund",
  {
    refundId: { 
        type: DataTypes.BIGINT, 
        primaryKey: true, 
        autoIncrement: true 
    },
    bookingId: { 
        type: DataTypes.BIGINT, 
        allowNull: false 
    },
    razorpayPaymentId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    razorpayRefundId: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },
    customerEmail: { 
        type: DataTypes.STRING(255), 
        allowNull: true 
    },
    amount: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    status: {
      type: DataTypes.ENUM("REFUND_PENDING", "REFUND_SUCCESS", "REFUND_FAILED"),
      allowNull: false,
      defaultValue: "REFUND_PENDING",
    },
    error: { type: DataTypes.TEXT, allowNull: true },
  },
  { tableName: "refunds" },
);

export default Refund;
