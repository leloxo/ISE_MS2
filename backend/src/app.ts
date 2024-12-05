import express from 'express';
import ticketRoutes from './routes/ticketRoutes';
import databaseRoutes from './routes/databaseRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());

// routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/db', databaseRoutes);

app.use(errorHandler);

export default app;