import express from 'express';
import cors from 'cors';
import ticketRoutes from './routes/ticketRoutes';
import databaseRoutes from './routes/databaseRoutes';
import flightRoutes from './routes/flightRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/db', databaseRoutes);
app.use('/api/flight', flightRoutes)
app.use('/api/ticket', ticketRoutes);

app.use(errorHandler);

export default app;