import { DataTypes, BIGINT } from "sequelize";
import sequelize from "../config/database.js";

const Seat = sequelize.define("Seat",
    {
        seatId: {
            type : DataTypes.BIGINT,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        seatNumber: {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        seatType: {
            type : DataTypes.ENUM(
                "seater",
                "Recliner"
            )
        },
        busId: {
            type : DataTypes.BIGINT,
            allowNull : false            
        },
        isBooked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName : "seats",
        timestamps: true,
        underscored: true
    }
)

export default Seat;