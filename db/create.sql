CREATE TABLE Flight (
    flight_number VARCHAR(10) PRIMARY KEY,
    departure_airport VARCHAR(3) NOT NULL,
    destination_airport VARCHAR(3) NOT NULL,
    departure_time TIMESTAMP NOT NULL,
    arrival_time TIMESTAMP NOT NULL,
    number_of_seats INT NOT NULL,
    duration TIME NOT NULL
);

CREATE TABLE Passenger (
    passport_number VARCHAR(10) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    nationality VARCHAR(50) NOT NULL
);

CREATE TABLE Ticket (
    ticket_id INT NOT NULL AUTO_INCREMENT,
    seat_number VARCHAR(3) NOT NULL,
    ticket_class VARCHAR(20) NOT NULL,
    passport_number VARCHAR(10) NOT NULL,
    flight_number VARCHAR(10) NOT NULL,
    PRIMARY KEY (ticket_id, flight_number),
    FOREIGN KEY (passport_number) REFERENCES Passenger(passport_number) ON DELETE CASCADE,
    FOREIGN KEY (flight_number) REFERENCES Flight(flight_number) ON DELETE CASCADE
);

CREATE TABLE CrewMember (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE Pilot (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    pilot_rank VARCHAR(20) NOT NULL,
    flight_hours INT NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES CrewMember(employee_id) ON DELETE CASCADE
);

CREATE TABLE FlightAttendant (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    role VARCHAR(50) NOT NULL,
    number_of_flights INT NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES CrewMember(employee_id) ON DELETE CASCADE
);

CREATE TABLE Flight_CrewMember (
    flight_number VARCHAR(10),
    employee_id INT,
    PRIMARY KEY (flight_number, employee_id),
    FOREIGN KEY (flight_number) REFERENCES Flight(flight_number) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES CrewMember(employee_id) ON DELETE CASCADE
);

CREATE TABLE Flight_Passenger (
    flight_number VARCHAR(10),
    passport_number VARCHAR(10),
    PRIMARY KEY (flight_number, passport_number),
    FOREIGN KEY (flight_number) REFERENCES Flight(flight_number) ON DELETE CASCADE,
    FOREIGN KEY (passport_number) REFERENCES Passenger(passport_number) ON DELETE CASCADE
);

CREATE TABLE Pilot_Commands (
    pilot_id INT,
    copilot_id INT,
    PRIMARY KEY (pilot_id, copilot_id),
    FOREIGN KEY (pilot_id) REFERENCES Pilot(employee_id) ON DELETE CASCADE,
    FOREIGN KEY (copilot_id) REFERENCES Pilot(employee_id) ON DELETE CASCADE
);