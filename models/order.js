import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  products: [
    {
      product: {
        type: Object,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  user: {
    name: {
      type: String,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
});

export default mongoose.model("Order", schema);
