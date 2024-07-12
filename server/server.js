// node server
import express from 'express';

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});