const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "tobdhen",
    password: "1234",
    database: "point_of_sale_db",
  },
});

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const businessId = searchParams.get("store_id");
  const data = await (businessId === null
    ? knex("users").select("*")
    : knex("users").where("store_id", businessId).select("*"));
  return Response.json({ data });
}

export async function POST(req) {
  const body = await req.json();
  const { firstname, lastname, salary, storeId } = body;
  const data = await knex("users").insert({
    firstname: firstname,
    lastname: lastname,
    salary: salary,
    store_id: storeId,
  });
  return Response.json({ data });
}
