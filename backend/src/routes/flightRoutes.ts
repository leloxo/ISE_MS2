import express from 'express';
import { getAvailableSeats, getFlights, getFlightsByAirport } from '../controllers/flightController';

const router = express.Router();

router.get('/', getFlights);
router.get('/airport', getFlightsByAirport);
router.get('/seats', getAvailableSeats);

export default router;