import express from 'express';
import StateController from '../controllers/StateController';
import authMiddleware from '../utils/authMiddleware';
import superAndAdminMiddleware from '../utils/superAndAdminMiddleware';
import superAdminOnlyMiddleware from '../utils/superAdminOnlyMiddleware';

const router = express.Router();

router.post('/states',authMiddleware, superAdminOnlyMiddleware, StateController.createState);
router.get('/states', authMiddleware, StateController.getAllStates);
router.get('/states/:id',authMiddleware, StateController.getStateById);
router.patch('/states/:id',authMiddleware, superAdminOnlyMiddleware, StateController.updateState);
router.delete('/states/:id',authMiddleware, superAdminOnlyMiddleware, StateController.deleteState);

export default router;
