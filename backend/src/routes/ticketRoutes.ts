import express from 'express';
import { bookTicket } from '../controllers/ticketController';

const router = express.Router();

router.post('/book', bookTicket);

export default router;