import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_ID || process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_SECRET || process.env.RAZORPAY_KEY_SECRET;

const razorpay = keyId && keySecret
    ? new Razorpay({ key_id: keyId, key_secret: keySecret })
    : null;

export const requireRazorpay = () => {
    if (!razorpay) throw new Error("Razorpay credentials are not configured");
    return razorpay;
};

export default razorpay;
