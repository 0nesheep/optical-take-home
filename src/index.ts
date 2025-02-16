import express from 'express';
import { seedDatabase } from './db';

const app = express();
const port = 3000;

app.listen(port, () => {
  seedDatabase();
  console.log(`Server is now on http://localhost:${port}`);
});
