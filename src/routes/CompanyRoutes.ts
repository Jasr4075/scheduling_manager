import express from 'express';
import CompanyController from '../controllers/CompanyController';
import authMiddleware from '../utils/authMiddleware';
import superAndAdminMiddleware from '../utils/superAndAdminMiddleware';
import superAdminOnlyMiddleware from '../utils/superAdminOnlyMiddleware';

const router = express.Router();

router.post('/companies',authMiddleware, superAdminOnlyMiddleware, CompanyController.createCompany);
router.get('/companies',authMiddleware, superAdminOnlyMiddleware, CompanyController.getAllCompanies);
router.get('/companies/:id',authMiddleware, superAdminOnlyMiddleware, CompanyController.getCompanyById);
router.patch('/companies/:id',authMiddleware, superAdminOnlyMiddleware, CompanyController.updateCompany);

export default router;
