import Bus from "./bus.js";
import Seat from "./seat.js";
import User from "./user.js";
import Role from "./role.js";
import BookingRecord from "./seatBooking.js";
import Payment from "./payment.js";
import Refund from "./refund.js";
import OutboxEvent from "./outboxEvent.js";

/* ==========================
   Bus <-> Seat
========================== */

Bus.hasMany(Seat, {
    foreignKey: "busId",
    as: "seats",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Seat.belongsTo(Bus, {
    foreignKey: "busId",
    as: "bus"
});

/* ==========================
   User <-> BookingRecord
========================== */

User.hasMany(BookingRecord, {
    foreignKey: "userId",
    as: "bookings",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

BookingRecord.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});

/* ==========================
   Bus <-> BookingRecord
========================== */

Bus.hasMany(BookingRecord, {
    foreignKey: "busId",
    as: "bookings",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

BookingRecord.belongsTo(Bus, {
    foreignKey: "busId",
    as: "bus"
});

/* ==========================
   Seat <-> BookingRecord
========================== */

Seat.hasMany(BookingRecord, {
    foreignKey: "seatId",
    as: "bookings",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

BookingRecord.belongsTo(Seat, {
    foreignKey: "seatId",
    as: "seat"
});


Booking.hasOne(Payment, { foreignKey: "bookingId", as: "payment", onDelete: "CASCADE" });
Payment.belongsTo(Booking, { foreignKey: "bookingId", as: "booking" });

Booking.hasMany(Refund, { foreignKey: "bookingId", as: "refunds" });
Refund.belongsTo(Booking, { foreignKey: "bookingId", as: "booking" });

/* ==========================
   User <-> Role (Many-to-Many)
========================== */

User.belongsToMany(Role, {
    through: "UserRoles",
    foreignKey: "userId",
    otherKey: "roleId",
    as: "roles"
});

Role.belongsToMany(User, {
    through: "UserRoles",
    foreignKey: "roleId",
    otherKey: "userId",
    as: "users"
});

export {
    Bus,
    Seat,
    User,
    Role,
    BookingRecord,
    Payment, 
    Refund, 
    OutboxEvent 
};