import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRoutes = Router();

const appointments = [];

appointmentsRoutes.get('/', (request, response) => response.json(appointments));

appointmentsRoutes.post('/', (request, response) => {
  const { provider, date } = request.body;

  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRoutes;
