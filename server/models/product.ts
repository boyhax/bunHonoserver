import mongoose, { Schema } from "mongoose";

export const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: Number,
  category: String,
  images: {
    type: [
      {
        type: String,
        required: true,
      },
    ],
    default: [],
  },
  stock: { type: Number, default: 1, min: 0 },
  discount: { type: Number, default: 0 },
  user: { ref: "users", type: Schema.ObjectId },
  files: [{ ref: "files", type: Schema.ObjectId, default: "" }],

  status: {
    type: String,
    enum: ["draft", "active", "archived"],
    default: "draft",
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now, required: false },
  updatedAt: { type: Date, default: Date.now, required: false },
});

export const Product = mongoose.model("products", productSchema);
export type ProductType = mongoose.InferSchemaType<typeof productSchema>;
