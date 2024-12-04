import { Request, Response } from 'express';
import { createTicket } from '../services/ticketService';

export const bookTicket = async (req: Request, res: Response) => {
    // TODO
    try {

    } catch (error) {
        // await rollback conn
        console.error('Error while booking a ticket: ', error);
        throw error;
    } finally {
        // release conn
    }
};