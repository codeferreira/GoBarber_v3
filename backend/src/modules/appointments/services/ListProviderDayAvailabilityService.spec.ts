import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list all available hours of a provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 29, 8, 0, 0),
      provider_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 29, 11, 0, 0),
      provider_id: 'user',
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      day: 29,
      year: 2020,
      month: 7,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: true },
        { hour: 11, available: false },
      ]),
    );
  });
});
