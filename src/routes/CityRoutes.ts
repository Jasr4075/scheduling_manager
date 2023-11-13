import express from 'express';
import CityController from '../controllers/CItyController';
import authMiddleware from '../utils/authMiddleware';
import superAndAdminMiddleware from '../utils/superAndAdminMiddleware';
import superAdminOnlyMiddleware from '../utils/superAdminOnlyMiddleware';

const router = express.Router();

router.post('/cities', CityController.createCity);
router.get('/cities', CityController.getAllCities);
router.get('/cities/:id', CityController.getCityById);
router.patch('/cities/:id', CityController.updateCity);
router.delete('/cities/:id', CityController.deleteCity);

export default router;
