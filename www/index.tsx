import { useState } from 'hono/jsx'

function Counter() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    )
}

export default function App() {
    return (
        <html>
            <body>
                <Counter />
            </body>
        </html>
    )
}

