const { MongoClient } = require("mongodb"); // imports Mongo

async function main() {
  const uri = "INSERT MONOG URI HERE"; // url of the MongoDB atlas DB and auth

  const client = new MongoClient(uri); // invokes mongo as client

  try {
    await client.connect();
    await updateListingByName(client, "Small house", { bedrooms: 6, beds: 8 }); //update takes 2 args, the search param to find the listing to update and the object to indicate what is being updated.
  } catch (e) {
    // error block
    console.log(e);
  } finally {
    await client.close(); // close client connected after operations completed
  }
}

main().catch(console.error);

async function updateListingByName(client, nameOfListing, updatedListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateOne({ name: nameOfListing }, { $set: updatedListing }); // $set replaces only the info specified by keys on the new object, any existing keys that aren't explicitally stated will be retained
  console.log(`${result.matchedCount} documents matched the criteria`);
  console.log(`${result.modifiedCount} documents were updated`);
}
