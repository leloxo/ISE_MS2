import express from 'express';
import { getFlights, getFlightsByAirport } from '../controllers/flightController';

const router = express.Router();

router.get('/', getFlights);
router.get('/airport', getFlightsByAirport);

export default router;