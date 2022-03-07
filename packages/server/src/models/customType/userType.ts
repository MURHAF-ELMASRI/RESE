import mongoose from "mongoose";

export default class userType extends mongoose.SchemaType {
  constructor(key: string, options: mongoose.AnyObject) {
    super(key, options, "userType");
  }

  cast(
    val: "manger" | "player",
    doc: mongoose.Document<any, any, any>,
    init: boolean,
    prev?: any,
    options?: any
  ) {
    if (val !== "manger" && val !== "player") {
      throw new Error("userType must be either manage or player");
    }
    return val;
  }
}
