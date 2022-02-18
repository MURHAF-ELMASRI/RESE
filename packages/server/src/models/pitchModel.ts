import mongoose from "mongoose";

const pitchModel = new mongoose.Schema({
  mangerId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  numberOfSubPitch: {
    type: Number,
  },
  openAt: {
    type: Date,
  },
  closeAt: {
    type: Date,
  },
  paidServices: {
    type: Array,
  },
  freeServices: {
    type: Array,
  },
});

export default mongoose.model("pitches", pitchModel);
