import express from 'express';
import PaymentMethodController from '../controllers/PaymentMethodController';
import authMiddleware from '../utils/authMiddleware';
import superAdminOnlyMiddleware from '../utils/superAdminOnlyMiddleware';
import superAndAdminMiddleware from '../utils/superAndAdminMiddleware';

const router = express.Router();

router.post('/payment-methods', authMiddleware, superAdminOnlyMiddleware, PaymentMethodController.createPaymentMethod);
router.get('/payment-methods',authMiddleware, superAndAdminMiddleware, PaymentMethodController.getAllPaymentMethods);
router.get('/payment-methods/:id',authMiddleware, superAndAdminMiddleware, PaymentMethodController.getPaymentMethodById);
router.patch('/payment-methods/:id',authMiddleware, superAdminOnlyMiddleware, PaymentMethodController.updatePaymentMethod);
router.delete('/payment-methods/:id',authMiddleware, superAdminOnlyMiddleware, PaymentMethodController.deletePaymentMethod);

export default router;
