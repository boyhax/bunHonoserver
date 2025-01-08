import type { Context } from "hono";
import { Suspense, renderToReadableStream } from "hono/jsx/streaming";

export default function clientRoute(c: Context) {
    const stream = renderToReadableStream(
        <html>
            <body>
                <Suspense fallback={<div>loading...</div>}>
                    <h1 >hello from server</h1>
                </Suspense>
            </body>
        </html>
    )
    return c.body(stream, {
        headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'Transfer-Encoding': 'chunked',
        },
    })
}