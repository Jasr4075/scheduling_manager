import express from 'express';
import BranchController from '../controllers/BranchController';
import authMiddleware from '../utils/authMiddleware';
import superAndAdminMiddleware from '../utils/superAndAdminMiddleware';
import superAdminOnlyMiddleware from '../utils/superAdminOnlyMiddleware';

const router = express.Router();

router.post('/branches',authMiddleware, superAdminOnlyMiddleware, BranchController.createBranch);
router.get('/branches',authMiddleware, superAndAdminMiddleware, BranchController.getAllBranches);
router.get('/branches/:id',authMiddleware, superAndAdminMiddleware, BranchController.getBranchById);
router.patch('/branches/:id',authMiddleware, superAdminOnlyMiddleware, BranchController.updateBranch);
router.delete('/branches/:id',authMiddleware, superAdminOnlyMiddleware, BranchController.deleteBranch);

export default router;
