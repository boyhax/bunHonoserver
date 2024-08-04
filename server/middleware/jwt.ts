import { jwt } from 'hono/jwt'

const secret = process.env['jwt_secret'] as string


export default jwt({
  secret,
})
