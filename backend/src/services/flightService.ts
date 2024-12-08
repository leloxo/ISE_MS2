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

