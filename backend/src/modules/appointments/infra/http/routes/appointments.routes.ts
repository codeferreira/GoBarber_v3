import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRoutes = Router();
const appointmentsController = new AppointmentsController();
const providersAppointmentController = new ProviderAppointmentsController();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);

appointmentsRoutes.get(
  '/me',
  celebrate({
    [Segments.QUERY]: {
      day: Joi.number().integer().min(1).max(31).required(),
      month: Joi.number().integer().min(1).max(12).required(),
      year: Joi.number().required(),
    },
  }),
  providersAppointmentController.index,
);

export default appointmentsRoutes;
