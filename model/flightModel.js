import mongoose from "mongoose";

const flightSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    arrivalDate: {
      type: Date,
      required: true,
    },
    airline: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    aircraft: {
      type: String,
      required: true,
    },
    classes: {
      type: String,
      enum: ["Economy", "Business", "First"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Flight", flightSchema);
