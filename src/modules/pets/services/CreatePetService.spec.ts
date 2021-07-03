import FakePetsRepository from '../repositories/fakes/FakePetsRepository';
import CreatePetService from './CreatePetService';

let fakePetsRepository: FakePetsRepository;
let createPet: CreatePetService;

describe('CreatePet', () => {
  beforeEach(() => {
    fakePetsRepository = new FakePetsRepository();
    createPet = new CreatePetService(fakePetsRepository);
  });

  it('should be able to create a new pet', async () => {
    const pet = await createPet.execute({
      name: 'john pet',
      pet_id: '123123',
      age: 10,
      description: 'pet thin and tall',
    });

    expect(pet).toHaveProperty('id');
    expect(pet.pet_id).toBe('123123');
  });
});
