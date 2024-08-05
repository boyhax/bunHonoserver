
// import { createBunWebSocket } from "hono/bun";
import app from "./server/app";

// const { upgradeWebSocket, websocket } = createBunWebSocket()

// app.get(
//     '/ws',
//     upgradeWebSocket((c) => {
//       return {
//         onMessage(event, ws) {
//           console.log(`Message from client: ${event.data}`)
//           ws.send('Hello from server!')
//         },
//         onClose: () => {
//           console.log('Connection closed')
//         },
//       }
//     })
//   )

export default {  
    port: 3000, 
    fetch: app.fetch, 
  } 



