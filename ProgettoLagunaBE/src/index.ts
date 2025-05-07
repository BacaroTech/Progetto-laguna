import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios'; // Import axios for making HTTP requests

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Validate required environment variables for the database connection
const requiredEnvVars = ['DATABASE_PORT', 'DATABASE_USR', 'DATABASE_PASSWORD', 'DATABASE_NAME', 'DATABASE_HOST'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Optional: Setup database connection (Uncomment if you're going to use it)
import { Client } from 'pg';

const pool = new Client({
  user: process.env.DATABASE_USR,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
});

// Middlewares
app.use(cors());
app.use(express.json());

// Health check endpoint (fetching external data via axios)
app.get('/', async (req, res) => {
  const url = "https://dati.venezia.it/sites/default/files/dataset/opendata/livello.json";  // External URL to fetch data from

  try {
    // Fetch data from the external URL using axios
    const response = await axios.get(url);
    
    // If the request is successful, return the data
    res.json({
      status: 'success',
      message: 'Data retrieved successfully',
      data: response.data
    });
  } catch (error: any) {
    // Handle any errors during the HTTP request
    console.error('Error fetching data:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve data',
      error: error.message
    });
  }
});

// Start server and connect to the database
pool.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
      console.log('Database connection established');
    });
  })
  .catch((err: Error) => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  pool.end()
    .then(() => {
      console.log('Database connection closed');
      process.exit(0);
    })
    .catch((err: Error) => {
      console.error('Error closing database connection:', err);
      process.exit(1);
    });
});
