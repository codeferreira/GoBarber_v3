import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'john2@doe.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'john2@doe.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });
});
