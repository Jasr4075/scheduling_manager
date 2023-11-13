import express from "express";
import AddressesRoutes from "./AddressesRoutes";
import IntegrationsRoutes from "./IntegrationsRoutes";
import PaymentMethodRoutes from "./PaymentMethodRoutes";
import PaymentRoutes from "./PaymentRoutes";
import SchedulingRoutes from "./SchedulingRoutes";
import UserBranchRoutes from "./UserBranchRoutes";
import UserRoutes from "./UserRoutes";
import BranchRoutes from "./BranchRoutes";
import CityRoutes from "./CityRoutes";
import CompanyRoutes from "./CompanyRoutes";
import CountryRoutes from "./CountryRoutes";
import ScheduleRoutes from "./ScheduleRoutes";
import SchedulesRoutes from "./SchedulesRoutes";
import StateRoutes from "./StateRoutes";
import ServicesRoutes from "./ServicesRoutes";
import authMiddleware from "../utils/authMiddleware";
import superAdminOnlyMiddleware from "../utils/superAdminOnlyMiddleware";
import superAndAdminMiddleware from "../utils/superAndAdminMiddleware";
import adminOnlyMiddleware from "../utils/adminOnlyMiddleware";
import verifyToken from "../utils/verifyTokenMiddleware";

const router = express.Router();

router.post('/addresses', AddressesRoutes);
router.get('/addresses', AddressesRoutes);
router.get('/addresses/:id', AddressesRoutes);
router.patch('/addresses/:id', AddressesRoutes);
router.delete('/addresses/:id',  AddressesRoutes);

router.post('/integrations',  IntegrationsRoutes);
router.get('/integrations',  IntegrationsRoutes);
router.get('/integrations/:id',  IntegrationsRoutes);
router.patch('/integrations/:id',  IntegrationsRoutes);
router.delete('/integrations/:id',  IntegrationsRoutes);

router.post('/payment-methods',  PaymentMethodRoutes);
router.get('/payment-methods',  PaymentMethodRoutes);
router.get('/payment-methods/:id',  PaymentMethodRoutes);
router.patch('/payment-methods/:id',  PaymentMethodRoutes);
router.delete('/payment-methods/:id',  PaymentMethodRoutes);

router.post('/payments',  PaymentRoutes);
router.get('/payments',  PaymentRoutes);
router.get('/payments/:id',  PaymentRoutes);
router.patch('/payments/:id',  PaymentRoutes);
router.delete('/payments/:id',  PaymentRoutes);

router.post('/schedulings', SchedulingRoutes);
router.get('/schedulings', SchedulingRoutes);
router.get('/schedulings/:id', SchedulingRoutes);
router.patch('/schedulings/:id', SchedulingRoutes);
router.delete('/schedulings/:id', SchedulingRoutes);
router.get('/agendamentos', SchedulingRoutes);
router.get('/details', SchedulingRoutes);

router.post('/user-branches',  UserBranchRoutes);
router.get('/user-branches',  UserBranchRoutes);
router.get('/user-branches/:id',  UserBranchRoutes);
router.patch('/user-branches/:id',  UserBranchRoutes);
router.delete('/user-branches/:id',  UserBranchRoutes);

router.post('/users', UserRoutes);
router.get('/users/by-token', UserRoutes);
router.get('/users', UserRoutes);
router.get('/users/:id', UserRoutes);
router.patch('/users/:id', UserRoutes);
router.delete('/users/:id', UserRoutes);
router.post('/users/login', UserRoutes);
router.get('/users/validate', UserRoutes);
router.post('/users/verify', verifyToken);
router.get('/admin/user', UserRoutes);
router.get('/admin/newuser', UserRoutes);

router.post('/branches',  BranchRoutes);
router.get('/branches',  BranchRoutes);
router.get('/branches/:id',  BranchRoutes);
router.patch('/branches/:id',  BranchRoutes);
router.delete('/branches/:id',  BranchRoutes);

router.post('/cities',  CityRoutes);
router.get('/cities', CityRoutes);
router.get('/cities/:id', CityRoutes);
router.patch('/cities/:id',  CityRoutes);
router.delete('/cities/:id',  CityRoutes);

router.post('/companies',  CompanyRoutes);
router.get('/companies',  CompanyRoutes);
router.get('/companies/:id',  CompanyRoutes);
router.patch('/companies/:id',  CompanyRoutes);

router.post('/countries',  CountryRoutes);
router.get('/countries', CountryRoutes);
router.get('/countries/:id', CountryRoutes);
router.patch('/countries/:id',  CountryRoutes);
router.delete('/countries/:id',  CountryRoutes);

router.post('/schedule', ScheduleRoutes);
router.get('/schedule', ScheduleRoutes);
router.get('/schedule/:id', ScheduleRoutes);
router.patch('/schedule/:id', ScheduleRoutes);
router.delete('/schedule/:id', ScheduleRoutes);
router.get('/schedule-services', ScheduleRoutes);

router.post('/schedules', SchedulesRoutes);
router.get('/schedules', SchedulesRoutes);
router.get('/schedules/:id', SchedulesRoutes);
router.patch('/schedules/:id', SchedulesRoutes);
router.delete('/schedules/:id', SchedulesRoutes);

router.post('/states',  StateRoutes);
router.get('/states', StateRoutes);
router.get('/states/:id', StateRoutes);
router.patch('/states/:id',  StateRoutes);
router.delete('/states/:id',  StateRoutes);

router.post('/services', ServicesRoutes);
router.get('/services', ServicesRoutes);
router.get('/services/:id', ServicesRoutes);
router.patch('/services/:id', ServicesRoutes);
router.delete('/services/:id', ServicesRoutes);

export default router;