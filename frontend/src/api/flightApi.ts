import { Flight } from '../types/types';
import axiosInstance from './axiosInstance';

export const fetchFlights = async (): Promise<Flight[]> => {
    try {
        const response = await axiosInstance.get('/flights');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching flights: ', error);
        throw error;
    }
};

export const fetchFlightsByAirport = async (departureAirport: string, destinationAirport: string): Promise<Flight[]> => {
    try {
        const response = await axiosInstance.get('/flights/airport', {
            params: {
                departureAirport,
                destinationAirport,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching flights: ', error);
        throw error;
    }
};

export const fetchAvailableSeats = async (flightNumber: string, ticketClass: string): Promise<string[]> => {
    try {
        const response = await axiosInstance.get('/flights/seats', {
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

