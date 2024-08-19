import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const fetchData = async (url, options, res) => {
  try {
    // Add the API key to the headers
    options.headers = {
      ...options.headers,
      [process.env.API_KEY_NAME]: process.env.API_KEY,
    };

    const apiResponse = await fetch(url, options);

    if (!apiResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default fetchData;
