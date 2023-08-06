// Exposing an API to compile a postgREST request to SQL without executing, so we can use it in a FaaS environment.
import compile from "serverless-postgrest";
import { Pool } from "pg";
const pool = new Pool();

export default async function handler(req, res) {
  const restRequest = req.query;
  const sql = compile(restRequest);
  const rows = await pool.query(sql);
  res.json(rows);
}
