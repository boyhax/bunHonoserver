import { Hono } from "hono";
import { serveStatic } from 'hono/bun'
import type { FC } from 'hono/jsx'

// import book from "./routes/book";
// import listing from "./routes/listing";
// import mongoose from "mongoose";
import animal from "./routes/animal";
import {createClient} from '@supabase/supabase-js'
// import record from "./routes/record";
// import { Client, Databases } from 'appwrite';
import { timeout } from 'hono/timeout'
import Home from '../client/index.tsx'
import React from "react";

// export const client = new Client();
// export const database = new Databases(client)
// client
//     .setEndpoint('https://app.manazl.site/v1')
//     .setProject('669056a2000b7b457aef');
// // const mongoUrl = process.env['mongoUrl'] as string

// import PocketBase from 'pocketbase';
// import write from "./routes/writes";

// export const pb = new PocketBase('https://pocket.manazl.site');

//  pb.health.check().then((health)=>{
//   console.log(health)
//  })

// const records = await pb.collection('books').getFullList({
//   sort: '-created',
// });

const Layout: FC = (props) => {
  return (
    <html>
      <body><Home/></body>
      
    </html>
  )
}
const app = new Hono();
app.use('/',timeout(5000))
app.use('*', serveStatic({ root: '../client' }))
app.get("/", async (c) => {
  return c.html(<Layout/>);
});

app.get("/hello", (c) => c.text("Hello9 Bun from hello route"));
// app.route("/book", book);
// app.route("/listing", listing);
app.route("/animal", animal);
// app.route("/record", record);
// app.route("/write", write);
// mongoose.connect(mongoUrl);

// mongoose.connection.on("connected", () => {
//   console.log("connected to mongodb oh hell yea");
// });

// mongoose.connection.on("error", () => {
//   console.log("error connecting to mongodb oh hell yea");
// });


export const supabase = createClient('https://api.manazl.site','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTcyMDcyNzQwMCwiZXhwIjo0ODc2NDAxMDAwLCJyb2xlIjoiYW5vbiJ9.yQ-1J_L0WxGoeclgmzWGLGNLloWMiovTzaRucHbCcM4')

export default app;

