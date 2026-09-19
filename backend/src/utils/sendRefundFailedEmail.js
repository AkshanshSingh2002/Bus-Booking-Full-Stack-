import nodemailer from "nodemailer";

const transporter = process.env.EMAIL_HOST
    ? nodemailer.createTransport({ host: process.env.EMAIL_HOST, port: Number(process.env.EMAIL_PORT || 587), secure: process.env.EMAIL_SECURE === "true", auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD } })
    : null;

const sendEmail = async ({ email, razorpayPaymentId, bookingId, error, Heading, messageForCustomer }) => {
    if (!transporter || !email) return;
    await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: email,
        subject: Heading,
        html: `<h2>${Heading}</h2><p>${messageForCustomer}</p><p><strong>Booking ID:</strong> ${bookingId}</p><p><strong>Payment ID:</strong> ${razorpayPaymentId}</p>${error ? `<p><strong>Reason:</strong> ${error}</p>` : ""}`
    });
};

export default sendEmail;
