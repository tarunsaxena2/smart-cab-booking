const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database('database.db', (err) => {
    if(err) console.error(err.message);
    else console.log('Connected to SQLite database.');
});

// Create tables if they don't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS rides (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        pickup TEXT,
        dropoff TEXT,
        time TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ride_id INTEGER,
        card TEXT,
        expiry TEXT,
        cvv TEXT,
        FOREIGN KEY(ride_id) REFERENCES rides(id)
    )`);
});

// --- Signup API ---
app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;
    const stmt = db.prepare(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`);
    stmt.run(name, email, password, function(err){
        if(err) return res.json({ success: false, message: err.message });
        res.json({ success: true, userId: this.lastID });
    });
});

// --- Login API ---
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
        if(err) return res.json({ success: false, message: err.message });
        if(row) res.json({ success: true, userId: row.id, name: row.name });
        else res.json({ success: false, message: 'Invalid credentials' });
    });
});

// --- Book Ride API ---
app.post('/api/book', (req, res) => {
    const { userId, pickup, dropoff, time } = req.body;
    const stmt = db.prepare(`INSERT INTO rides (user_id, pickup, dropoff, time) VALUES (?, ?, ?, ?)`);
    stmt.run(userId, pickup, dropoff, time, function(err){
        if(err) return res.json({ success: false, message: err.message });
        res.json({ success: true, rideId: this.lastID });
    });
});

// --- Payment API ---
app.post('/api/payment', (req, res) => {
    const { rideId, card, expiry, cvv } = req.body;
    const stmt = db.prepare(`INSERT INTO payments (ride_id, card, expiry, cvv) VALUES (?, ?, ?, ?)`);
    stmt.run(rideId, card, expiry, cvv, function(err){
        if(err) return res.json({ success: false, message: err.message });
        res.json({ success: true });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
