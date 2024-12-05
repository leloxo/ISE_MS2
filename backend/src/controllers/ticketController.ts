import { Request, Response, NextFunction } from 'express';
import { createTicket } from '../services/ticketService';
import { Ticket } from '../types/types';

export const bookTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ticketId, seatNumber, ticketClass, passportNumber, flightNumber } = req.body;

        const ticket: Ticket = {
            ticketId,
            seatNumber,
            ticketClass,
            passportNumber,
            flightNumber,
        };

        const createdTicket = await createTicket(ticket);

        res.status(201).json(createdTicket);
    } catch (error: any) {
        next(error);
    }
};