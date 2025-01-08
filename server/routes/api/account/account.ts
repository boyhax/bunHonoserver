import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { updateProduct } from "@/services/products";
import { Product } from "@/models/product";
import { JwtMiddlware } from "@/middleware/jwt";
import { User } from "@/models/user";
import { streamSSE } from "hono/streaming";
import getPromise from "@/utils/getpromise";
import mongoose from "mongoose";

const account = new Hono()
  .use(JwtMiddlware())
  .get("/", async (c) => {
    const { id } = c.get("jwtPayload");
    const data = await User.findById(id)
      .populate({ path: "products", foreignField: "user", localField: "_id" })
      .exec();
    return c.json({ data, error: null });
  })
  .put(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.string().optional(),
        avatar: z.string().optional(),
      })
    ),
    async (c) => {
      const { id } = c.get("jwtPayload");
      const values = c.req.valid("json");
      const data = await getPromise(
        User.findOneAndUpdate({ _id: id }, values, {
          new: true,
        }).exec()
      );

      return c.json(data);
    }
  )
  .get(
    "/products",
    zValidator(
      "query",
      z.object({
        text: z.string().optional(),
      })
    ),
    async (c) => {
      const query = c.req.valid("query");
      const { id } = c.get("jwtPayload");
      const find: any = {};
      if (query.text) {
        find.$text = { $search: query.text };
      }
      const { error, data } = await getPromise(
        Product.find({ user: new mongoose.Types.ObjectId(id) }).exec()
      );

      return c.json({ success: !error, message: "", data });
    }
  )

  .put("products/:id", zValidator("json", z.object({})), async (c) => {
    // GET /book/:id
    const id = c.req.param("id");
    const data = c.req.valid("json");
    const res = await updateProduct(id, data);
    return c.json({ data: res, error: null });
  })
  .post(
    "products",
    // zValidator(
    //   "form",
    //   z.object({
    //     name: z.string(),
    //     description: z.string(),
    //     category: z.string(),
    //     images: z.array(z.instanceof(File)).nonempty(),
    //     price: z.number(),
    //     discount: z.number().optional(),
    //   })
    // ),
    async (c) => {
      const form = await c.req.formData();
      const user = c.get("jwtPayload").id;
      const values: any = {
        name: form.get("name"),
        description: form.get("description"),
        price: form.get("price"),
        discount: form.get("discount"),
      };
      const images = form.get("images") as unknown as File | File[];
      // const buffer = images[0].arrayBuffer();
      // uploadFile()
      if (images instanceof File) {
        console.log("file :>> ");
      } else if (images instanceof Array) {
        console.log("file[]");
      }

      const { error, data } = await getPromise(
        Product.create({ ...values, user })
      );
      console.log("error :>> ", error, data);
      return c.json({ success: !error, message: error ? error : "", data });
    }
  )

  .get("sse", async (c) => {
    return streamSSE(c, async (stream) => {
      // eslint-disable-next-line no-constant-condition
      const { id: user } = c.get("jwtPayload");
      Product.watch([{ user: { $eq: user } }]).on("change", async (change) => {
        console.log(change);
        await stream.writeSSE({
          data: change.fullDocument,
          event: "insert_product",
          id: change.id,
        });
      });
    });
  });

export default account;
