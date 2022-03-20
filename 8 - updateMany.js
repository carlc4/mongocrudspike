const { MongoClient } = require("mongodb");

async function main() {
  const uri = "INSERT MONG0 URI HERE";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await updateAllListingsToHavePropertyType(client);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function updateAllListingsToHavePropertyType(client) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateMany(
      { property_type: { $exists: false } }, // checks to see if ALL records have the key
      { $set: { property_type: "Unknown" } } // adds the new key to all records that do NOT have the key already
    );
  console.log(`${result.matchedCount} matched the query criteria`);
  console.log(`${result.modifiedCount} documents were updated`);
}
