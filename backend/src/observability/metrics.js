import { metrics } from "@opentelemetry/api";

const meter = metrics.getMeter("bus-booking-service");

export const bookingCreatedCounter = meter.createCounter("bookings_created_total", {
    description: "Number of booking attempts created"
});

export const bookingConfirmedCounter = meter.createCounter("bookings_confirmed_total", {
    description: "Number of confirmed bookings"
});

export const paymentFailedCounter = meter.createCounter("payments_failed_total", {
    description: "Number of failed payments"
});
