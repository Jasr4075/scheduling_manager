import express from 'express';
import ScheduleController from '../controllers/ScheduleController';
import authMiddleware from '../utils/authMiddleware';
import superAndAdminMiddleware from '../utils/superAndAdminMiddleware';
import superAdminOnlyMiddleware from '../utils/superAdminOnlyMiddleware';

const router = express.Router();

router.post('/schedule',authMiddleware, ScheduleController.createSchedule);
router.get('/schedule',authMiddleware, ScheduleController.getAllSchedule);
router.get('/schedule/:id',authMiddleware, ScheduleController.getScheduleById);
router.patch('/schedule/:id',authMiddleware, ScheduleController.updateSchedule);
router.delete('/schedule/:id',authMiddleware, ScheduleController.deleteSchedule);
router.get('/schedule-services', authMiddleware, ScheduleController.getDadosServices);


export default router;
