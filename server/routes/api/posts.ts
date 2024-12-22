import { Hono } from "hono";
import { Movie } from "../../models/movie";
// import qs from "qs";

const posts = new Hono();
posts.get("/", async (c) => {
  const data = await Movie.find().limit(20).exec();
  return c.json({ data, error: null });
});
posts.get("/:id", async (c) => {
  // GET /book/:id
  const id = c.req.param("id");
  const data = await Movie.findById(id);
  return c.json({ data, error: null });
});
posts.post("/", async (c) => {
  // GET /book/:id
  const body = await c.req.json();
  try {
    const data = await Movie.create(body);
    return c.json({ data, error: null });
  } catch (error) {
    console.log("error :>> ", error);
    return c.json({
      data: null,
      error: { message: "error creating new book" },
    });
  }
});

export default posts;
