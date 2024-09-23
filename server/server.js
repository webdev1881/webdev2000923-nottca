import express from 'express';
import cors from 'cors';
import jsonData from './api/categories.js';

const app = express();

const port = 3001;

app.use(cors());

app.get('/api/categories', (req, res) => {
  res.json(jsonData);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
