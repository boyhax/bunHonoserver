import { Suspense, renderToReadableStream } from "hono/jsx/streaming";
import App from "../../../www";
export default function clientRoute(c) {
    const stream = renderToReadableStream(
        <html>
            <body>
                <Suspense fallback={<div>loading...</div>}>
                    <App />
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