const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const bcrypt = require('bcrypt'); // Recomendado para almacenar contraseñas de manera segura

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

// Asegurar que la conexión a la base de datos esté disponible antes de configurar los endpoints
client.connect().then(() => {
    // Endpoint para obtener datos de la colección FJ2024
    app.get('/api/data', async (req, res) => {
        try {
            const collection = db.collection("FJ2024"); // Colección de prueba
            const data = await collection.find({}).toArray();
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });

    // Endpoint para obtener todos los usuarios
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

    // Endpoint para crear un nuevo usuario
    app.post('/api/users/create', async (req, res) => {
        try {
            const { username, email, password } = req.body;
            // const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña
            const user = { username, email, password, favoriteOffers: [] };
            const collection = db.collection("users");
            const result = await collection.insertOne(user);
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });

    // Endpoint para obtener el usuario actual
    app.get('/api/current-user', async (req, res) => {
        try {
            const userId = req.userId;
            const collection = db.collection("users");
            const user = await collection.findOne({ _id: new ObjectId(userId) });

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

    // Endpoint para autenticación de usuarios
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

    // Endpoint para añadir una oferta a los favoritos del usuario
    app.post('/api/users/favorite', async (req, res) => {
        try {
            const { userId, offerId } = req.body;
    
            //console.log("Received request to add favorite offer");
            //console.log("userId:", userId);
            //console.log("offerId:", offerId);
    
            if (!ObjectId.isValid(userId)) {
                console.error("Invalid userId");
                return res.status(400).json({ success: false, message: "Invalid userId" });
            }
    
            const collection = db.collection("users");
    
            const result = await collection.updateOne(
                { _id: new ObjectId(userId) }, // Convertir userId a ObjectId
                { $addToSet: { favoriteOffers: offerId } } // Añadir offerId al array favoriteOffers si no existe
            );
    
            if (result.modifiedCount > 0) {
                res.status(200).json({ success: true, message: "Offer added to favorites." });
            } else {
                res.status(404).json({ success: false, message: "User not found or offer already in favorites." });
            }
        } catch (error) {
            console.error("Error adding favorite offer:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    });

    app.get('/api/users/favorite/:userId', async (req, res) => {
        try {
            const { userId } = req.params;
    
            if (!ObjectId.isValid(userId)) {
                return res.status(400).json({ success: false, message: "Invalid userId" });
            }
    
            const collection = db.collection("users");
            const user = await collection.findOne({ _id: new ObjectId(userId) });
    
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
    
            const offersCollection = db.collection("FJ2024"); 
            const favoriteOffers = await offersCollection.find({ _id: { $in: user.favoriteOffers.map(id => new ObjectId(id)) } }).toArray();
    
            res.status(200).json({ success: true, favoriteOffers });
        } catch (error) {
            console.error("Error fetching favorite offers:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    });

    // Endpoint para eliminar una oferta de los favoritos del usuario
    app.post('/api/users/remove-favorite', async (req, res) => {
        try {
            const { userId, offerId } = req.body;

            if (!ObjectId.isValid(userId)) {
                return res.status(400).json({ success: false, message: "Invalid userId" });
            }

            const collection = db.collection("users");

            const result = await collection.updateOne(
                { _id: new ObjectId(userId) },
                { $pull: { favoriteOffers: offerId } } // Eliminar offerId del array favoriteOffers
            );

            if (result.modifiedCount > 0) {
                res.status(200).json({ success: true, message: "Offer removed from favorites." });
            } else {
                res.status(404).json({ success: false, message: "User not found or offer not in favorites." });
            }
        } catch (error) {
            console.error("Error removing favorite offer:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    });
    

    // Start the server
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
