import { verifyPaymentSignature } from "../services/razorpay.service.js";
import { confirmPayment, getPaymentByBookingId } from "../services/payment.service.js";

export const verifyPayment = async (req, res) => {
    const valid = verifyPaymentSignature(req.body);
    if (!valid) return res.status(400).json({ success: false, message: "Invalid payment signature" });
    const result = await confirmPayment({ razorpayOrderId: req.body.razorpayOrderId, razorpayPaymentId: req.body.razorpayPaymentId });
    res.status(200).json({ success: true, data: result });
};
export const getPayment = async (req, res) => res.status(200).json({ success: true, data: await getPaymentByBookingId(req.params.bookingId) });
