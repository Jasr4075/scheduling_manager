import express from 'express';
import SchedulesController from '../controllers/SchedulesController';
import authMiddleware from '../utils/authMiddleware';
import superAndAdminMiddleware from '../utils/superAndAdminMiddleware';
import superAdminOnlyMiddleware from '../utils/superAdminOnlyMiddleware';

const router = express.Router();

router.post('/schedules', SchedulesController.createScheduleEntry);
router.get('/schedules', SchedulesController.getAllScheduleEntries);
router.get('/schedules/:id', SchedulesController.getScheduleEntryById);
router.patch('/schedules/:id', SchedulesController.updateScheduleEntry);
router.delete('/schedules/:id', SchedulesController.deleteScheduleEntry);

export default router;
