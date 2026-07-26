import { BIGINT, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Bus = sequelize.define("Bus",
    {
        busId: {
            type : DataTypes.BIGINT,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },
        busName: {
            type: DataTypes.STRING,
            allowNull : false
        },
        driverName: {
            type : DataTypes.STRING,
            allowNull : false
        },
        busType: {
            type : DataTypes.ENUM(
                "Sleeper",
                "Non-Ac Sleeper",
                "Seater",
                "Non-Ac Seater",
                "AC Sleeper"
            ),
            allowNull: false
        }
    },
    {
        tableName : "buses",
        timestamps: true,
        underscored: true
    }
);

export default Bus;