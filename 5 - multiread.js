const { MongoClient } = require("mongodb"); // imports Mongo

async function main() {
  const uri = "INSERT MONOG URI HERE"; // url of the MongoDB atlas DB and auth

  const client = new MongoClient(uri); // invokes mongo as client

  try {
    await client.connect();
    await findListingsWithMinMultiCriteria(client, {
      // criteria are fed in as an object
      minBedrooms: 5,
      minBathrooms: 2,
      maxNumberOfResults: 5,
    });
  } catch (e) {
    // error block
    console.log(e);
  } finally {
    await client.close(); // close client connected after operations completed
  }
}

main().catch(console.error);

async function findListingsWithMinMultiCriteria(
  client,
  {
    minBedrooms = 0, // default values if none specified
    minBathrooms = 0,
    maxNumberOfResults = Number.MAX_SAFE_INTEGER,
  } = {}
) {
  const cursor = client // when using find, a cursor is returned
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .find({
      bedrooms: { $gte: minBedrooms },
      bathrooms: { $gte: minBathrooms },
    })
    .sort({ last_review: -1 })
    .limit(maxNumberOfResults);

  const results = await cursor.toArray();

  if (results.length > 0) {
    console.log(
      `Found listing(s) with at least ${minBathrooms} bathrooms and ${minBedrooms} bedrooms:`
    );
    results.forEach((result, i) => {
      date = new Date(result.last_review).toDateString();
      console.log();
      console.log(`${i + 1}. name: ${result.name}`);
      console.log(` _id: ${result._id}`);
      console.log(` bedrooms: ${result.bedrooms}`);
      console.log(` bathrooms: ${result.bathrooms}`);
      console.log(
        ` most recent review date: ${new Date(
          result.last_review
        ).toDateString()}`
      );
    });
  } else {
    console.log(`No listings found for those criteria`);
  }
}
