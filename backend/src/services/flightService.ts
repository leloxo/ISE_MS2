import mysqlConnection from '../config/db';
import { Flight } from '../types/types';
import { RowDataPacket } from 'mysql2';

export const fetchFlights = async (): Promise<Flight[]> => {
    const conn = await mysqlConnection.getConnection();
    try {
        const [rows] = await conn.query<RowDataPacket[]>(`SELECT * FROM Flight`);
        return rows as Flight[];
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
};

export const fetchFlightsByAirport = async (departureAirport: string, destinationAirport: string): Promise<Flight[]> => {
    const conn = await mysqlConnection.getConnection();
    try {
        const [rows] = await conn.query<RowDataPacket[]>(
            `SELECT * 
             FROM Flight
             WHERE departure_airport = ? AND destination_airport = ?`,
            [departureAirport, destinationAirport]
        );
        return rows as Flight[];
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
};

export const fetchAvailableSeats = async (flightNumber: string, ticketClass: string): Promise<string[]> => {
    const conn = await mysqlConnection.getConnection();
    try {
        const [bookedSeats]: any[] = await conn.query(
            `SELECT seat_number
             FROM Ticket
             WHERE flight_number = ? AND ticket_class = ?`,
            [flightNumber, ticketClass]
        );
        const bookedSeatNumbers = bookedSeats.map((row: { seat_number: string }) => row.seat_number);

        const [numberOfSeatsQuery]: any[] = await conn.query(
            `SELECT number_of_seats 
             FROM Flight 
             WHERE flight_number = ?`,
            [flightNumber]
        );
        const numberOfSeats = numberOfSeatsQuery[0].number_of_seats;

        // TODO use this in db filling script
        const allSeats: string[] = [];
        // 4 seats per row (1A, 1B, 1C, 1D)
        for (let i = 1; i <= Math.ceil(numberOfSeats / 4); i++) {
            ['A', 'B', 'C', 'D'].forEach(letter => {
                const seatNumber = `${i}${letter}`;
                if (allSeats.length < numberOfSeats) {
                    allSeats.push(seatNumber);
                }
            });
        }

        // Filter out booked seats
        const availableSeats: string[] = allSeats.filter(seat => !bookedSeatNumbers.includes(seat));
        
        return availableSeats;
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
};

