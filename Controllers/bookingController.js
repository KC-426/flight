import flightModel from "../model/flightModel.js";
import bookingModel from "../model/bookingModel.js";
import userModel from "../model/userModel.js";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
dotenv.config({ path: "config/.env" });
import pdf from "html-pdf";
import { io } from "../app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const searchFlight = async (req, res) => {
  try {
    const { origin, destination, departureDate } = req.body;

    const formattedDepartureDate = new Date(departureDate);
    console.log(formattedDepartureDate);

    const flight = await flightModel.findOne({
      origin,
      destination,
      departureDate: formattedDepartureDate,
    });
    console.log(flight);

    if (!flight) {
      return res.status(404).json({
        message: "No flight available!",
      });
    }

    return res
      .status(200)
      .json({ message: "Flight searched successfully!", flight });
  } catch (err) {
    console.error("Error searching for flight:", err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const bookFlight = async (req, res) => {
  const { flightId } = req.params;
  try {
    const flight = await flightModel.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found!" });
    }

    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const newBooking = new bookingModel({
      userId,
      flight: flightId,
    });

    const result = await newBooking.save();
    const htmlContent = await ejs.renderFile(
      path.join(__dirname, "../views/bookingDetails.ejs"),
      { flight, user }
    );
    const pdfOptions = {
      format: "A4",
      border: { top: "0.5in", right: "0.5in", bottom: "0.5in", left: "0.5in" },
    };

    pdf
      .create(htmlContent, pdfOptions)
      .toFile(
        path.join(__dirname, "../public/booking.pdf"),
        async (err, res) => {
          if (err) return console.log(err);
          console.log(res);
        }
      );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
    });

    const info = await transporter.sendMail({
      from: `"Your Name" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: "Flight Booking Confirmation",
      text: `Hello ${user.name}, Your flight has been booked successfully.`,
      attachments: [
        {
          filename: "booking.pdf",
          path: path.join(__dirname, "../public/booking.pdf"),
        },
      ],
    });

    console.log("Message sent: %s", info.messageId);

    io.emit("bookingCreated", result);
    return res
      .status(200)
      .json({ message: "Flight booked successfully!", result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getBookedFlight = async (req, res) => {
  const { flightId } = req.params;
  try {
    const findFlight = await bookingModel
      .findById(flightId)
      .populate(["userId", "flight"]);

    if (!findFlight) {
      return res.status(404).json({ message: "No flight found !" });
    }

    return res
      .status(200)
      .json({ message: "Booked Flight fetched successfully!", findFlight });
  } catch (err) {
    console.error("Error searching for flight:", err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const updateBooking = async (req, res) => {
  const { bookingId } = req.params;
  const { flightId, userId } = req.body;

  try {
    const booking = await bookingModel.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found!" });
    }

    if (flightId) {
      const flight = await flightModel.findById(flightId);
      if (!flight) {
        return res.status(404).json({ message: "Flight not found!" });
      }
      booking.flight = flightId;
    }

    if (userId) {
      booking.userId = userId;
    }

    const updatedBooking = await booking.save();
    io.emit("bookingUpdated", updatedBooking);
    return res
      .status(200)
      .json({ message: "Booking updated successfully!", updatedBooking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const deleteBookedFlight = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const findFlight = await bookingModel.findById(bookingId);
    if (!findFlight) {
      return res.status(404).json({ message: "No flight found !" });
    }

    await bookingModel.findByIdAndDelete(bookingId);
    io.emit("bookingDeleted", bookingId);
    return res
      .status(200)
      .json({ message: "Booked Flight deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
