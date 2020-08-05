import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRoutes = Router();
const appointmentsController = new AppointmentsController();
const providersAppointmentController = new ProviderAppointmentsController();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.post('/', appointmentsController.create);
appointmentsRoutes.get('/me', providersAppointmentController.index);

export default appointmentsRoutes;
