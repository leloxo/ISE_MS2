import express from 'express';
import ticketRoutes from './routes/ticketRoutes';
import dbRoutes from './routes/dbRoutes';

// import routes here

const app = express();

app.use(express.json());
app.use('/api/tickets', ticketRoutes);
app.use('/api/db', dbRoutes);

export default app;