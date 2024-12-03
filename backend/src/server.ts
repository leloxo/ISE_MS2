import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port: number = 5000;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Test');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});