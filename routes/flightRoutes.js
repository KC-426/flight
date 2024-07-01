import express from "express";
import { addFlight } from "../Controllers/flightController.js";

const router = express.Router();

router.route("/add/flight").post(addFlight);

export default router;
