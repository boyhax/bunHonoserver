import { Hono } from "hono";
import { supabase } from "../app";
// import qs from "qs";

const animal = new Hono();
animal.get("/", async (c) => {
  // const serachparams = new URL(c.req.url).searchParams.toString();
  // const filter = qs.parse(serachparams) ;
  // const places = (filter.place as string).split('.') ;
  const res = await supabase.from("books").select('*',{count:'exact'})
  // .contains('places',places);

  return c.json(res);
});
animal.get("/:id", async (c) => {
  const id = c.req.param("id");
  const res = await supabase.from("books").select().eq("id", id);

  return c.json(res);
});
animal.post("/", async (c) => {
  const body = await c.req.json();
  const res = await supabase.from("books").insert(body).select();

  return c.json(res);
});

export default animal;
