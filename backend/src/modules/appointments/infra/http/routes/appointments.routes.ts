import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRoutes = Router();
const appointmentsController = new AppointmentsController();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.post('/', appointmentsController.create);

export default appointmentsRoutes;
