import mongoose from "mongoose";

const inventrySchema = mongoose.Schema({
  date: String,
  purchaseDate: String,
  price: Number,
  quantity: Number,
  productName: String,
  userId: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var inventry = mongoose.model("inventry", inventrySchema);

export default inventry;
