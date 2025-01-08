import { Hono } from "hono";
import { streamSSE } from "hono/streaming";

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
const sse = new Hono();
//   .get("/products", async (c) => {
//   return streamSSE(c, async (stream) => {
//     // eslint-disable-next-line no-constant-condition
//     await stream.write('data: {"name": "test"}\n\n');
//     await stream.sleep(5000);
//     await stream.write('data: {"name": "test after 15s"}');
//     await stream.close();
//     stream.onAbort(() => {
//       console.log("aborted");
//     });
//     // Product.watch().on("change", async (change) => {
//     //   await stream.writeSSE({
//     //     data: JSON.stringify(change.fullDocument),
//     //     event: "insert_product",
//     //     id: change.id,
//     //   });
//     // });
//   });
// });

export default sse;
