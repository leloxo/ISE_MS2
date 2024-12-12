import express from 'express';
import { getAvailableSeats, getFlightInfo, getFlights, getFlightsByAirport } from '../controllers/flightController';

const router = express.Router();

router.get('/', getFlights);
router.get('/airports', getFlightsByAirport);
router.get('/seats', getAvailableSeats);
router.get('/info', getFlightInfo);

export default router;