export enum UserType {
    Passenger = 'Passenger',
    FlightDispatcher = 'Flight Dispatcher'
};

export enum TicketClass {
    Economy = 'Economy',
    Business = 'Business',
    First = 'First',
}

export type Passenger = {
    passportNumber: string;
    firstName: string;
    lastName: string;
    nationality: string;
};

export type Ticket = {
    ticketId: number;
    seatNumber: string;
    ticketClass: string;
    passportNumber: string;
    flightNumber: string;
};

export type Flight = {
    flightNumber: string;
    departureAirport: string;
    destinationAirport: string;
    departureTime: Date;
    arrivalTime: Date;
    numberOfSeats: number;
    duration: number;
};

export type FlightInfo = {
    passportNumber: string;
    firstName: string;
    lastName: string;
    flightNumber: string;
    departureAirport: string;
    destinationAirport: string;
    departureTime: Date;
    arrivalTime: Date;
    seatNumber: string;
    ticketClass: string;
}