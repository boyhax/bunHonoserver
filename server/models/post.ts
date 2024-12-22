import * as mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    poster: { type: String, required: true },
    author: { type: String },
  },
  {
    collection: "posts",
    methods: {},
  }
);

export type Post = mongoose.InferSchemaType<typeof schema>;
export const Post = mongoose.model("post", schema);
