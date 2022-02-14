import mongoose from "mongoose";

export default class reservationStateType extends mongoose.SchemaType {
  constructor(key: string, options: mongoose.AnyObject) {
    super(key, options, "userType");
  }

  cast(
    val: "closed" | "reserved",
    doc: mongoose.Document<any, any, any>,
    init: boolean,
    prev?: any,
    options?: any
  ) {
    if (val !== "closed" && val !== "reserved") {
      throw new Error("reservationStateType must be either closed or reserved");
    }
    return val;
  }
}
