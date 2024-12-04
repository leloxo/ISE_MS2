import express from 'express';
import { importData } from '../controllers/dbController';

const router = express.Router();

router.post('/populate', importData);

export default router;