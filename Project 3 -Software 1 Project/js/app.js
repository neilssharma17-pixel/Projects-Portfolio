const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const mysql = require("mysql2");
require("dotenv").config({path: "../.env"});

const app = express();
const PORT = process.env.PORT || 3000;

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

// Endpoint to handle image uploads
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { title, description, user_id } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).send({ message: "No file uploaded." });
    }

    // Upload file to S3
    const s3Params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `tier_lists/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const uploadResult = await s3.upload(s3Params).promise();
    const imageUrl = uploadResult.Location;

    // Insert metadata into the database
    const query = "INSERT INTO tier_lists (user_id, title, description, image_url) VALUES (?, ?, ?, ?)";
    db.query(query, [user_id, title, description, imageUrl], (err, result) => {
      if (err) throw err;
      res.status(200).send({ message: "Image uploaded successfully!", imageUrl });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error uploading image." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
