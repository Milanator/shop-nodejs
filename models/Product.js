import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Product", schema);
