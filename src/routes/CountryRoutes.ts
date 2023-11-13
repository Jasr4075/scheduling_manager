import express from 'express';
import CountryController from '../controllers/CountryController';
import authMiddleware from '../utils/authMiddleware';
import superAndAdminMiddleware from '../utils/superAndAdminMiddleware';
import superAdminOnlyMiddleware from '../utils/superAdminOnlyMiddleware';

const router = express.Router();

router.post('/countries',authMiddleware, superAdminOnlyMiddleware, CountryController.createCountry);
router.get('/countries',authMiddleware, CountryController.getAllCountries);
router.get('/countries/:id',authMiddleware, CountryController.getCountryById);
router.patch('/countries/:id',authMiddleware, superAdminOnlyMiddleware, CountryController.updateCountry);
router.delete('/countries/:id',authMiddleware, superAdminOnlyMiddleware, CountryController.deleteCountry);

export default router;
