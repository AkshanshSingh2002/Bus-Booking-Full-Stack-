import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
    userId: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    userName: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    userEmail: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    userPassword: { type: DataTypes.STRING(255), allowNull: false },
    userMobileNumber: { type: DataTypes.STRING(20), allowNull: false, unique: true }
}, { tableName: "users" });

export default User;
