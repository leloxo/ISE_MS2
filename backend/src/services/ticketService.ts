import mysqlConnection from '../config/db';
import { Ticket } from '../types/types';

export const createTicket = async (ticket: Omit<Ticket, 'ticketId'>): Promise<Ticket> => {
    const conn = await mysqlConnection.getConnection();
    try {
        await conn.beginTransaction();

        // Ceck passport number
        // TODO

        // Check if seat is available
        const [seatAvailability]: any[] = await conn.query(
            `SELECT seat_number 
             FROM Ticket 
             WHERE flight_number = ? AND seat_number = ?`,
            [ticket.flightNumber, ticket.seatNumber]
        );

        if (seatAvailability.length > 0) {
            throw new Error('Seat is already booked.');
        }

        // Create ticket
        const insertResult: any = await conn.query(
            `INSERT INTO Ticket (seat_number, class, passport_number, flight_number) 
             VALUES (?, ?, ?, ?)`,
            [ticket.seatNumber, ticket.ticketClass, ticket.passportNumber, ticket.flightNumber]
        );

        if (insertResult.affectedRows === 0) {
            throw new Error('Failed to insert new ticket.');
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
        throw error;
    } finally {
        conn.release();
    }
};