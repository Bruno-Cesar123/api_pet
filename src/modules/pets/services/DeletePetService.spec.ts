import AppError from '@shared/errors/AppError';
import FakePetsRepository from '../repositories/fakes/FakePetsRepository';
import DeletePetService from './DeletePetService';

let fakePetsRepository: FakePetsRepository;
let deletePet: DeletePetService;

describe('ListPets', () => {
  beforeEach(() => {
    fakePetsRepository = new FakePetsRepository();

    deletePet = new DeletePetService(fakePetsRepository);
  });

  it('should delete the pet', async () => {
    const deleteFile = jest.spyOn(fakePetsRepository, 'delete');

    const pet = await fakePetsRepository.create({
      name: 'cao pet',
      pet_id: '123123',
      age: 10,
      description: 'pet thin and tall',
    });

    await deletePet.execute({
      id: pet.id,
    });

    expect(deleteFile).toHaveBeenCalledWith(pet);
  });

  it('should not be able to delete the pet from non-existing pet', async () => {
    await expect(
      deletePet.execute({
        id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
