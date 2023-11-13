import express from 'express';
import IntegrationsController from '../controllers/IntegrationsController';
import authMiddleware from '../utils/authMiddleware';
import superAdminOnlyMiddleware from '../utils/superAdminOnlyMiddleware';
import superAndAdminMiddleware from '../utils/superAndAdminMiddleware';

const router = express.Router();

router.post('/integrations', authMiddleware, superAdminOnlyMiddleware, IntegrationsController.createIntegration);
router.get('/integrations', authMiddleware, superAdminOnlyMiddleware, IntegrationsController.getAllIntegrations);
router.get('/integrations/:id', authMiddleware, superAdminOnlyMiddleware, IntegrationsController.getIntegrationById);
router.patch('/integrations/:id',  authMiddleware, superAdminOnlyMiddleware,IntegrationsController.updateIntegration);
router.delete('/integrations/:id', authMiddleware, superAdminOnlyMiddleware, IntegrationsController.deleteIntegration);

export default router;
