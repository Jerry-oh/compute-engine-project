const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Pool
const db = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_twx5qZ0fGmbK@ep-long-star-a1n48jzm-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: false,
  },
});

// Handle pool-level errors
db.on("error", (err) => {
  console.error("Unexpected error on idle PostgreSQL client:", err.message);
});

// Ensure User table exists
const initDatabase = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS "User" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        age INT,
        hobby VARCHAR(255),
        job VARCHAR(255)
      );
    `);
    console.log("User table is ready.");
  } catch (err) {
    console.error("Error creating User table:", err.message);
  }
};

// Routes
app.get("/api/v1/hello", (req, res) => {
  res.json({ message: "Cloud-Project Team!" });
});

app.get("/api/v1/users", async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "User"');
    res.json({ data: result.rows });
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  await initDatabase();
});

// Handle uncaught errors to avoid crashing
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
});
