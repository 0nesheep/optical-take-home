import { Router, Request, Response } from 'express';
import { database } from '../db';

export const usersRouter = Router();

usersRouter.get('/', (req: Request, res: Response) => {
  const { min = '0.0', max = '4000.0', offset = '0', limit, sort } = req.query;
  const minStr = (min ?? '0.0') as string;
  const maxStr = (max ?? '4000.0') as string;
  const offsetStr = (offset ?? '0') as string;
  const limitStr = limit as string | undefined;

  const minSalary = parseFloat(minStr);
  const maxSalary = parseFloat(maxStr);
  const offsetVal = parseInt(offsetStr, 10);
  const limitVal = limitStr !== undefined ? parseInt(limitStr, 10) : undefined;

  // Validate numeric values
  if (isNaN(minSalary)) {
    return res.status(400).json({ error: `Invalid min parameter: ${minStr}` });
  }
  if (isNaN(maxSalary)) {
    return res.status(400).json({ error: `Invalid max parameter: ${maxStr}` });
  }
  if (isNaN(offsetVal)) {
    return res
      .status(400)
      .json({ error: `Invalid offset parameter: ${offsetStr}` });
  }
  if (limitVal !== undefined && isNaN(limitVal)) {
    return res
      .status(400)
      .json({ error: `Invalid limit parameter: ${limitStr}` });
  }

  // Parse database
  let userList = Array.from(database, ([name, salary]) => ({ name, salary }));

  let filteredUsers = userList.filter(
    (user) => user.salary >= minSalary && user.salary <= maxSalary,
  );

  const sortTarget = (sort as string)?.toUpperCase() || '';

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
