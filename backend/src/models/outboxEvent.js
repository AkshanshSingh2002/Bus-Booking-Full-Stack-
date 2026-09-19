import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OutboxEvent = sequelize.define("OutboxEvent", {
    eventId: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    eventType: { type: DataTypes.STRING(100), allowNull: false },
    aggregateId: { type: DataTypes.STRING(100), allowNull: false },
    payload: { type: DataTypes.JSON, allowNull: false },
    status: { type: DataTypes.ENUM("PENDING", "PUBLISHED", "FAILED"), allowNull: false, defaultValue: "PENDING" },
    publishedAt: { type: DataTypes.DATE, allowNull: true }
}, { tableName: "outbox_events", indexes: [{ fields: ["status", "created_at"] }] });

export default OutboxEvent;
