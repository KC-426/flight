import flightModel from "../model/flightModel.js";

export const addFlight = async (req, res) => {
  try {
    const {
      flightNumber,
      origin,
      destination,
      departureDate,
      arrivalDate,
      airline,
      price,
      availableSeats,
      duration,
      classes,
      aircraft,
    } = req.body;

    const flight = new flightModel({
      flightNumber,
      origin,
      destination,
      departureDate,
      arrivalDate,
      airline,
      price,
      availableSeats,
      duration,
      classes,
      aircraft,
    });

    const result = await flight.save();

    return res
      .status(201)
      .json({ message: "Flight added successfully!", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
