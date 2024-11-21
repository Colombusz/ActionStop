import express from 'express';


import { add2fave} from '../controllers/transaction_controller.js';


const router = express.Router();

router.get('/add2fave', add2fave);

export default router;