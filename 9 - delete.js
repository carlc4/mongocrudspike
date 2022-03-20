const { MongoClient } = require("mongodb");

async function main() {
  const uri = "INSERT MONG0 URI HERE";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await deleteListingByName(client, "A garage");
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

// deleteOne will delete the FIRST matching document

async function deleteListingByName(client, nameOfListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .deleteOne({ name: nameOfListing });
  console.log(`${result.deletedCount} documents were deleted`);
}
