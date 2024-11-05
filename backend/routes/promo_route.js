import express from 'express';

import { getPromos, getPromo, createPromo, updatePromo, deletePromo } from '../controllers/promo_controller.js';

const router = express.Router();

router.get('/', getPromos);
router.post('/', createPromo);
router.get('/:id', getPromo);
router.put('/:id', updatePromo);
router.delete('/:id', deletePromo);

export default router;