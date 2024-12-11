import db from '../config/db';
import { faker } from '@faker-js/faker';
import { divideSeatsByClass } from '../utils/seatUtils';
import { convertToSqlTime } from '../utils/dateTimeUtils';

// TODO add better error handling for client
export const populateDatabase = async () => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Clear existing data
        await connection.execute('DELETE FROM Ticket');
        await connection.execute('DELETE FROM Flight');
        await connection.execute('DELETE FROM Passenger');

        // Flights
        const flightInfos = [];
        const airports = ['LAX', 'JFK', 'ORD', 'SFO', 'ATL', 'DCA', 'SEA', 'MIA', 'PHX', 'DEN'];
        for (let i = 0; i < 10; i++) {
            const flightNumber = faker.string.alphanumeric(6).toUpperCase();
            const departureAirport = faker.helpers.arrayElement(airports);
            const destinationAirport = faker.helpers.arrayElement(airports.filter(airport => airport !== departureAirport));            const departureTime = faker.date.future();
            const arrivalTime = faker.date.soon({ refDate: departureTime });
            const numberOfSeats : number = faker.helpers.arrayElement([200, 350, 450]); // TODO
            const duration = convertToSqlTime(arrivalTime.getTime() - departureTime.getTime());

            await connection.execute(
                `INSERT INTO Flight 
                 (flight_number, departure_airport, destination_airport, departure_time, arrival_time, number_of_seats, duration)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [flightNumber, departureAirport, destinationAirport, departureTime, arrivalTime, numberOfSeats, duration]
            );

            flightInfos.push({ flightNumber, numberOfSeats });
        }

        // Passengers
        const passportNumbers: string[] = [];
        for (let i = 0; i < 100; i++) {
            const passportNumber = faker.string.alphanumeric(8).toUpperCase();
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const nationality = faker.location.country();

            await connection.execute(
                `INSERT INTO Passenger (passport_number, first_name, last_name, nationality) VALUES (?, ?, ?, ?)`,
                [passportNumber, firstName, lastName, nationality]
            );

            passportNumbers.push(passportNumber);
        }

        // Tickets
        for (const flight of flightInfos) {
            const { flightNumber, numberOfSeats } = flight;
            
            const { economySeats, businessSeats, firstClassSeats } = divideSeatsByClass(numberOfSeats);
            
            const insertTickets = async (assignedSeats: string[], ticketClass: string) => {
                const maxTickets = Math.floor(assignedSeats.length * 0.70);
                const numberOfTickets = faker.number.int({ min: 0, max: maxTickets });

                const selectedSeats = faker.helpers.shuffle(assignedSeats).slice(0, numberOfTickets);

                for (const seatNumber of selectedSeats) {
                    const passportNumber = faker.helpers.arrayElement(passportNumbers);
                    await connection.execute(
                        `INSERT INTO Ticket (seat_number, ticket_class, passport_number, flight_number) 
                         VALUES (?, ?, ?, ?)`,
                        [seatNumber, ticketClass, passportNumber, flightNumber]
                    );
                }
            };

            await insertTickets(economySeats, 'Economy');
            await insertTickets(businessSeats, 'Business');
            await insertTickets(firstClassSeats, 'First');
        }

        await connection.commit();
        console.log('Database populated successfully!');
    } catch (error) {
        await connection.rollback();
        console.error('Error populating database:', error);
        throw error;
    } finally {
        connection.release();
    }
};