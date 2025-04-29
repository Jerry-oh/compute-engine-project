const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// NeonDB PostgreSQL Connection
const db = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_twx5qZ0fGmbK@ep-long-star-a1n48jzm-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: false, // Accept self-signed certificates
  },
});

// Connect to NeonDB
db.connect()
  .then(() => {
    console.log("Connected to NeonDB!");

    // Create User table if it doesn't exist
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS "User" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        age INT,
        hobby VARCHAR(255),
        job VARCHAR(255)
      );
    `;

    return db.query(createUserTableQuery);
  })
  .then(() => {
    console.log("User table is ready.");
  })
  .catch((err) => {
    console.error("Error connecting to NeonDB:", err);
    process.exit(1);
  });

// Routes
app.get("/api/v1/hello", (req, res) => {
  res.json({ message: "Cloud-Project Team!" });
});

// Fetch all users
app.get("/api/v1/users", async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "User"');
    res.json({ data: result.rows });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
