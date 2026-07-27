import express from 'express'; 
import {
    addBookingRecord,
    getBookingRecordById,
    getBookingRecordByBusId,
    getAllBookingRecord,
    getBookingRecordByUserId,
    deleteBookingRecordByBookingId
} from '../controllers/booking.controller.js';

const bookingRouter = express.Router();

bookingRouter.post("/addBookingRecord", addBookingRecord);
bookingRouter.get("/getAllBookingRecord", getAllBookingRecord);
bookingRouter.get("/getBookingRecordByBusId/:busId", getBookingRecordByBusId);
bookingRouter.get("/getBookingRecordByUserId/:userId", getBookingRecordByUserId);
bookingRouter.get("/getBookingRecordById/:bookingId",getBookingRecordById);
bookingRouter.delete("/deleteBookingRecordByBookingId/:bookingId",deleteBookingRecordByBookingId);




export default bookingRouter;