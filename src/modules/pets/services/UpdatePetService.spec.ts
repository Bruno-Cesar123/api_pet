import AppError from '@shared/errors/AppError';
import FakePetsRepository from '../repositories/fakes/FakePetsRepository';
import UpdatePetService from './UpdatePetService';

let fakePetsRepository: FakePetsRepository;
let updatePet: UpdatePetService;

describe('UpdatePet', () => {
  beforeEach(() => {
    fakePetsRepository = new FakePetsRepository();
    updatePet = new UpdatePetService(fakePetsRepository);
  });

  it('should be able to update a pet', async () => {
    const pet = await fakePetsRepository.create({
      name: 'Bob',
      age: 10,
      pet_id: '123123',
      description: 'pet thin and tall',
    });

    const updatedPet = await updatePet.execute({
      id: pet.id,
      pet_id: '123123',
      name: 'Max',
      age: 12,
      description: 'pet thin and tall',
    });

    expect(updatedPet.name).toBe('Max');
    expect(updatedPet.age).toBe(12);
  });
  it('should not be able to update the pet from non-existing pet', async () => {
    await expect(
      updatePet.execute({
        id: 'no-existing pet',
        pet_id: '123123',
        name: 'Test',
        age: 0,
        description: 'teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
