import express from 'express';
import UserBranchController from '../controllers/UserBranchController';
import authMiddleware from '../utils/authMiddleware';
import superAndAdminMiddleware from '../utils/superAndAdminMiddleware';
import superAdminOnlyMiddleware from '../utils/superAdminOnlyMiddleware';

const router = express.Router();

router.post('/user-branches',authMiddleware, superAdminOnlyMiddleware, UserBranchController.createUserBranch);
router.get('/user-branches/:id',authMiddleware, superAndAdminMiddleware, UserBranchController.getUserBranchById);
router.get('/user-branches/',authMiddleware, superAndAdminMiddleware, UserBranchController.getAllUsersBranch);
router.patch('/user-branches/:id',authMiddleware, superAdminOnlyMiddleware, UserBranchController.updateUserBranch);
router.delete('/user-branches/:id',authMiddleware, superAdminOnlyMiddleware, UserBranchController.deleteUserBranch);

export default router;
