import express from 'express';

import { getFigurines, getFigurineById, createFigurine, updateFigurine, deleteFigurine } from '../controllers/figurine_controller.js';

const router = express.Router();

router.get('/', getFigurines);
router.post('/', createFigurine);
router.get('/:id', getFigurineById);
router.put('/:id', updateFigurine);
router.delete('/:id', deleteFigurine);

export default router;