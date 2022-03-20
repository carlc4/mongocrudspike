const { MongoClient } = require("mongodb");

async function main() {
  const uri = "INSERT MONG0 URI HERE";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await deleteListingsScrapedBeforeDate(client, new Date("2019-02-15"));
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

// deleteMany will delete all matching documents

async function deleteListingsScrapedBeforeDate(client, date) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .deleteMany({ last_scraped: { $lt: date } }); // $lt = later than
  console.log(`${result.deletedCount} documents were deleted`);
}
