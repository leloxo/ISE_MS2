import React, { useEffect, useState } from 'react';
import { Flight, Ticket, TicketClass } from '../../types/types';
import { fetchFlights, fetchFlightsByAirport } from '../../api/flightApi';
import { bookTicket } from '../../api/ticketApi';
import styles from './ticketBookingForm.module.scss';

const TicketBookingForm: React.FC = () => {
    const [flightsByAirport, setFlightsByAirport] = useState<Flight[]>([]);

    const [departureAirports, setDepartureAirports] = useState<string[]>([]);
    const [destinationAirports, setDestinationAirports] = useState<string[]>([]);
    const [selectedDepartureAirport, setSelectedDepartureAirport] = useState<string>('');
    const [selectedDestinationAirports, setSelectedDestinationAirport] = useState<string>('');

    const [flightNumber, setFlightNumber] = useState<string>('');
    const [passportNumber, setPassportNumber] = useState<string>('');
    const [seatNumber, setSeatNumber] = useState<string>('');
    const [ticketClass, setTicketClass] = useState<TicketClass>(TicketClass.Economy);
    
    const [bookedTicket, setBookedTicket] = useState<Ticket | null>(null);
    
    useEffect(() => {
        const fetchFlightData = async () => {
            try {
                const fetchedFlights: Flight[] = await fetchFlights();
                extractAirports(fetchedFlights);
            } catch (error) {
                console.error("Error fetching flights:", error);
            }
        }
        fetchFlightData();
    }, []);

    const extractAirports = (fetchedFlights: Flight[]) => {
        const fetchedDestinationAirports: Set<string> = new Set();
        const fetchedDepartureAirports: Set<string> = new Set();
        fetchedFlights.forEach((flight: Flight) => {
            fetchedDestinationAirports.add(flight.destinationAirport);
            fetchedDepartureAirports.add(flight.destinationAirport);
        });
        setDestinationAirports(Array.from(fetchedDestinationAirports));
        setDepartureAirports(Array.from(fetchedDestinationAirports));
    }

    const handleTicketSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const ticket: Omit<Ticket, 'ticketId'> = {
                seatNumber,
                ticketClass,
                passportNumber,
                flightNumber,
            }
            const newTicket = await bookTicket(ticket);
            setBookedTicket(newTicket);
            // TODO succsess message
        } catch (error) {
            console.error("Error booking ticket:", error);
        }
    }
    
    const handleAirportSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const fetchedFlights: Flight[] = await fetchFlightsByAirport(selectedDepartureAirport, selectedDestinationAirports);
            setFlightsByAirport(fetchedFlights);
            // TODO succsess message
        } catch (error) {
            console.error("Error booking ticket:", error);
        }
    }

    // select a departure and a destination => get available flights => select flight => select passport number, class, seat and submit
    return (
        <div className={styles.container}>
            <h2>Book a flight ticket</h2>

            <form onSubmit={handleAirportSubmit}>
                <label>
                    Select Departure Airport:

                    <select
                        value={flightNumber}
                        onChange={(e) => setSelectedDepartureAirport(e.target.value)}
                        required    
                        >
                        <option value='' disabled>
                            Select Departure Airport
                        </option>
                        {departureAirports && departureAirports.map((airport) => (
                            <option key={airport} value={airport}>
                                {airport}
                            </option>
                        ))}
                    </select>

                </label>
                <label>
                    Select Destination Airport:

                    <select
                        value={flightNumber}
                        onChange={(e) => setSelectedDestinationAirport(e.target.value)}
                        required    
                        >
                        <option value='' disabled>
                            Select Destination Airport
                        </option>
                        {destinationAirports && destinationAirports.map((airport) => (
                            <option key={airport} value={airport}>
                                {airport}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Search</button>
            </form>

            {flightsByAirport.length > 0 && (
                <form onSubmit={handleTicketSubmit}>
                    <label>
                        Select a flight:
                        <select
                            value={flightNumber}
                            onChange={(e) => setFlightNumber(e.target.value)}
                            required    
                        >
                            <option value='' disabled>
                                Select a flight
                            </option>
                            {flightsByAirport.map((flight) => (
                                <option key={flight.flightNumber} value={flight.flightNumber}>
                                    {`${flight.flightNumber} 
                                    - Arrival: ${new Date(flight.arrivalTime).toLocaleTimeString()} 
                                    - Destination: ${new Date(flight.destinationTime).toLocaleTimeString()}`}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Passport Number:
                        <input
                            type="text"
                            value={passportNumber}
                            onChange={(e) => setPassportNumber(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Select Class:
                        <select
                            value={ticketClass}
                            onChange={(e) => setTicketClass(e.target.value as TicketClass)}
                            required
                        >
                            {Object.values(TicketClass).map((classType) => (
                                <option key={classType} value={classType}>
                                    {classType}
                                </option>
                            ))}
                        </select>
                    </label>
                    {/* <label>
                        Select Seat:
                        <input
                            type="text"
                            value={seatNumber}
                            onChange={(e) => setSeatNumber(e.target.value)}
                            required
                        />
                    </label> */}
                    <button type="submit">Book Ticket</button>
                </form>
            )}
            {bookedTicket && (
                <div className={styles.ticketDetails}>
                    <h3>Ticket Details</h3>
                    <p>Flight Number: {bookedTicket.flightNumber ? bookedTicket.flightNumber : ""}</p>
                    <p>Seat Number: {bookedTicket.seatNumber ? bookedTicket.seatNumber : ""}</p>
                    <p>Class: {bookedTicket.ticketClass ? bookedTicket.ticketClass : ""}</p>
                </div>
            )}
        </div>
    );
};

export default TicketBookingForm;