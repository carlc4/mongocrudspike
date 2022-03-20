const { MongoClient } = require("mongodb"); // imports Mongo

async function main() {
  const uri = "INSERT MONOG URI HERE"; // url of the MongoDB atlas DB and auth

  const client = new MongoClient(uri); // invokes mongo as client

  try {
    await client.connect();
    await createMultipleListings(client, [
      // this adds multiple entries to the db under airbnb collection.
      {
        name: "Small house", // note that each item does NOT need to have every key-value pair unlike in relational databases. You can add schema validation rules if you prefer.
        summary: "A little house",
        property_type: "House",
        bedrooms: 1,
        bathrooms: 0,
      },
      {
        name: "A garage",
        summary: "leaky old garage",
        property_type: "Garage",
      },
      {
        name: "Outhouse",
        bathrooms: 1,
      },
    ]);
  } catch (e) {
    // error block
    console.log(e);
  } finally {
    await client.close(); // close client connected after operations completed
  }
}

main().catch(console.error);

async function createMultipleListings(client, newListings) {
  const results = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertMany(newListings);

  console.log(
    `${results.insertedCount} new listings created with the following id:`
  );
  console.log(results.insertedIds);
}
