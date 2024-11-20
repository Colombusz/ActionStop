import express from 'express';


import { add2fave, getTransaction, createTransaction, updateTransaction, deleteTransaction } from '../controllers/transact_controller.js';


const router = express.Router();

router.get('/add2fave', add2fave);

export default router;