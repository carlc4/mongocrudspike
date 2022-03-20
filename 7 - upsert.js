const { MongoClient } = require("mongodb");

async function main() {
  const uri = "INSERT MONGO URI HERE";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await upsertListingByName(client, "A garage", {
      // upsert is a function which looks if the listing exists, if it does it amends the existing data, if it doesn't it ADDs the data as a new record
      name: "A garage",
      bedrooms: 1,
    });
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function upsertListingByName(client, nameOfListing, updatedListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateOne(
      { name: nameOfListing },
      { $set: updatedListing },
      { upsert: true }
    ); //
  console.log(`${result.matchedCount} documents matched the query criteria`);
  if (result.upsertedCount > 0) {
    console.log(`Documents were inserted with the ID ${result.upsertedId}`);
  } else {
    console.log(`${result.modifiedCount} documents were updated`);
  }
}
