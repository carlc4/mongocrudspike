const { MongoClient } = require("mongodb"); // imports Mongo

async function main() {
  const uri = "INSERT MONOG URI HERE"; // url of the MongoDB atlas DB and auth

  const client = new MongoClient(uri); // invokes mongo as client

  try {
    await client.connect();
    await findOneListingByName(client, "Small house");
  } catch (e) {
    // error block
    console.log(e);
  } finally {
    await client.close(); // close client connected after operations completed
  }
}

main().catch(console.error);

async function findOneListingByName(client, nameOfListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .findOne({ name: nameOfListing });

  if (result) {
    console.log(`Found a listing: ${nameOfListing}`);
    console.log(result);
  } else {
    console.log(`No listings found with the name ${nameOfListing}`);
  }
}
