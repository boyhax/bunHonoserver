import * as mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    poster: { type: String, required: true },
  },
  {
    collection: "movies",
    methods: {},
  }
).index({ title: "text", description: "text" });

export type MovieType = mongoose.InferSchemaType<typeof movieSchema>;
export const Movie = mongoose.model("movies", movieSchema);
