import express from 'express';
import bodyParser from 'body-parser';
import { usersRouter } from './routes/users';
import { uploadRouter } from './routes/upload';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/upload', uploadRouter);

export { app };
