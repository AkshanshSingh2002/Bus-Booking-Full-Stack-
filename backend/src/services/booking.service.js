import BookingRecord from "../models/seatBooking.js";
import Seat from "../models/seat.js";
import Bus from "../models/bus.js";
import User from "../models/user.js";

export const addBookingRecordService = async (data) => {
    const seatId = data.seatId;
    const busId = data.busId;
    const userId = data.userId;


    const seat = await Seat.findByPk(seatId);

    if (!seat) {
        throw new Error("Error in seat booking. Please try again.")
    }

    if (seat.isBooked) {
        throw new Error("Seat is already booked")
    }

    const bus = await Bus.findByPk(busId);

    if (!bus) {
        throw new Error("Error in bus booking. Please try again.")
    }

    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error("Error in user booking. Please try again.")
    }

    const booking = await BookingRecord.create({
        busName: bus.busName,
        driverName: bus.driverName,
        busType: bus.busType,
        userId: user.userId,
        userName: user.userName,
        userEmail: user.userEmail,
        userMobileNumber: user.userMobileNumber,
        busId: bus.busId,
        seatId: seat.seatId,
        seatNumber: seat.seatNumber,
        seatType: seat.seatType
    });

    await seat.update({
        isBooked: true
    });

    return booking;
};

export const getBookingRecordByIdService = async (id) => {
    return await BookingRecord.findByPk(id);
};

export const getBookingRecordByBusIdService = async (id) => {
    return await BookingRecord.findAll({
        where: {
            busId: id
        }
    });
};

// export const updateBookingRecordService = async (id, data) => {
//     await BookingRecord.update(data, {
//         where: { id }
//     });

//     return await BookingRecord.findByPk(id);
// };

export const getAllBookingRecordService = async () => {
    return await BookingRecord.findAll();
};

export const deleteBookingRecordByIdService = async (id) => {
    return await BookingRecord.destroy({
        where: {
            id
        }
    });
};