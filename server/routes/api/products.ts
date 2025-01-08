import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { findProduct, listProducts } from "@/services/products";

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
  });

export default products;
