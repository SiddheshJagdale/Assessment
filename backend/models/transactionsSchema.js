import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: false },
  sold: { type: Boolean, required: true },
  dateOfSale: { type: Date, required: true },
});

export const Transactions = mongoose.model("Transactions", transactionSchema);
