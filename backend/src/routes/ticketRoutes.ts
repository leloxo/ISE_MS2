import express from 'express';
import { bookTicket } from '../controllers/ticketController';

const router = express.Router();

router.post('/', bookTicket);

export default router;