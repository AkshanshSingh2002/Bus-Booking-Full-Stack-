import { requireRazorpay } from "../config/razorpay.js";

export const createRazorpayOrder = async ({ amount, currency = "INR", receipt }) => requireRazorpay().orders.create({ amount: Math.round(Number(amount) * 100), currency, receipt });

export const verifyPaymentSignature = ({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) => requireRazorpay().validatePaymentVerification({ order_id: razorpayOrderId, payment_id: razorpayPaymentId }, razorpaySignature);

export const refundRazorpayPayment = async ({ razorpayPaymentId, amount }) => requireRazorpay().payments.refund(razorpayPaymentId, { amount: Math.round(Number(amount) * 100) });
