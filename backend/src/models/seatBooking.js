import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"

const BookingRecord = sequelize.define(
    "Booking",
    {
    bookingId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    busName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    driverName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    busType: {
        type: DataTypes.ENUM(
            "Sleeper",
            "Non-Ac Sleeper",
            "Seater",
            "Non-Ac Seater",
            "AC Sleeper"
        ),
        allowNull: false
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false
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
    userMobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    busId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    seatId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    seatNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seatType: {
        type: DataTypes.ENUM(
            "seater",
            "Recliner"
        )
    }
},
    {
        tableName: "booking_records",
        timestamps: true,
        underscored: true
    }
);

export default BookingRecord;