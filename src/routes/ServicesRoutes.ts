import express from 'express';
import ServicesController from '../controllers/ServicesController';
import authMiddleware from '../utils/authMiddleware';
import superAndAdminMiddleware from '../utils/superAndAdminMiddleware';
import superAdminOnlyMiddleware from '../utils/superAdminOnlyMiddleware';

const router = express.Router();

router.post('/services',authMiddleware,  ServicesController.createService);
router.get('/services',authMiddleware, ServicesController.getAllServices);
router.get('/services/:id',authMiddleware, ServicesController.getServiceById);
router.patch('/services/:id',authMiddleware, ServicesController.updateService);
router.delete('/services/:id',authMiddleware, ServicesController.deleteService);

export default router;
