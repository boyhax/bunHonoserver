import { ID, Query } from "appwrite";
import { Hono } from "hono";
import { database } from "../app";
import qs from "qs";



const write = new Hono();

write.get("/", async (c) => {
   const serachparams = new URL(c.req.url).searchParams.toString();
   const filter = qs.parse(serachparams) ;
   const places = (filter.place as string).split('.') ;
  try {
    

    const query = Query.contains('place',places)
    const data = await database.listDocuments('669056bb000dccecb896','669056c4001169712665',[query])
    return c.json({ data, error: null });
  } catch (error) {
    return c.json({ data:null, error: error });
  }

});
write.get("/:id", async (c) => {

  const id = c.req.param("id");
  try {
    const data = await database.getDocument('669056bb000dccecb896','669056c4001169712665',id)
    return c.json({ data, error: null });
  } catch (error) {
    return c.json({ data:null, error: error });
  }
});
write.post("/", async (c) => {

  const body = await c.req.json();
  
  try {
    const data = await database.createDocument('669056bb000dccecb896','669056c4001169712665',ID.unique(),body)
    return c.json({ data, error: null });
  } catch (error) {
    return c.json({ data:null, error: error });
  }
});

export default write;
