import mysqlConnection from '../config/db';
import { Flight, ServerError } from '../types/types';
import { RowDataPacket } from 'mysql2';
import { divideSeatsByClass } from '../utils/seatUtils';

export const fetchFlights = async (): Promise<Flight[]> => {
    const conn = await mysqlConnection.getConnection();
    try {
        const [rows] = await conn.query<RowDataPacket[]>(`SELECT * FROM Flight`);

        const flights: Flight[]= rows.map((row) => ({
            flightNumber: row.flight_number,
            departureAirport: row.departure_airport,
            destinationAirport: row.destination_airport,
            departureTime: row.departure_time,
            arrivalTime: row.arrival_time,
            numberOfSeats: row.number_of_seats,
            duration: row.duration,
        }));

        return flights;
    } catch (error) {
        console.log('Error fetching flights', error);
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

        const flights: Flight[]= rows.map((row) => ({
            flightNumber: row.flight_number,
            departureAirport: row.departure_airport,
            destinationAirport: row.destination_airport,
            departureTime: row.departure_time,
            arrivalTime: row.arrival_time,
            numberOfSeats: row.number_of_seats,
            duration: row.duration,
        }));

        return flights;
    } catch (error) {
        console.log('Error fetching flights by airport', error);
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
        const bookedSeatNumbers: string[] = bookedSeats.map((row: { seat_number: string }) => row.seat_number);

        const [numberOfSeatsQuery]: any[] = await conn.query(
            `SELECT number_of_seats 
             FROM Flight 
             WHERE flight_number = ?`,
            [flightNumber]
        );
        const numberOfSeats = numberOfSeatsQuery[0].number_of_seats;

        const { economySeats, businessSeats, firstClassSeats } = divideSeatsByClass(numberOfSeats);
        
        // Filter out booked seats
        let availableSeatNumbers: string[] = [];
        switch (ticketClass) {
            case 'Economy':
                availableSeatNumbers = economySeats.filter(seat => !bookedSeatNumbers.includes(seat));
                break;
            case 'Business':
                availableSeatNumbers = businessSeats.filter(seat => !bookedSeatNumbers.includes(seat));
                break;
            case 'First':
                availableSeatNumbers = firstClassSeats.filter(seat => !bookedSeatNumbers.includes(seat));
                break;
            default:
                throw new ServerError('Invalid ticket class', 400);
        }
        return availableSeatNumbers;
    } catch (error) {
        console.log('Error fetching availabe seats', error);
        throw error;
    } finally {
        conn.release();
    }
};

