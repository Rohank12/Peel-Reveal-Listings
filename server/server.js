// node server
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { spawn } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'

dotenv.config()
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

// Route to handle POST request for searching employees by first name
app.post('/employees/search', async (req, res) => {
    try {
        const { firstName } = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const query = { firstName: { $regex: new RegExp(firstName, 'i') } };
        const results = await collection.find(query).toArray();
        res.json(results);
    } catch (error) {
        console.error('Error searching employees:', error);
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

app.get('/employees/jobs', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const jobs = await collection.distinct("jobRole");
        res.json(jobs)
    } catch (err) {
        console.error("Error:", err)
    }
});

app.get('/employees/locations', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const locations = await collection.distinct("location");
        res.json(locations)
    } catch (err) {
        console.error("Error:", err)
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

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const employee = await collection.findOne({
            "loginDetails.username": username,
            "loginDetails.password": password
        });
        if (employee) {
            res.status(200).json(employee) 
        } else {
            res.status(401).json({message: "Authentication Failed"});
        }
    } catch (err) {
        console.error("Login Error:", err)
    }
});

app.post('/predict', async (req, res) => {
    const { jobRole, location } = req.body;
    
    // getting the script path defined in .env
    let scriptPath = process.env.SCRIPT_PATH
    scriptPath = path.normalize(scriptPath)
    
    // getting the location of the script in .env
    let cwdPath = process.env.CWD_PATH
    cwdPath = path.normalize(cwdPath)

    const pythonProcess = spawn('python', [scriptPath, jobRole, `${location}`], { cwd: cwdPath });
    pythonProcess.stdout.on('data', (data) => {
        res.json(data.toString())
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(data.toString())
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});