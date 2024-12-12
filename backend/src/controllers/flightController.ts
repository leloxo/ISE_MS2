import { NextFunction, Request, Response } from 'express';
import { fetchAvailableSeats, fetchFlightInfo, fetchFlights, fetchFlightsByAirport } from '../services/flightService';
import { ServerError } from '../types/types';

export const getFlights = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await fetchFlights();
        res.status(200).json(response);
    } catch (error: any) {
        next(error);
    }
};

export const getFlightsByAirport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { departureAirport, destinationAirport } = req.query;

        if (!departureAirport || !destinationAirport) {
            throw new ServerError('Missing required query parameters.', 400);
        }

        const response = await fetchFlightsByAirport(
            departureAirport as string, 
            destinationAirport as string 
        );
        res.status(200).json(response);
    } catch (error: any) {
        next(error);
    }
};

export const getAvailableSeats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { flightNumber, ticketClass } = req.query;

        if (!flightNumber || !ticketClass) {
            throw new ServerError('Missing required query parameters.', 400);
        }

        const response = await fetchAvailableSeats(
            flightNumber as string, 
            ticketClass as string 
        );
        res.status(200).json(response);
    } catch (error: any) {
        next(error);
    }
};

export const getFlightInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { flightNumber } = req.query;

        if (!flightNumber) {
            throw new ServerError('Missing required query parameters.', 400);
        }

        const response = await fetchFlightInfo(
            flightNumber as string
        );
        res.status(200).json(response);
    } catch (error: any) {
        next(error);
    }
};