import mysqlConnection from '../config/db';
import { ServerError, Ticket } from '../types/types';

export const createTicket = async (ticket: Omit<Ticket, 'ticketId'>): Promise<Ticket> => {
    const conn = await mysqlConnection.getConnection();
    try {
        await conn.beginTransaction();

        // Ceck passport number
        const [passenger]: any[] = await conn.query(
            `SELECT * 
             FROM Passenger 
             WHERE passport_number = ?`,
            [ticket.passportNumber]
        );
        if (passenger.length === 0) {
            throw new ServerError('Passenger not found.', 404);
        }

        // Create ticket
        const insertResult: any = await conn.query(
            `INSERT INTO Ticket (seat_number, ticket_class, passport_number, flight_number) 
             VALUES (?, ?, ?, ?)`,
            [ticket.seatNumber, ticket.ticketClass, ticket.passportNumber, ticket.flightNumber]
        );
        if (insertResult.affectedRows === 0) {
            throw new ServerError('Failed to insert new ticket.', 500);
        }

        // Get generated ticketId
        const ticketId = insertResult.insertId;

        await conn.commit();

        return {
            ticketId,
            ...ticket,
        };
    } catch (error) {
        await conn.rollback();
        console.log('Error booking ticket', error);
        throw error;
    } finally {
        conn.release();
    }
};