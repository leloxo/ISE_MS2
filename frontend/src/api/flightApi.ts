import { Flight, FlightInfo } from '../types/types';
import axiosInstance from './axiosInstance';

export const fetchFlights = async (): Promise<Flight[]> => {
    try {
        const response = await axiosInstance.get('/flight');
        console.log('Fetched flights: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching flights: ', error);
        throw error;
    }
};

export const fetchFlightsByAirport = async (departureAirport: string, destinationAirport: string): Promise<Flight[]> => {
    try {
        const response = await axiosInstance.get('/flight/airports', {
            params: {
                departureAirport,
                destinationAirport,
            },
        });
        console.log('Fetched flights by airport: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching flights: ', error);
        throw error;
    }
};

export const fetchAvailableSeats = async (flightNumber: string, ticketClass: string): Promise<string[]> => {
    try {
        const response = await axiosInstance.get('/flight/seats', {
            params: {
                flightNumber,
                ticketClass,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching flights: ', error);
        throw error;
    }
};

export const fetchFlightInfo = async (flightNumber: string): Promise<FlightInfo[]> => {
    try {
        const response = await axiosInstance.get('/flight/info', {
            params: {
                flightNumber,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching flight info: ', error);
        throw error;
    }
};

