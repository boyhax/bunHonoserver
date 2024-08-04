import { Hono } from "hono";
import { pb } from "../app";
import qs from "qs";

const record = new Hono();
record.get("/", async (c) => {
  const serachparams = new URL(c.req.url).searchParams.toString();
  const filter = qs.parse(serachparams) ;
  const place = filter.place 
  const records = await pb.collection("books").getFullList({
    sort: "-created",
    filter: `places ~ "${place}"`,
  });

  return c.json(records);
});
record.get("/:id", async (c) => {
  const id = c.req.param("id");
  const record = await pb.collection("books").getOne(id);

  return c.json(record);
});
record.post("/", async (c) => {
  const body = await c.req.json();
  const record = await pb.collection("books").create(body);

  return c.json(record);
});

export default record;
