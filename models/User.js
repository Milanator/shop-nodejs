import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

export default mongoose.model("User", schema);
