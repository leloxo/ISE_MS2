import { Flight } from '../types/types';
import axiosInstance from './axiosInstance';

export const fetchFlights = async (): Promise<Flight> => {
    try {
        const response = await axiosInstance.get('/flight');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error populating database: ', error);
        throw error;
    }
};