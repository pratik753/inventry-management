import mongoose from "mongoose";

const saleSchema = mongoose.Schema({ 
  purchaseDate: String,
  price: Number,
  quantity: Number,
  productName: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var sale = mongoose.model("sale", saleSchema);

export default sale;
