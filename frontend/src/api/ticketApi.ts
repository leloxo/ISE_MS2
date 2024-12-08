import axiosInstance from './axiosInstance';
import { Ticket } from "../types/types";

export const bookTicket = async (ticket: Omit<Ticket, 'ticketId'>): Promise<Ticket> => {
    try {
        const response = await axiosInstance.post('/ticket', ticket);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error booking ticket: ', error);
        throw error;
    }
};