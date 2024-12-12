import mysqlConnection from '../config/db';
import { Flight, FlightInfo, ServerError } from '../types/types';
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

// Report Student 2
export const fetchFlightInfo = async (flightNumber: string): Promise<FlightInfo[]> => {
    const conn = await mysqlConnection.getConnection();
    try {

        // TODO
        const [rows] = await conn.query<RowDataPacket[]>(
            `SELECT
                p.first_name,
                p.last_name,
                p.passport_number,
                f.departure_airport,
                f.departure_time,
                f.destination_airport,
                f.arrival_time,
                f.flight_number,
                t.seat_number,
                t.ticket_class
             FROM Ticket t
             JOIN Passenger p ON t.passport_number = p.passport_number
             JOIN Flight f ON t.flight_number = f.flight_number
             WHERE f.flight_number = ?
             GROUP BY t.seat_number
             ORDER BY t.seat_number ASC`,
            [flightNumber]
        );
        if (rows.length === 0) {
            throw new ServerError('Flight not found.', 404);
        }

        const flightInfo: FlightInfo[] = rows.map((row) => ({
            passportNumber: row.passport_number,
            firstName: row.first_name,
            lastName: row.last_name,
            flightNumber: row.flight_number,
            departureAirport: row.departure_airport,
            destinationAirport: row.destination_airport,
            departureTime: row.departure_time,
            arrivalTime: row.arrival_time,
            seatNumber: row.seat_number,
            ticketClass: row.ticket_class,
        }));

        return flightInfo;
    } catch (error) {
        console.log('Error fetching flight infos', error);
        throw error;
    } finally {
        conn.release();
    }
};

