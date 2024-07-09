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
});
async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        conn = await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        db = client.db("OFERTASERVICIOSOCIAL"); // Set the database here after successful connection
    } catch (e){
        console.log(e);
    }
}
run().catch(console.dir);

// Endpoint to get data from FJ2024 collection
app.get('/api/data', async (req, res) => {
    try {
        const collection = db.collection("FJ2024"); // Test collection
        const data = await collection.find({}).toArray();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const collection = db.collection("users"); 
        const users = await collection.find({}).toArray(); 
        res.status(200).json(users); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Endpoint to create a new user
app.post('/api/users/create', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = { username, email, password };
        const collection = db.collection("users");
        const result = await collection.insertOne(user);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.get('/api/current-user', async (req, res) => {
    try {
        const userId = req.userId; 

        const collection = db.collection("users");
        const user = await collection.findOne({ _id: userId });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const collection = db.collection("users");
        const user = await collection.findOne({ email });

        if (user && user.password === password) {
            res.status(200).json({
                success: true,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
        } else {
            res.status(401).json({ success: false, error: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
