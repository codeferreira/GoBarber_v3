import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 28, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 6, 28, 13),
      user_id: 'user',
      provider_id: '38762232',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('38762232');
  });

  it('should not be able to create two appointments at the same time', async () => {
    const appointmentDate = new Date(2020, 7, 11, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user',
      provider_id: 'provider',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user',
        provider_id: 'provider',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment on past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 28, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 6, 27, 8),
        user_id: 'user',
        provider_id: '38762232',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment where user is the provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 28, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 6, 28, 13),
        user_id: 'user',
        provider_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am or after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 28, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 6, 29, 7),
        user_id: 'user',
        provider_id: 'provider',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 6, 29, 18),
        user_id: 'user',
        provider_id: 'provider',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
