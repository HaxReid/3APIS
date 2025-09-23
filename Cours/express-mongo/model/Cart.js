import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Cart = mongoose.model("Cart", CartSchema);

export { Cart };
