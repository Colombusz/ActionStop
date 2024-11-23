import express from 'express';


import { add2fave, fetchFavorites, removeFavorite, checkout, fetchOrders,  cancelOrder, createReview} from '../controllers/transaction_controller.js';


const router = express.Router();

router.post('/:id/add2fave', add2fave);
router.get('/:id/fetchFavorites', fetchFavorites);
router.delete('/:id/removeFavorite', removeFavorite);
router.post('/checkout', checkout);
router.get('/:id/orders', fetchOrders);
router.patch('/:orderid/cancelOrder', cancelOrder);
router.post('/review', createReview)
export default router;