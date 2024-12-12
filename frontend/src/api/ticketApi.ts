import axiosInstance from './axiosInstance';
import { Ticket } from "../types/types";

export const bookTicket = async (ticket: Omit<Ticket, 'ticketId'>): Promise<Ticket> => {
    try {
        console.log('Create Ticket:', ticket);
        const response = await axiosInstance.post('/ticket/book', ticket);
        console.log('Response:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error booking ticket:', error);
        if (error.response) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
};