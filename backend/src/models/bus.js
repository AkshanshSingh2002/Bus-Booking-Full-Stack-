import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Bus = sequelize.define("Bus", {
    busId: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    busName: { type: DataTypes.STRING(150), allowNull: false },
    driverName: { type: DataTypes.STRING(100), allowNull: false },
    busType: { type: DataTypes.ENUM("Sleeper", "Non-Ac Sleeper", "Seater", "Non-Ac Seater", "AC Sleeper"), allowNull: false }
}, { tableName: "buses" });

export default Bus;
