import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  user: { ref: "users", type: Schema.ObjectId },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model("products", productSchema);
export type ProductType = mongoose.InferSchemaType<typeof productSchema>;
