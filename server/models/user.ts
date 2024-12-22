import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

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
}).set("toJSON", {
  transform: (doc, ret) => {
    delete ret.email; // Remove email field
    delete ret.password; // Remove password field
    return ret;
  },
}); //prevent email and password read

export const User = mongoose.model("users", UserSchema);
export type UserType = mongoose.InferSchemaType<typeof UserSchema>;
