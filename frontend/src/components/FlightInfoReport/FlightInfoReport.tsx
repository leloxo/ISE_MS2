import React, { useState } from 'react';
import { FlightInfo } from '../../types/types';
import { fetchFlightInfo } from '../../api/flightApi';
import styles from './flightInfoReport.module.scss';

const FlightInfoReport: React.FC = () => {
    const [flightNumber, setFlightNumber] = useState<string>('');
    const [flightInfo, setFlightInfo] = useState<FlightInfo[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const fetchedFlightInfo: FlightInfo[] = await fetchFlightInfo(flightNumber);
            setFlightInfo(fetchedFlightInfo);
        } catch (error) {
            console.error("Error fetching flight info:", error);
        }
    }

    return (
        <div className={styles.container}>
            <h2>View flight info</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter flight number:
                    <input
                        type='text'
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>

            {flightInfo.length > 0 && ( 
                <div> 
                    <p>Flight {flightInfo[0].flightNumber} from {flightInfo[0].departureAirport} at {new Date(flightInfo[0].departureTime).toLocaleString()} to {flightInfo[0].destinationAirport} at {new Date(flightInfo[0].arrivalTime).toLocaleString()}</p>
                </div> 
            )} 
            
            {flightInfo.map((info, index) => ( 
                <div key={index}> 
                    <p>Ticket {index+1}: {info.firstName} {info.lastName} - {info.passportNumber}</p>
                    <p>Seat: {info.seatNumber} - Class: {info.ticketClass}</p> 
                </div>
            ))}
        </div>
    );
};

export default FlightInfoReport;
