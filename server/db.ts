import pg from "pg";
const db_host = process.env["db_host"];
const db_pass = process.env["db_pass"];
const db_port = process.env["db_port"];
const db_user = process.env["db_user"];
const db_name = process.env["db_name"];
const { Pool } = pg;
const pool = new Pool({
  user: db_user, // default process.env.PGUSER || process.env.USER
  password: db_pass, //default process.env.PGPASSWORD
  host: db_host, // default process.env.PGHOST
  port: Number(db_port), // default process.env.PGPORT
  database: db_name, // default process.env.PGDATABASE || user
});

export const query = async (text, params) => {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('executed query', { text, duration, rows: res.rowCount })
    return res
  }
  let lastQuery:unknown[]=[]
  export const getClient = async () => {
    const client = await pool.connect()
    const query = client.query
    const release = client.release
    // set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
      console.error('A client has been checked out for more than 5 seconds!')
      console.error(`The last executed query on this client was: ${lastQuery}`)
    }, 5000)
    // monkey patch the query method to keep track of the last query executed
    client.query = (...args) => {
      lastQuery = args
      return query.apply(client, args)
    }
    client.release = () => {
      // clear our timeout
      clearTimeout(timeout)
      // set the methods back to their old un-monkey-patched version
      client.query = query
      client.release = release
      return release.apply(client)
    }
    return client
  }

export default {pool,query,getClient}