import { User } from "@/models/user";
import bcrypt from "bcryptjs";

export async function createUser({
  password,
  email,
  name,
  avatar,
}: {
  password: string;
  email: string;
  name: string;
  avatar?: string;
}) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await new User({
    email,
    password: hashedPassword,
    name,
    avatar,
  }).save();

  return user;
}

export async function findUser({ id, email }: { id?: string; email?: string }) {
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

export async function updateUser(
  id: string,
  data: { name?: string; email?: string; password?: string }
) {
  return await User.findByIdAndUpdate(id, data, { new: true });
}
