import { Hono } from "hono";
import admin, { type ServiceAccount } from "firebase-admin";
import { User } from "@/models/user";
import { HTTPException } from "hono/http-exception";

interface Notification {
  id: string;
  user_id: string;
  body: string;
  title: string;
  url: string;
}



// see {@link https://stackoverflow.com/a/70281142}
const { privateKey } = JSON.parse(process.env.PRIVATE_KEY as string)

const serviceAccount: ServiceAccount = {
  privateKey,
  projectId: process.env.PROJECT_ID,
  clientEmail: process.env.CLIENT_EMAIL,
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL:
    "https://mandubk-370d7-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const push = new Hono();

push.post("/", async (c) => {
  const {title,body,user_id}:Notification = await c.req.json();
  const user = await User.findById(user_id,"fcm").exec()
  if (!user || !user.fcm) {
    
    throw new HTTPException(201,{message:"user fcm token not found"})
  }
  const message = {
    notification: {
      title,
      body,
    },
    token: user.fcm,
  };

  const res = await admin
    .messaging()
    .send(message)
    .then((response: unknown) => {
      console.log("Successfully sent notification: ", response);
      return { message: "success" };
    })
    .catch((error: unknown) => {
      console.log("Error sending message: ", error);
      return { message: "notification send error" };
    });
  return new Response(JSON.stringify(res), {
    headers: { "Content-Type": "application/json" },
  });
});

export default push;
