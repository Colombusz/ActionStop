import express from 'express';
import { getOrders, updateOrder } from '../controllers/order_controller.js';

const router = express.Router();

router.get('/', getOrders);
router.put('/:id', updateOrder);

export default router;