import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakePetsRepository from '../repositories/fakes/FakePetsRepository';
import UpdatePetAvatarService from './UpdatePetAvatarService';

let fakePetsRepository: FakePetsRepository;
let fakeStorageProvider: FakeStorageProvider;
let updatePetAvatar: UpdatePetAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakePetsRepository = new FakePetsRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updatePetAvatar = new UpdatePetAvatarService(
      fakePetsRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new pet', async () => {
    const pet = await fakePetsRepository.create({
      name: 'john pet',
      pet_id: '123123',
      age: 10,
      description: 'pet thin and tall',
    });

    await updatePetAvatar.execute({
      pet_id: pet.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(pet.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing pet', async () => {
    await expect(
      updatePetAvatar.execute({
        pet_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const pet = await fakePetsRepository.create({
      name: 'john pet',
      pet_id: '123123',
      age: 10,
      description: 'pet thin and tall',
    });

    await updatePetAvatar.execute({
      pet_id: pet.id,
      avatarFilename: 'avatar.jpg',
    });

    await updatePetAvatar.execute({
      pet_id: pet.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(pet.avatar).toBe('avatar2.jpg');
  });
});
