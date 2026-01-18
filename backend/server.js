const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 2000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'amrit', // Replace with your MySQL username
    password: '1234', // Replace with your MySQL password
    database: 'events_db' // Ensure this matches the name of your database
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database');
});

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// API route to create an event
app.post('/api/events', upload.single('image'), (req, res) => {
    const { title, startDate, endDate, category, venue, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
   

    const query = `
        INSERT INTO events (title, start_date, end_date, category, venue, description, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [title, startDate, endDate, category, venue, description, imageUrl], (err, result) => {
        if (err) {
            console.error('Error inserting event:', err);
            return res.status(500).send('Server error');
        }
        res.status(201).json({ message: 'Event created successfully', eventId: result.insertId });
    });
});

// API route to get all events
app.get('/api/events', (req, res) => {
    db.query('SELECT * FROM events', (err, results) => {
        if (err) {
            console.error('Error fetching events:', err);
            return res.status(500).send('Server error');
        }
        res.json(results);
    });
});
// API route to get a specific event by ID
app.get('/api/events/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM events WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching event:', err);
            return res.status(500).send('Server error');
        }
        res.json(results[0]); // Return the first event found
    });
});


// API route to update an event
app.put('/api/events/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { title, startDate, endDate, category, venue, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    console.log(`Updating event with ID: ${id}`);
    console.log('Data:', { title, startDate, endDate, category, venue, description, imageUrl });

    const query = `
        UPDATE events SET title = ?, start_date = ?, end_date = ?, category = ?, venue = ?, description = ?, image_url = ?
        WHERE id = ?
    `;

    db.query(query, [title, startDate, endDate, category, venue, description, imageUrl, id], (err, result) => {
        if (err) {
            console.error('Error updating event:', err);
            return res.status(500).send('Server error');
        }
        res.json({ message: 'Event updated successfully' });
    });
});

// API route to delete an event
app.delete('/api/events/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM events WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting event:', err);
            return res.status(500).send('Server error');
        }
        res.json({ message: 'Event deleted successfully' });
    });
});

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
