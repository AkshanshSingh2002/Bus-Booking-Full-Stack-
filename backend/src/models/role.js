import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Role = sequelize.define("Role", {
    roleId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "USER"
    }

},
    {
        tableName: "roles",
        timestamps: true,
        underscored: true
    }
)

export default Role;