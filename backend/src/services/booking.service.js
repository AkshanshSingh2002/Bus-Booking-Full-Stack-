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
        throw new Error("Bus not found")
    }

    // if (seat.busId !== busId) {
    //     throw new Error("Seat not found");
    // }
    if (Number(seat.busId) !== Number(busId)) {
        throw new Error("Seat not found");
    }

    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error("User not found")
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

export const getBookingRecordByBusNameService = async (name) => {
    return await BookingRecord.findAll({
        where: {
            busName: name
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

// Option 1: Return all booking records for that user (your current code)
export const getBookingRecordByUserIdService = async (id) => {
    return await BookingRecord.findAll({
        where: {
            userId: id
        }
    });

};

// Option 2: Return only seat information booked by that user
// export const getBookingRecordByUserIdService = async (id) => {
//     return await BookingRecord.findAll({
//         where: {
//             userId: id
//         },
//         attributes: [
//             "seatId",
//             "seatNumber",
//             "seatType",
//             "busId",
//             "busName",
//             "bookingId"
//         ]
//     });
// };

export const deleteBookingRecordByBookingIdService = async (id) => {
    // return await BookingRecord.destroy({
    //     where: {
    //         id
    //     }
    // });

    const booking = await BookingRecord.findByPk(id);

    if (!booking) {
        throw new Error("Booking not found");
    }

    await Seat.update(
        { isBooked: false },
        {
            where: {
                seatId: booking.seatId
            }
        }
    );

    await booking.destroy();

    return booking;
};