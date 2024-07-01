import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config({ path: "config/.env" });

import userRoutes from "./routes/userRoutes.js";
import flightRoutes from "./routes/flightRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;
const { MONGODB_URI } = process.env;

app.set("view engine", "ejs");
app.set("views", "views");

const server = http.createServer(app);
export const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", userRoutes);
app.use("/api", flightRoutes);
app.use("/api", bookingRoutes);

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.use("/", (req, res) => {
  console.log("Working");
  res.send("WORKING");
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
