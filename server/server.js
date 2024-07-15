// node server
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
const PORT = 3000;

// start endpoint
app.get('/', async (req, res) => {
    try {
        res.json("HELLO WORLD")
    } catch (err) {
        console.error("Error:", err);
    }
});

app.post('/search', async (req, res) => {
    try {
        const { searchTerm } = req.body;
        console.log(searchTerm);
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const regex = new RegExp(searchTerm, 'i'); // Create a case-insensitive regular expression
        const employees = await collection.find({ 'firstName': regex }).toArray();
        res.json(employees);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error searching for socks');
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

app.get('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const employee = await collection.findOne({"id": +id});
        res.json(employee)
    } catch (err) {
        console.error(`Error finding employee with ${id}: ${err}`)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});