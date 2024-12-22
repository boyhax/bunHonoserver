import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import {
  createProduct,
  findProduct,
  listProducts,
  updateProduct,
} from "@server/services/products";

// const productSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   price: Number,
//   category: String,
//   image: String,
//   stock: Number,
//   user: User,
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });
const products = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        text: z.string().optional(),
      })
    ),
    async (c) => {
      const query = c.req.valid("query");

      const find: any = {};
      if (query.text) {
        find.$text = { $search: query.text };
      }
      const result = await listProducts({});
      return c.json(result);
    }
  )
  .get("/:id", async (c) => {
    // GET /book/:id
    const id = c.req.param("id");
    const data = await findProduct(id);
    return c.json({ data, error: null });
  })
  .put("/:id", zValidator("json", z.object({})), async (c) => {
    // GET /book/:id
    const id = c.req.param("id");
    const data = c.req.valid("json");
    const res = await updateProduct(id, data);
    return c.json({ data: res, error: null });
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        title: z.string(),
        poster: z.string(),
        price: z.number(),
        discount: z.number().optional(),
        user: z.string(),
      })
    ),
    async (c) => {
      const body = await c.req.valid("json");
      const result = await createProduct(body);
      return c.json(result);
    }
  );

export default products;
