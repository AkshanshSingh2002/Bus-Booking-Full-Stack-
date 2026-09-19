import Bus from "./bus.js";
import Seat from "./seat.js";
import User from "./user.js";
import Role from "./role.js";
import Booking from "./booking.js";
import Payment from "./payment.js";
import Refund from "./Refund.js";
import OutboxEvent from "./outboxEvent.js";

Bus.hasMany(Seat, { foreignKey: "busId", as: "seats", onDelete: "CASCADE" });
Seat.belongsTo(Bus, { foreignKey: "busId", as: "bus" });

User.hasMany(Booking, { foreignKey: "userId", as: "bookings" });
Booking.belongsTo(User, { foreignKey: "userId", as: "user" });
Bus.hasMany(Booking, { foreignKey: "busId", as: "bookings" });
Booking.belongsTo(Bus, { foreignKey: "busId", as: "bus" });
Seat.hasMany(Booking, { foreignKey: "seatId", as: "bookings" });
Booking.belongsTo(Seat, { foreignKey: "seatId", as: "seat" });

Booking.hasOne(Payment, { foreignKey: "bookingId", as: "payment", onDelete: "CASCADE" });
Payment.belongsTo(Booking, { foreignKey: "bookingId", as: "booking" });

Booking.hasMany(Refund, { foreignKey: "bookingId", as: "refunds" });
Refund.belongsTo(Booking, { foreignKey: "bookingId", as: "booking" });

User.belongsToMany(Role, { through: "user_roles", foreignKey: "userId", otherKey: "roleId", as: "roles" });
Role.belongsToMany(User, { through: "user_roles", foreignKey: "roleId", otherKey: "userId", as: "users" });

export { Bus, Seat, User, Role, Booking, Payment, Refund, OutboxEvent };
