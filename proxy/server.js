// server.js
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import account from './routes/account.js'; // Import the route

const app = express();
const PORT = process.env.PROXY_PORT || 5000;

app.use('/api/account', account); // Use the route

app.listen(PORT, () => {
  console.log(`Proxy Server is running on http://localhost:${PORT}`);
});
