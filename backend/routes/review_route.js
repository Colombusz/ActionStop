import express from 'express';

import { getReviews, deleteReview } from '../controllers/review_controller.js';

const router = express.Router();

router.get('/', getReviews);
router.delete('/:id', deleteReview);

export default router;