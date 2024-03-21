const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.PG_URL,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  },
});

export async function GET(req, { params }) {
  const data = await knex("products")
    .join("stocks", "stocks.product_id", "=", "products.id")
    .where("stocks.amount", ">", 0)
    .where("stocks.store_id", params.id)
    .select("*");
  return Response.json({ data });
}
