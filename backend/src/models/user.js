import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
    userId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userMobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // role: {
    //     type: DataTypes.ENUM(
    //         "USER"
    //     ),
    //     allowNull: false,
    // }
},
{
    tableName : "users",
    timestamps: true,
    underscored: true
}
);

export default User;