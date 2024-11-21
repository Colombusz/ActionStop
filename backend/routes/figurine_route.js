import express from 'express';
import upload from '../utils/multer.js';
import { getFigurines, getFigurine, createFigurine, updateFigurine, deleteFigurine } from '../controllers/figurine_controller.js';

const router = express.Router();

router.get('/',  getFigurines);
router.post('/', upload.array("images", 5), createFigurine);
router.get('/:id', getFigurine);
router.put('/:id', upload.array("images", 5), updateFigurine);
router.delete('/:id', deleteFigurine);



export default router;