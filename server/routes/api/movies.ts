import { Hono } from "hono";
import { Movie } from "../../models/movie";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const queryobject = z.object({
  text: z.string().optional(),
  select: z.string().or(z.string().array()).optional(),
  populate: z.string().or(z.string().array()).optional(),
});

const movie = new Hono()
  .get("/", zValidator("query", queryobject), async (c) => {
    const query = c.req.valid("query");

    const data = await Movie.find({
      $text: {
        $search: query.text,
      },
    })
      .limit(20)
      .exec();
    return c.json({ data, error: null });
  })
  .get("/:id", async (c) => {
    // GET /book/:id
    const id = c.req.param("id");
    const data = await Movie.findById(id);
    return c.json({ data, error: null });
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        title: z.string(),
        poster: z.string(),
      })
    ),
    async (c) => {
      const body = await c.req.valid("json");
      const data = await Movie.create(body);
      return c.json({ data, error: null });
    }
  );

export default movie;
