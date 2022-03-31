import mongoose from "mongoose";

const Reservation = new mongoose.Schema({
  subPitchId: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  customerId: {
    type: Number,
  },
  state: {
    type: String,
    enum: ["closed", "reserved"],
  },
});

export default mongoose.model("Reservation", Reservation);
