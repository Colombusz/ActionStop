import express from 'express';

import { getManufacturers, getManufacturerById, createManufacturer, updateManufacturer, deleteManufacturer } from '../controllers/manufacturer_controller.js';

const router = express.Router();

router.get('/', getManufacturers);
router.post('/', createManufacturer);
router.get('/:id', getManufacturerById);
router.put('/:id', updateManufacturer);
router.delete('/:id', deleteManufacturer);

export default router;