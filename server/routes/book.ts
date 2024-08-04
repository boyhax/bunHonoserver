import { Hono } from "hono";
import { Book } from "../db/schema";
import qs from "qs";

const book = new Hono();
book.get("/", async (c) => {
  // GET /book/:id
  const serachparams = new URL(c.req.url).searchParams.toString();
  const filter = qs.parse(serachparams);
  const places = (filter.place as string).split(".");
  const data = await Book.find({ places: { $all: places } });
  return c.json({ data, error: null });
});
book.get("/:id", async (c) => {
  // GET /book/:id
  const id = c.req.param("id");
  const data = await Book.findById(id);
  return c.json({ data, error: null });
});
book.post("/", async (c) => {
  // GET /book/:id
  const body = await c.req.json();
  try {
    const data = await Book.create(body);
    return c.json({ data, error: null });
  } catch (error) {
    console.log("error :>> ", error);
    return c.json({
      data: null,
      error: { message: "error creating new book" },
    });
  }
});

export default book;
