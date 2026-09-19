import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Role = sequelize.define("Role", {
    roleId: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    roleName: { type: DataTypes.STRING(50), allowNull: false, unique: true }
}, { tableName: "roles" });

export default Role;
