import express from 'express';


import { add2fave, fetchFavorites, removeFavorite } from '../controllers/transaction_controller.js';


const router = express.Router();

router.get('/:id/add2fave', add2fave);
router.get('/fetchFavorites', fetchFavorites);
router.get('/:id/removeFavorite', removeFavorite);
export default router;