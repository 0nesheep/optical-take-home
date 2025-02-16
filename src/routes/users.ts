import { Router, Request, Response } from 'express';
import { database } from '../db';

export const usersRouter = Router();

usersRouter.get('/', (req: Request, res: Response) => {
  const { min = '0.0', max = '4000.0', offset = '0', limit, sort } = req.query;
  const minSalary = parseFloat(min as string) || 0.0;
  const maxSalary = parseFloat(max as string) || 4000.0;
  const offsetVal = parseInt(offset as string) || 0;
  const limitVal = limit !== undefined ? parseInt(limit as string) : undefined;
  const sortTarget = (sort as string)?.toUpperCase() || '';

  // Parse database
  let userList = Array.from(database, ([name, salary]) => ({ name, salary }));

  let filteredUsers = userList.filter(
    (user) => user.salary >= minSalary && user.salary <= maxSalary,
  );

  if (sortTarget === 'NAME') {
    filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortTarget === 'SALARY') {
    filteredUsers.sort((a, b) => a.salary - b.salary);
  } else if (sortTarget !== '') {
    return res
      .status(400)
      .json({ error: `Invalid sort parameter ${sortTarget}` });
  }

  if (offsetVal > 0) {
    filteredUsers = filteredUsers.slice(offsetVal);
  }

  if (limitVal !== undefined && limitVal >= 0) {
    filteredUsers = filteredUsers.slice(0, limitVal);
  }

  return res.status(200).json({
    results: filteredUsers,
  });
});
