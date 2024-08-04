import { createMiddleware } from 'hono/factory'
import { verify } from 'hono/jwt'
const secret = process.env['jwt_secret'] as string

const isServiceUser = createMiddleware(async (c, next) => {
  const apikey = c.req.header("apikey");

  if (!apikey) {
    return c.json({ data: null, error: { message: "apikey required" } });
  } else {
    try {
      const payload = await verify(apikey, secret);
      console.log("payload :>> ", payload);
      if (payload.role == "service_role") {
        next();
      }
    } catch (error) {
      return c.json({ data: null, error: { message: 'apikey is wrong' } });
    }
  }

});
export default isServiceUser
