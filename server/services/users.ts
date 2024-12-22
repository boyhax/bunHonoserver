import { User } from "@server/models/user";
import bcrypt from "bcryptjs";

export async function createUser({ password, email, metadata }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await new User({
    email,
    password: hashedPassword,
    name: metadata?.name,
  }).save();

  return user;
}

export async function findUser({ id, email }) {
  let user;
  if (id) {
    user = await User.findById(id).exec();
  } else if (email) {
    user = await User.findOne({ email }).exec();
  }

  return user;
}

export async function listUsers(filter = {}) {
  return await User.find(filter);
}

export async function updateUser(id, data) {
  return await User.findByIdAndUpdate(id, data, { new: true });
}
