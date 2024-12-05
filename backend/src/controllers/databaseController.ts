import { NextFunction, Request, Response } from 'express';
import { populateDatabase } from '../services/populateDatabaseService';

export const populateDatabaseHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await populateDatabase();
        res.status(200).send('Database populated successfully!');
    } catch (error) {
        next(error);
    }
};