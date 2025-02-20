import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoute from './routes/authRoute';

dotenv.config();

const app = express();

app.use(morgan('combined'));
app.use(express.json());

app.use('/api', authRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
