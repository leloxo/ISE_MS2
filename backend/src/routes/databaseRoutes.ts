import express from 'express';
import { populateDatabaseHandler } from '../controllers/databaseController';

const router = express.Router();

router.post('/populate', populateDatabaseHandler);

export default router;