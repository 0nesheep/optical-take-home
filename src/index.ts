import { seedDatabase } from './db';
import { app } from './app';

const port = 3000;

app.listen(port, () => {
  seedDatabase();
  console.log(`Server is now on http://localhost:${port}`);
});
