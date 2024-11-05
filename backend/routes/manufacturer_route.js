import express from 'express';

import { getManufacturers, getManufacturer, createManufacturer, updateManufacturer, deleteManufacturer } from '../controllers/manufacturer_controller.js';

const router = express.Router();

router.get('/', getManufacturers);
router.post('/', createManufacturer);
router.get('/:id', getManufacturer);
router.put('/:id', updateManufacturer);
router.delete('/:id', deleteManufacturer);

export default router;