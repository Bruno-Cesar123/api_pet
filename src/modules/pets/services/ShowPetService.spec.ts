import AppError from '@shared/errors/AppError';
import FakePetsRepository from '../repositories/fakes/FakePetsRepository';
import ShowPetService from './ShowPetService';

let fakePetsRepository: FakePetsRepository;
let showPet: ShowPetService;

describe('ShowPet', () => {
  beforeEach(() => {
    fakePetsRepository = new FakePetsRepository();
    showPet = new ShowPetService(fakePetsRepository);
  });

  it('should be able to show the pet', async () => {
    const pet = await fakePetsRepository.create({
      name: 'Bob',
      age: 10,
      pet_id: '123123',
      description: 'pet thin and tall',
    });

    const profilePet = await showPet.execute({
      id: pet.id,
    });

    expect(profilePet.name).toBe('Bob');
    expect(profilePet.age).toBe(10);
  });

  it('should not be able the profile from non-existing user', async () => {
    await expect(
      showPet.execute({
        id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
