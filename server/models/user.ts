import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
import { productSchema } from "./product";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "email required"],
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
    default: "",
  },
  role: {
    enum: ["admin", "user"],
    type: String,
    default: "user",
  },
  products: {
    type: productSchema,
    ref: "products",
  },
  fcm: {
    type: String,
    required:false
  },
}).set("toJSON", {
  transform: (doc, ret) => {
    delete ret.email; // Remove email field
    delete ret.password; // Remove password field
    delete ret.roles; // Remove password field
    return ret;
  },
});
// UserSchema.virtual("products", {
//   ref: "products",
//   localField: "_id",
//   foreignField: "user",
// });

export const User = mongoose.model("users", UserSchema);
export type UserType = mongoose.InferSchemaType<typeof UserSchema>;
