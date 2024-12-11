export const divideSeatsByClass = (numberOfSeats: number): { economySeats: string[], businessSeats: string[], firstClassSeats: string[] } => {
    const allSeatNumbers: string[] = [];
    // 4 seats per row (1A, 1B, 1C, 1D)
    for (let row = 1; row <= Math.ceil(numberOfSeats / 4); row++) {
        ['A', 'B', 'C', 'D'].forEach(letter => {
            const seatNumber = `${row}${letter}`;
            if (allSeatNumbers.length < numberOfSeats) {
                allSeatNumbers.push(seatNumber);
            }
        });
    }

    const economySeatCount: number = Math.floor(numberOfSeats * 0.50);  
    const businessSeatCount: number = Math.floor(numberOfSeats * 0.30);
    const firstClassSeatCount: number = numberOfSeats - economySeatCount - businessSeatCount;

    const economySeats: string[] = allSeatNumbers.slice(0, economySeatCount);
    const businessSeats: string[] = allSeatNumbers.slice(economySeatCount, economySeatCount + businessSeatCount);
    const firstClassSeats: string[] = allSeatNumbers.slice(economySeatCount + businessSeatCount, economySeatCount + businessSeatCount + firstClassSeatCount);

    return { economySeats, businessSeats, firstClassSeats };
};