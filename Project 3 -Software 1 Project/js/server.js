const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

// Initialize the Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Database connection setup
const connection = mysql.createConnection({
    host: '<REMOVED>', // database endpoint
    user: '<REMOVED>', // database username
    password: '<REMOVED>', // database password
    database: '<REMOVED>' // database name
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1); // Exit if connection fails
    }
    console.log('Connected to the database.');
});

// Route to handle user registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Validate the input
    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }

    try {
        // Check if the username already exists
        connection.query('SELECT * FROM Users WHERE username = ?', [username], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error checking username.");
            }

            if (results.length > 0) {
                return res.status(409).send("Username already exists.");
            }

            // Hash the password securely
            const hashedPassword = await bcrypt.hash(password, 12);

            // Insert the new user into the database
            connection.query(
                'INSERT INTO Users (username, password_hash) VALUES (?, ?)',
                [username, hashedPassword],
                (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Error creating account.");
                    }

                    res.status(201).send("Account created successfully!");
                }
            );
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Unexpected server error.");
    }
});

// Start the server
app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});
