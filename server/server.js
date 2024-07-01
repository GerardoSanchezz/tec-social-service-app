// Reminder to add to code to start server.js with npx expo start

const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Replace the placeholder URI below with your MongoDB Atlas connection string
const uri = "mongodb+srv://a01639914:lVaJd4sGodMyPeBT@appcatalogo.fgucp1z.mongodb.net/?retryWrites=true&w=majority&appName=APPCatalogo";

let db;
let conn;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);
async function run() {
    try {
    // Connect the client to the server (optional starting in v4.7)
    conn = await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (e){
        console.log(e);
    }
 }
run().catch(console.dir);
db = client.db("sample_analytics");

app.get('/api/data', async (req, res) => {
    try {
      const collection = db.collection("accounts"); // Test collection
      const data = await collection.find({}).toArray();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

// It works on, go to http://localhost:3000/api/data
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

