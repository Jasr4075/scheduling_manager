import express from 'express';
import PaymentController from '../controllers/PaymentController';
import authMiddleware from '../utils/authMiddleware';
import superAdminOnlyMiddleware from '../utils/superAdminOnlyMiddleware';
import superAndAdminMiddleware from '../utils/superAndAdminMiddleware';

const router = express.Router();

router.post('/payments',authMiddleware, superAdminOnlyMiddleware, PaymentController.createPayment);
router.get('/payments',authMiddleware, superAndAdminMiddleware, PaymentController.getAllPayments);
router.get('/payments/:id',authMiddleware, superAndAdminMiddleware, PaymentController.getPaymentById);
router.patch('/payments/:id',authMiddleware, superAdminOnlyMiddleware, PaymentController.updatePayment);
router.delete('/payments/:id',authMiddleware, superAdminOnlyMiddleware, PaymentController.deletePayment);

export default router;
