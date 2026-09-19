import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Payment = sequelize.define("Payment", {
    paymentId: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    bookingId: { type: DataTypes.BIGINT, allowNull: false, unique: true },
    razorpayOrderId: { type: DataTypes.STRING(100), allowNull: true, unique: true },
    razorpayPaymentId: { type: DataTypes.STRING(100), allowNull: true, unique: true },
    razorpayRefundId: { type: DataTypes.STRING(100), allowNull: true, unique: true },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    currency: { type: DataTypes.STRING(3), allowNull: false, defaultValue: "INR" },
    status: { type: DataTypes.ENUM("CREATED", "AUTHORIZED", "CAPTURED", "FAILED", "REFUND_PENDING", "REFUNDED"), allowNull: false, defaultValue: "CREATED" },
    idempotencyKey: { type: DataTypes.STRING(100), allowNull: false, unique: true }
}, { tableName: "payments" });

export default Payment;
