// node server
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
const PORT = 3000;

// start endpoint
app.get('/', async (req, res) => {
    try {
        res.json("HELLO WORLD")
    } catch (err) {
        console.error("Error:", err);
    }
});

app.get('/employees/', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const employees = await collection.find({}).toArray();
        res.json(employees)
    } catch (err) {
        console.error("Error:", err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});