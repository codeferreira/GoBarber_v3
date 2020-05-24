import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able update a avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeSotrageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeSotrageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'filename.jpg',
    });

    expect(user.avatar).toBe('filename.jpg');
  });

  it('should not be able to update avatar on a non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeSotrageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeSotrageProvider,
    );

    expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'filename.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete avatar when a new one is upload', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeSotrageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeSotrageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeSotrageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'filename.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'filename2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('filename.jpg');

    expect(user.avatar).toBe('filename2.jpg');
  });
});
