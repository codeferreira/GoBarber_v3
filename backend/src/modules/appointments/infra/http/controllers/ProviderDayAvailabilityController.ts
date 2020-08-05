import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, day, month } = request.query;

    const parsedDay = Number(day);
    const parsedMonth = Number(month);
    const parsedYear = Number(year);

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await listProviderDayAvailability.execute({
      day: parsedDay,
      month: parsedMonth,
      year: parsedYear,
      provider_id,
    });

    return response.json(availability);
  }
}
