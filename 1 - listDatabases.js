const { MongoClient } = require("mongodb"); // imports Mongo

async function main() {
  const uri = "INSERT MONOG URI HERE"; // url of the MongoDB atlas DB and auth

  const client = new MongoClient(uri); // invokes mongo as client

  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close;
  }
}

main().catch(console.error);

async function listDatabases(client) {
  const databaseList = await client.db().admin().listDatabases(); // retrieves database list from the MongoDB
  // db query is structured as database > collection > operation

  console.log("Databases");
  databaseList.databases.forEach((db) => {
    console.log(db.name);
  });
}
