import { Hono } from "hono";
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { timeout } from 'hono/timeout';
import api from "./routes/api/api";
import connectDB from "./config/db";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";


import clientRoute from "./routes/api/client";
type Bindings = {
    ss: string
}
connectDB();
const app = new Hono<{ Bindings: Bindings }>()
    .use('*',
        logger(),
        prettyJSON(),
        cors({
            origin: '*',
            allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        })
    )
    .use('/', timeout(5000))
    .use('/public/*', serveStatic({ root: './' }))
    .route("/api", api)
    .get('/', clientRoute)

export default app;

export type ApiRoutes = typeof api
