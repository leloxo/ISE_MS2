import { Request, Response } from 'express';
import { populateDB } from '../scripts/populateDB';

export const importData = async (req: Request, res: Response) => {
    try {
        await populateDB();
        res.status(200).send('Database populated successfully!');
    } catch (error) {
        res.status(500).send({ message: 'Error populating database: ', error });
    }
};