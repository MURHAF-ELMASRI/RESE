import mongoose from "mongoose";

const subPitchModel = new mongoose.Schema({
  pitchId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
});

export default mongoose.model("SubPitch", subPitchModel);
