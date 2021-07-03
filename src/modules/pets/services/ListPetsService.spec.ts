import FakePetsRepository from '../repositories/fakes/FakePetsRepository';
import ListPetsService from './ListPetsService';

let fakePetsRepository: FakePetsRepository;
let listPets: ListPetsService;

describe('ListPets', () => {
  beforeEach(() => {
    fakePetsRepository = new FakePetsRepository();

    listPets = new ListPetsService(fakePetsRepository);
  });

  it('should be able to list the pets', async () => {
    const pet = await fakePetsRepository.create({
      name: 'cao pet',
      pet_id: '123123',
      age: 10,
      description: 'pet thin and tall',
    });

    const Showpets = await listPets.execute({
      pet_id: pet.pet_id,
    });

    expect(Showpets).toStrictEqual([pet]);
  });
});
