import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { year, day, month } = request.query;

    const parsedDay = Number(day);
    const parsedMonth = Number(month);
    const parsedYear = Number(year);

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      day: parsedDay,
      month: parsedMonth,
      year: parsedYear,
      provider_id,
    });

    return response.json(appointments);
  }
}
