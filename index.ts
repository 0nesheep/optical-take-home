import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

interface User {
  name: string;
  salary: number;
}

const mockUsers: User[] = [
  { name: 'Alex', salary: 3000.0 },
  { name: 'Bryan', salary: 3500.0 },
  { name: 'Chris', salary: 2000.0 },
  { name: 'Dave', salary: -100.0 },
];

app.get('/users', (req: Request, res: Response) => {
  const { min = '0.0', max = '4000.0', offset = '0', limit, sort } = req.query;
  const minSalary = parseFloat(min as string) || 0.0;
  const maxSalary = parseFloat(max as string) || 4000.0;
  const offsetVal = parseInt(offset as string) || 0;
  const limitVal = limit !== undefined ? parseInt(limit as string) : undefined;
  const sortTarget = (sort as string)?.toUpperCase() || '';
});
