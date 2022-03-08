import mongoose from "mongoose";
import reservationStateType from "./customType/reservationStateType";
import subPitchModel from "./subPitchModel";

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
    type: reservationStateType,
  },
});

export default mongoose.model("Reservation", Reservation);
