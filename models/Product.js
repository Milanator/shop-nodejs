import mongoose from "mongoose";

const Schema = mongoose.Schema;

export default new Schema({
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
});
