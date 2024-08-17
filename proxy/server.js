// server.js
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PROXY_PORT || 5000;

// Example API route
app.get('/api/data', async (req, res) => {
  try {
    const apiResponse = await fetch('https://external-api.com/data', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`
      }
    });

    if (!apiResponse.ok) {
      throw new Error('Failed to fetch data from external API');
    }

    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy Server is running on http://localhost:${PORT}`);
});
