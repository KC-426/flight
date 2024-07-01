import express from "express";
import {
  bookFlight,
  deleteBookedFlight,
  getBookedFlight,
  searchFlight,
  updateBooking,
} from "../Controllers/bookingController.js";

const router = express.Router();

router.route("/search/flight").get(searchFlight);
router.route("/book/flight/:flightId").post(bookFlight);
router.route("/get/booked/flight/:flightId").get(getBookedFlight);
router.route("/update/booking/:bookingId").put(updateBooking);
router.route("/delete/booking/:bookingId").delete(deleteBookedFlight);

export default router;
