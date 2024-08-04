import { Hono } from "hono";
import { query } from "../db";
import qs from "qs";
import isAnon from "../middleware/isAnon";
const listing = new Hono();

listing.get("/", async (c) => {
  const serachparams = new URL(c.req.url).searchParams.toString();
  const filter = qs.parse(serachparams);
  console.log("filter :>> ", filter);
  const result = await query(`select * from listings limit 10`, []);

  return c.json({ data: result.rows, count: result.rowCount, error: null });
});
listing.get("/:id", async (c) => {
  const id = c.req.param("id");
  const result = await query(`select * from listings where id=$1`, [id]);

  return c.json({ data: result.rows, count: result.rowCount, error: null });
});
listing.put("/:id", isAnon, (c) => c.text("update listing"));

listing.post("/", isAnon, async (c) => {
   c.body
  
});

export default listing;
